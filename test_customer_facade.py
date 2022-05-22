import pytest
from werkzeug.security import generate_password_hash
from db_files.db_config import local_session, config
from db_files.db_repo import DbRepo
from tables.tickets import Tickets
from tables.customers import Customers
from facades.facade_anonymus import AnonymusFacade
from errors.error_invalid_input import InvalidInput
from errors.error_invalid_token import InvalidToken
from errors.error_no_more_tickets import NoMoreTicketsLeft
from errors.error_flight_not_found import FlightNotFound
from errors.error_ticket_not_found import TicketNotFound
from errors.error_customer_not_found import CustomerNotFound

repo = DbRepo(local_session)


@pytest.fixture(scope='session')
def customer_facade_object():
    an_facade = AnonymusFacade(repo, config)
    return an_facade.login('3m1l', 'e0m1i2l')


@pytest.fixture(scope='function', autouse=True)
def customer_facade_clean():
    repo.reset_db()


def test_update_customer(customer_facade_object):
    customer_facade_object.update_customer({'first_name': 'Samuel'}, 2)
    check_customer = repo.get_by_id(Customers, 2)
    assert check_customer.first_name == 'Samuel'


def test_not_update_customer(customer_facade_object):
    with pytest.raises(InvalidInput):
        customer_facade_object.update_customer({'first_name': 'Samuel'}, 'uy')
    with pytest.raises(InvalidInput):
        customer_facade_object.update_customer("{'first_name': 'Samuel'}", 55)
    with pytest.raises(CustomerNotFound):
        customer_facade_object.update_customer({'first_name': 'Samuel'}, 55)
    with pytest.raises(InvalidToken):
        customer_facade_object.update_customer({'first_name': 'Samuel'}, 1)


def test_add_ticket(customer_facade_object):
    customer_facade_object.add_ticket(
        Tickets(id=999, flight_id=2, customer_id=2))
    check_ticket = repo.get_by_id(Tickets, 999)
    assert check_ticket.flight_id == 2
    assert check_ticket.customer_id == 2


def test_not_add_ticket(customer_facade_object):
    with pytest.raises(InvalidInput):
        customer_facade_object.add_ticket(
            'Tickets(flight_id=4, customer_id=1)')
    with pytest.raises(FlightNotFound):
        customer_facade_object.add_ticket(Tickets(flight_id=6, customer_id=2))
    with pytest.raises(NoMoreTicketsLeft):
        customer_facade_object.add_ticket(Tickets(flight_id=4, customer_id=2))


def test_remove_ticket(customer_facade_object):
    customer_facade_object.remove_ticket(3)
    check_customer = repo.get_by_id(Tickets, 3)
    assert check_customer == None


def test_not_remove_ticket(customer_facade_object):
    with pytest.raises(InvalidInput):
        customer_facade_object.remove_ticket({'45': '9'})
    with pytest.raises(TicketNotFound):
        customer_facade_object.remove_ticket(45)
    with pytest.raises(InvalidToken):
        customer_facade_object.remove_ticket(1)


def test_get_ticket_by_customer(customer_facade_object):
    assert repo.get_by_column_value(
        Tickets, Tickets.customer_id, 2) == customer_facade_object.get_ticket_by_customer(2)


def test_not_get_ticket_by_customer(customer_facade_object):
    with pytest.raises(InvalidInput):
        customer_facade_object.get_ticket_by_customer('4')
    with pytest.raises(CustomerNotFound):
        customer_facade_object.get_ticket_by_customer(55)
    with pytest.raises(InvalidToken):
        customer_facade_object.get_ticket_by_customer(1)
