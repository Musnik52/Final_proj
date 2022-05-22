import pytest
import uuid
from werkzeug.security import generate_password_hash
from db_files.db_config import local_session, config
from db_files.db_repo import DbRepo
from facades.facade_anonymus import AnonymusFacade
from tables.airline_companies import AirlineCompanies
from tables.customers import Customers
from tables.users import Users
from tables.administrators import Administrators
from errors.error_user_exists import UserAlreadyExists
from errors.error_short_password import PasswordTooShort
from errors.error_unauthorized_user_id import UnauthorizedUserID
from errors.error_admin_not_found import AdminNotFound
from errors.error_airline_not_found import AirlineNotFound
from errors.error_customer_not_found import CustomerNotFound
from errors.error_invalid_input import InvalidInput

repo = DbRepo(local_session)


@pytest.fixture(scope='session')
def admin_facade_object():
    an_facade = AnonymusFacade(repo, config)
    return an_facade.login('l10r', 'lior1999')


@pytest.fixture(scope='function', autouse=True)
def admin_facade_clean():
    repo.reset_db()


def test_get_all_customers(admin_facade_object):
    assert admin_facade_object.get_all_customers() == repo.get_all(Customers)


def test_add_administrator(admin_facade_object):
    expected_admin = Administrators(
        first_name='testlior', last_name='testmusnik', user_id=8)
    expected_user = Users(
        username='testl10r', password=generate_password_hash('testlior1999'), email='testlior@jb.com', public_id=str(uuid.uuid4()), user_role=1)
    admin_facade_object.add_administrator(expected_admin, expected_user)
    check_admin = repo.get_by_id(Administrators, 3)
    check_user = repo.get_by_id(Users, 8)
    assert check_admin == expected_admin
    assert check_user == expected_user


def test_not_add_administrator(admin_facade_object):
    with pytest.raises(InvalidInput):
        expected_admin = Administrators(
            first_name='testlior', last_name='testmusnik', user_id=3)
        expected_user = "Users(username='testl10r', password='1234545678', email='testlior@jb.com', user_role=1)"
        admin_facade_object.add_administrator(expected_admin, expected_user)
    with pytest.raises(InvalidInput):
        expected_admin = "Administrators(first_name='testlior', last_name='testmusnik', user_id=3)"
        expected_user = Users(
            username='testl10r', password='1234545678', email='testlior@jb.com', user_role=1)
        admin_facade_object.add_administrator(expected_admin, expected_user)
    with pytest.raises(UserAlreadyExists):
        expected_admin = Administrators(
            first_name='testlior', last_name='testmusnik', user_id=3)
        expected_user = Users(
            username='testl10r', password='1234545678', email='testlior@jb.com', user_role=1)
        admin_facade_object.add_administrator(expected_admin, expected_user)
    with pytest.raises(PasswordTooShort):
        expected_admin = Administrators(
            first_name='testlior', last_name='testmusnik', user_id=8)
        expected_user = Users(username='testl10r', password='12',
                              email='testlior@jb.com', user_role=1)
        admin_facade_object.add_administrator(expected_admin, expected_user)
    with pytest.raises(UnauthorizedUserID):
        expected_admin = Administrators(
            first_name='testlior', last_name='testmusnik', user_id=8)
        expected_user = Users(
            username='testl10r', password='121223', email='testlior@jb.com', user_role=3)
        admin_facade_object.add_administrator(expected_admin, expected_user)


def test_add_airline(admin_facade_object):
    expected_airline = AirlineCompanies(
        name='testbazooka air', country_id=1, user_id=8)
    expected_user = Users(username='testb0r1s', password='boris1992',
                          email='testboris@jb.com', user_role=2)
    admin_facade_object.add_airline(expected_airline, expected_user)
    check_airline = repo.get_by_id(AirlineCompanies, 3)
    check_user = repo.get_by_id(Users, 8)
    assert check_airline == expected_airline
    assert check_user == expected_user


def test_not_add_airline(admin_facade_object):
    with pytest.raises(InvalidInput):
        expected_airline = AirlineCompanies(
            name='testbazooka air', country_id=1, user_id=2)
        expected_user = "Users(username='testb0r1s', password='boris1992', email='testboris@jb.com', user_role=2)"
        admin_facade_object.add_airline(expected_airline, expected_user)
    with pytest.raises(InvalidInput):
        expected_airline = "AirlineCompanies(name='testbazooka air', country_id=1, user_id=2)"
        expected_user = Users(
            username='testb0r1s', password='boris1992', email='testboris@jb.com', user_role=2)
        admin_facade_object.add_airline(expected_airline, expected_user)
    with pytest.raises(UserAlreadyExists):
        expected_airline = AirlineCompanies(
            name='testbazooka air', country_id=1, user_id=2)
        expected_user = Users(
            username='testb0r1s', password='boris1992', email='testboris@jb.com', user_role=2)
        admin_facade_object.add_airline(expected_airline, expected_user)
    with pytest.raises(PasswordTooShort):
        expected_airline = AirlineCompanies(
            name='testbazooka air', country_id=1, user_id=8)
        expected_user = Users(
            username='testb0r1s', password='12', email='testboris@jb.com', user_role=2)
        admin_facade_object.add_airline(expected_airline, expected_user)
    with pytest.raises(UnauthorizedUserID):
        expected_airline = AirlineCompanies(
            name='testbazooka air', country_id=1, user_id=8)
        expected_user = Users(
            username='testb0r1s', password='133232', email='testboris@jb.com', user_role=1)
        admin_facade_object.add_airline(expected_airline, expected_user)


