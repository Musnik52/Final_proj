import pytest
from db_files.db_repo import DbRepo
from datetime import datetime
from db_files.db_config import local_session, config
from tables.users import Users
from tables.flights import Flights
from tables.countries import Countries
from facades.facade_anonymus import AnonymusFacade
from tables.airline_companies import AirlineCompanies
from errors.error_invalid_input import InvalidInput
from errors.error_short_password import PasswordTooShort
from errors.error_invalid_country import InvalidCountry
from errors.error_flight_not_found import FlightNotFound
from errors.error_airline_not_found import AirlineNotFound

repo = DbRepo(local_session)
anonymus_facade = AnonymusFacade(repo, config)

@pytest.fixture(scope='session')
def base_facade_object():
    an_facade = anonymus_facade
    return an_facade

@pytest.fixture(scope='function', autouse=True)
def anonymus_facade_clean():
    repo.reset_db()

def test_get_all_flights(base_facade_object):
    assert base_facade_object.get_all_flights() == repo.get_all(Flights)

def test_get_flight_by_id(base_facade_object):
    assert base_facade_object.get_flight_by_id(1) == repo.get_by_id(Flights,1)

def test_not_get_flight_by_id(base_facade_object):
    with pytest.raises(InvalidInput):
        base_facade_object.get_flight_by_id('1')
    with pytest.raises(FlightNotFound):
        base_facade_object.get_flight_by_id(888)

def test_get_flights_by_parameters(base_facade_object):
    sample = base_facade_object.get_flights_by_parameters(1,2,datetime(2022, 1, 1, 10, 10, 10))
    expected = repo.get_by_condition(Flights, lambda query: query.filter(Flights.origin_country_id == 1, Flights.destination_country_id == 2, Flights.departure_time == datetime(2022, 1, 1, 10, 10, 10)))
    assert expected == sample

def test_not_get_flights_by_parameters(base_facade_object):
    with pytest.raises(InvalidInput):
        base_facade_object.get_flights_by_parameters('1',2,datetime(2022, 1, 1, 10, 10, 10))
    with pytest.raises(InvalidInput):
        base_facade_object.get_flights_by_parameters(1,'2',datetime(2022, 1, 1, 10, 10, 10))
    with pytest.raises(InvalidInput):
        base_facade_object.get_flights_by_parameters(1,2,'datetime(2022, 1, 1, 10, 10, 10)')
    with pytest.raises(FlightNotFound):
        base_facade_object.get_flights_by_parameters(3,1,datetime(2022, 1, 1, 10, 10, 10))

def test_get_all_airlines(base_facade_object):
    assert base_facade_object.get_all_airlines() == repo. get_all(AirlineCompanies)

def test_get_airline_by_id(base_facade_object):
    assert base_facade_object.get_airline_by_id(1) == repo.get_by_id(AirlineCompanies, 1)

def test_not_get_airline_by_id(base_facade_object):
    with pytest.raises(InvalidInput):
        base_facade_object.get_airline_by_id('1')
    with pytest.raises(AirlineNotFound):
        base_facade_object.get_airline_by_id(654)

def test_get_all_countries(base_facade_object):
    assert base_facade_object.get_all_countries() == repo. get_all(Countries)

def test_get_country_by_id(base_facade_object):
    assert base_facade_object.get_country_by_id(1) == repo.get_by_id(Countries, 1)

def test_not_get_country_by_id(base_facade_object):
    with pytest.raises(InvalidInput):
        base_facade_object.get_country_by_id('1')
    with pytest.raises(InvalidCountry):
        base_facade_object.get_country_by_id(654)

def test_create_user(base_facade_object):
    base_facade_object.create_user(Users(username='testy4h4v', password='y4h4av5ch', email='testyahav@jb.com', user_role=3))
    assert repo.get_by_column_value(Users, Users.username, 'testy4h4v') != None

def test_not_create_user(base_facade_object):
    with pytest.raises(InvalidInput):
        base_facade_object.create_user('3')
    with pytest.raises(PasswordTooShort):
        base_facade_object.create_user(Users(username='testy4h4v', password='123', email='testyahav@jb.com', user_role=3))