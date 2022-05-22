import pytest
from werkzeug.security import generate_password_hash
from datetime import datetime
from db_files.db_config import local_session, config
from db_files.db_repo import DbRepo
from facades.facade_anonymus import AnonymusFacade
from tables.flights import Flights
from tables.airline_companies import AirlineCompanies
from errors.error_invalid_time import InvalidTime
from errors.error_invalid_location import InvalidLocation
from errors.error_invalid_remaining_tickets import InvalidRemainingTickets
from errors.error_airline_not_found import AirlineNotFound
from errors.error_flight_not_found import FlightNotFound
from errors.error_invalid_input import InvalidInput
from errors.error_invalid_token import InvalidToken

repo = DbRepo(local_session)


@pytest.fixture(scope='session')
def airline_facade_object():
    an_facade = AnonymusFacade(repo, config)
    return an_facade.login('m4x1m', '2themax')


@pytest.fixture(scope='function', autouse=True)
def airline_facade_clean():
    repo.reset_db()


def test_get_flights_by_airline(airline_facade_object):
    assert airline_facade_object.get_flights_by_airline(
        2) == repo.get_by_column_value(Flights, Flights.airline_company_id, 2)


def test_not_get_flights_by_airline(airline_facade_object):
    with pytest.raises(InvalidInput):
        airline_facade_object.get_flights_by_airline('t')
    with pytest.raises(AirlineNotFound):
        airline_facade_object.get_flights_by_airline(3)
    with pytest.raises(InvalidToken):
        airline_facade_object.get_flights_by_airline(1)


def test_add_flight(airline_facade_object):
    expected_flight = Flights(airline_company_id=2, origin_country_id=1, destination_country_id=2, departure_time=datetime(
        2022, 1, 4, 10, 10, 10), landing_time=datetime(2022, 1, 24, 10, 29, 1), remaining_tickets=44)
    airline_facade_object.add_flight(expected_flight)
    check_flight = repo.get_by_id(Flights, 5)
    assert check_flight == expected_flight


def test_not_add_flight(airline_facade_object):
    with pytest.raises(InvalidInput):
        flight = 'Flights(airline_company_id=2, origin_country_id=1, destination_country_id=2, departure_time=datetime(2023, 1, 4, 10, 10, 10), landing_time=datetime(2022, 1, 24, 10, 29, 1), remaining_tickets=44)'
        airline_facade_object.add_flight(flight)
    with pytest.raises(InvalidTime):
        flight = Flights(airline_company_id=2, origin_country_id=1, destination_country_id=2, departure_time=datetime(
            2023, 1, 4, 10, 10, 10), landing_time=datetime(2022, 1, 24, 10, 29, 1), remaining_tickets=44)
        airline_facade_object.add_flight(flight)
    with pytest.raises(InvalidRemainingTickets):
        flight = Flights(airline_company_id=2, origin_country_id=1, destination_country_id=2, departure_time=datetime(
            2022, 1, 4, 10, 10, 10), landing_time=datetime(2022, 1, 24, 10, 29, 1), remaining_tickets=-44)
        airline_facade_object.add_flight(flight)
    with pytest.raises(InvalidLocation):
        flight = Flights(airline_company_id=2, origin_country_id=1, destination_country_id=1, departure_time=datetime(
            2022, 1, 4, 10, 10, 10), landing_time=datetime(2022, 1, 24, 10, 29, 1), remaining_tickets=44)
        airline_facade_object.add_flight(flight)
    with pytest.raises(InvalidToken):
        flight = Flights(airline_company_id=1, origin_country_id=3, destination_country_id=2, departure_time=datetime(
            2022, 1, 4, 10, 10, 10), landing_time=datetime(2022, 1, 24, 10, 29, 1), remaining_tickets=44)
        airline_facade_object.add_flight(flight)


def test_update_airline(airline_facade_object):
    airline_update = {'name': 'Up Yours LTD'}
    airline_facade_object.update_airline(airline_update, 2)
    check_airline = repo.get_by_id(AirlineCompanies, 2)
    assert check_airline.name == 'Up Yours LTD'


def test_not_update_airline(airline_facade_object):
    with pytest.raises(InvalidInput):
        airline_update = "{'name':'Up Yours LTD'}"
        airline_facade_object.update_airline(airline_update, 2)
    with pytest.raises(InvalidInput):
        airline_update = {'name': 'Up Yours LTD'}
        airline_facade_object.update_airline(airline_update, 't')
    with pytest.raises(AirlineNotFound):
        airline_update = {'name': 'Up Yours LTD'}
        airline_facade_object.update_airline(airline_update, 33)
    with pytest.raises(InvalidToken):
        airline_update = {'name': 'Up Yours LTD'}
        airline_facade_object.update_airline(airline_update, 1)


def test_update_flight(airline_facade_object):
    flight_update = {'departure_time': datetime(
        2022, 1, 1, 11, 10, 10), 'remaining_tickets': 12332}
    airline_facade_object.update_flight(flight_update, 2)
    check_flight = repo.get_by_id(Flights, 2)
    assert check_flight.departure_time == datetime(2022, 1, 1, 11, 10, 10)
    assert check_flight.remaining_tickets == 12332


def test_not_update_flight(airline_facade_object):
    with pytest.raises(InvalidInput):
        airline_facade_object.update_flight("{'remaining_tickets':-2}", 2)
    with pytest.raises(InvalidInput):
        airline_facade_object.update_flight({'remaining_tickets': 2}, 'ty')
    with pytest.raises(InvalidRemainingTickets):
        airline_facade_object.update_flight({'remaining_tickets': -2}, 2)
    with pytest.raises(FlightNotFound):
        airline_facade_object.update_flight({'remaining_tickets': 22}, 52)
    with pytest.raises(InvalidToken):
        airline_facade_object.update_flight({'remaining_tickets': 2}, 1)


def test_remove_flight(airline_facade_object):
    airline_facade_object.remove_flight(2)
    assert repo.get_by_id(Flights, 2) == None


def test_not_remove_flight(airline_facade_object):
    with pytest.raises(InvalidInput):
        airline_facade_object.remove_flight('tr')
    with pytest.raises(FlightNotFound):
        airline_facade_object.remove_flight(78)
    with pytest.raises(InvalidToken):
        airline_facade_object.remove_flight(1)