def test_add_customer(admin_facade_object):
    expected_customer = Customers(first_name='testkosta', last_name='testmakarkov', address='testrashi 31',
                                  phone_number='test0507897765', credit_card_number='test13323432', user_id=8)
    expected_user = Users(username='testk0st4', password='test1kosta1',
                          email='testkosta@jb.com', user_role=3)
    admin_facade_object.add_customer(expected_customer, expected_user)
    check_customer = repo.get_by_id(Customers, 4)
    check_user = repo.get_by_id(Users, 8)
    assert check_customer == expected_customer
    assert check_user == expected_user


def test_not_add_customer(admin_facade_object):
    with pytest.raises(InvalidInput):
        expected_customer = "Customers(first_name='testkosta', last_name='testmakarkov', address='testrashi 31', phone_number='test0507897765', credit_card_number='test13323432', user_id=3)"
        expected_user = Users(
            username='testk0st4', password='test1kosta1', email='testkosta@jb.com', user_role=3)
        admin_facade_object.add_customer(expected_customer, expected_user)
    with pytest.raises(InvalidInput):
        expected_customer = Customers(first_name='testkosta', last_name='testmakarkov', address='testrashi 31',
                                      phone_number='test0507897765', credit_card_number='test13323432', user_id=3)
        expected_user = "Users(username='testk0st4', password='test1kosta1', email='testkosta@jb.com', user_role=3)"
        admin_facade_object.add_customer(expected_customer, expected_user)
    with pytest.raises(UserAlreadyExists):
        expected_customer = Customers(first_name='testkosta', last_name='testmakarkov', address='testrashi 31',
                                      phone_number='test0507897765', credit_card_number='test13323432', user_id=3)
        expected_user = Users(
            username='testk0st4', password='test1kosta1', email='testkosta@jb.com', user_role=3)
        admin_facade_object.add_customer(expected_customer, expected_user)
    with pytest.raises(PasswordTooShort):
        expected_customer = Customers(first_name='testkosta', last_name='testmakarkov', address='testrashi 31',
                                      phone_number='test0507897765', credit_card_number='test13323432', user_id=8)
        expected_user = Users(
            username='testk0st4', password='123', email='testkosta@jb.com', user_role=3)
        admin_facade_object.add_customer(expected_customer, expected_user)
    with pytest.raises(UnauthorizedUserID):
        expected_customer = Customers(first_name='testkosta', last_name='testmakarkov', address='testrashi 31',
                                      phone_number='test0507897765', credit_card_number='test13323432', user_id=8)
        expected_user = Users(
            username='testk0st4', password='test1kosta1', email='testkosta@jb.com', user_role=1)
        admin_facade_object.add_customer(expected_customer, expected_user)


def test_remove_administrator(admin_facade_object):
    admin_facade_object.remove_administrator(1)
    assert repo.get_by_id(Administrators, 1) == None
    assert repo.get_by_id(Users, 3) == None


def test_not_remove_administrator(admin_facade_object):
    with pytest.raises(InvalidInput):
        admin_facade_object.remove_administrator('3')
    with pytest.raises(AdminNotFound):
        admin_facade_object.remove_administrator(3)


def test_remove_airline(admin_facade_object):
    expected_airline = AirlineCompanies(
        name='testbazooka air', country_id=1, user_id=8)
    expected_user = Users(username='testb0r1s', password='boris1992',
                          email='testboris@jb.com', user_role=2)
    admin_facade_object.add_airline(expected_airline, expected_user)
    admin_facade_object.remove_airline(3)
    assert repo.get_by_id(AirlineCompanies, 3) == None
    assert repo.get_by_id(Users, 8) == None


def test_not_remove_airline(admin_facade_object):
    with pytest.raises(InvalidInput):
        admin_facade_object.remove_airline('3')
    with pytest.raises(AirlineNotFound):
        admin_facade_object.remove_airline(3)


def test_remove_customer(admin_facade_object):
    expected_customer = Customers(first_name='testkosta', last_name='testmakarkov', address='testrashi 31',
                                  phone_number='test0507897765', credit_card_number='test13323432', user_id=8)
    expected_user = Users(username='testk0st4', password='test1kosta1',
                          email='testkosta@jb.com', user_role=3)
    admin_facade_object.add_customer(expected_customer, expected_user)
    admin_facade_object.remove_customer(4)
    assert repo.get_by_id(Customers, 4) == None
    assert repo.get_by_id(Users, 8) == None


def test_not_remove_customer(admin_facade_object):
    with pytest.raises(InvalidInput):
        admin_facade_object.remove_customer('4')
    with pytest.raises(CustomerNotFound):
        admin_facade_object.remove_customer(4)
