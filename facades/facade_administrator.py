from db_files.logger import Logger
from facades.facade_base import FacadeBase
from tables.users import Users
from tables.flights import Flights
from tables.customers import Customers
from tables.administrators import Administrators
from tables.airline_companies import AirlineCompanies
from errors.error_user_exists import UserAlreadyExists
from errors.error_invalid_token import InvalidToken
from errors.error_invalid_input import InvalidInput
from errors.error_short_password import PasswordTooShort
from errors.error_admin_not_found import AdminNotFound
from errors.error_flight_not_found import FlightNotFound
from errors.error_airline_not_found import AirlineNotFound
from errors.error_customer_not_found import CustomerNotFound
from errors.error_unauthorized_user_id import UnauthorizedUserID
from errors.error_invalid_remaining_tickets import InvalidRemainingTickets


class AdministratorFacade(FacadeBase):

    def __init__(self, repo, config, login_token):
        super().__init__(repo, config)
        self.login_token = login_token
        self.logger = Logger.get_instance()
        self.admin_role_number = self.config["user_roles"]["admin"]
        self.airline_role_number = self.config["user_roles"]["airline"]
        self.customer_role_number = self.config["user_roles"]["customer"]
        self.password_length = self.config["limits"]["password_length"]
        self.ticket_limit = self.config["limits"]["ticket_limit"]

    def get_all_customers(self):
        self.logger.logger.debug(f'Attempting to fetch all customers...')
        if self.login_token.role != 'Administrator':
            raise InvalidToken
        else:
            self.logger.logger.info(f'Customer(s) Displayed!')
            return self.repo.get_all(Customers)

    def add_administrator(self, administrator, user):
        self.logger.logger.debug('Setting up new administrator and user...')
        if not isinstance(administrator, Administrators):
            self.logger.logger.error(
                f'{InvalidInput} - Admin must be a "Administrators" object!')
            raise InvalidInput('Input must be a "Administrators" object!')
        elif not isinstance(user, Users):
            self.logger.logger.error(
                f'{InvalidInput} - User must be a "Users" object!')
            raise InvalidInput('Input must be a "Users" object!')
        elif self.login_token.role != 'Administrator':
            raise InvalidToken
        elif self.repo.get_by_id(Users, administrator.user_id) != None:
            self.logger.logger.error(
                f'{UserAlreadyExists} - User-ID {administrator.user_id} already in use!')
            raise UserAlreadyExists
        elif user.user_role == int(self.admin_role_number):
            self.create_user(user)
            new_user = list(self.repo.get_by_column_value(
                Users, Users.username, user.username))
            administrator.user_id = new_user[0].id
            self.logger.logger.info(f'User {user.username} created!')
            self.repo.add(administrator)
            self.logger.logger.info(
                f'Administrator {administrator.first_name} {administrator.last_name} created!')
        else:
            self.logger.logger.error(
                f'{UnauthorizedUserID} - Unauthorized ID to create an "administrator"!')
            raise UnauthorizedUserID

    def add_airline(self, airline, user):
        self.logger.logger.debug('Setting up new airline and user...')
        if not isinstance(airline, AirlineCompanies):
            self.logger.logger.error(
                f'{InvalidInput} - Admin must be a "AirlineCompanies" object!')
            raise InvalidInput('Input must be a "AirlineCompanies" object!')
        elif not isinstance(user, Users):
            self.logger.logger.error(
                f'{InvalidInput} - User must be a "Users" object!')
            raise InvalidInput('Input must be a "Users" object!')
        elif self.login_token.role != 'Administrator':
            raise InvalidToken
        elif self.repo.get_by_id(Users, airline.user_id) != None:
            self.logger.logger.error(
                f'{UserAlreadyExists} - User-ID {airline.user_id} already in use!')
            raise UserAlreadyExists
        elif user.user_role == int(self.airline_role_number):
            self.create_user(user)
            new_user = list(self.repo.get_by_column_value(
                Users, Users.username, user.username))
            airline.user_id = new_user[0].id
            self.logger.logger.info(f'User {user.username} created!')
            self.repo.add(airline)
            self.logger.logger.info(f'Administrator {airline.name} created!')
        else:
            self.logger.logger.error(
                f'{UnauthorizedUserID} - Unauthorized ID to create an "airline"!')
            raise UnauthorizedUserID

    def update_admin(self, admin, admin_id):
        self.logger.logger.debug(
            f'Attempting to update admin #{admin_id}...')
        if not isinstance(admin_id, int):
            self.logger.logger.error(
                f'{InvalidInput} - Input must be an integer!')
            raise InvalidInput('Input must be an integer!')
        elif not isinstance(admin, dict):
            self.logger.logger.error(
                f'{InvalidInput} - Input must be an integer!')
            raise InvalidInput('input must be a dictionary!')
        elif self.repo.get_by_id(Administrators, admin_id) == None:
            self.logger.logger.error(
                f'{AdminNotFound} - Admin #{admin_id} was not found!')
            raise AdminNotFound
        else:
            admin_check = self.repo.get_by_id(Administrators, admin_id)
            if self.login_token.id != admin_check.user_id:
                self.logger.logger.error(
                    f'{InvalidToken} - you cannot edit other admins!')
                raise InvalidToken
            else:
                self.logger.logger.info(f'Customer #{admin_id} Updated!')
                self.repo.update_by_id(
                    Administrators, Administrators.id, admin_id, admin)

    def update_flight(self, flight, flight_id):
        self.logger.logger.debug(
            f'Attempting to update flight #{flight_id}...')
        if not isinstance(flight_id, int):
            self.logger.logger.error(
                f'{InvalidInput} - Input must be an integer!')
            raise InvalidInput('Input must be an integer!')
        elif not isinstance(flight, dict):
            self.logger.logger.error(
                f'{InvalidInput} - Input must be a dictionary!')
            raise InvalidInput('Input must be a dictionary!')
        elif self.get_flight_by_id(flight_id) == None:
            self.logger.logger.error(
                f'{FlightNotFound} - Flight #{flight_id} was not found!')
            raise FlightNotFound
        else:
            current_tickets = self.repo.get_by_id(
                Flights, flight_id).remaining_tickets
            self.repo.update_by_id(Flights, Flights.id, flight_id, flight)
            updated_tickets = self.repo.get_by_id(
                Flights, flight_id).remaining_tickets
            if updated_tickets < int(self.ticket_limit):
                self.repo.update_by_id(Flights, Flights.id, flight_id, {
                                       'remaining_tickets': current_tickets})
                self.logger.logger.error(
                    f'{InvalidRemainingTickets} - Negative number of seats is impossible!')
                raise InvalidRemainingTickets
            else:
                if self.login_token.role != "Administrator":
                    self.logger.logger.error(
                        f'{InvalidToken} - Unauthorized!')
                    raise InvalidToken
                else:
                    self.logger.logger.info(f'Flight updated!')
                    print(
                        f'{updated_tickets} remaining ticket(s) on flight #{flight_id}')
    
    def update_airline(self, airline, airline_id):
        self.logger.logger.debug(
            f'Attempting to update Airline #{airline_id}...')
        if not isinstance(airline_id, int):
            self.logger.logger.error(
                f'{InvalidInput} - Input must be an integer!')
            raise InvalidInput('Input must be an integer!')
        elif not isinstance(airline, dict):
            self.logger.logger.error(
                f'{InvalidInput} - Input must be a dictionary!')
            raise InvalidInput('Input must be a dictionary!')
        elif self.get_airline_by_id(airline_id) == None:
            self.logger.logger.error(
                f'{AirlineNotFound} - Airline #{airline_id} was not found!')
            raise AirlineNotFound
        else:
            if self.login_token.role != "Administrator":
                self.logger.logger.error(
                    f'{InvalidToken} - Unauthorized!')
                raise InvalidToken
            else:
                self.logger.logger.info(f'Airline updated!')
                self.repo.update_by_id(
                    AirlineCompanies, AirlineCompanies.id, airline_id, airline)

    def add_customer(self, customer, user):
        self.logger.logger.debug('Setting up new customer and user...')
        if not isinstance(customer, Customers):
            self.logger.logger.error(
                f'{InvalidInput} - Customer must be a "Customers" object!')
            raise InvalidInput('Input must be a "Customers" object!')
        elif not isinstance(user, Users):
            self.logger.logger.error(
                f'{InvalidInput} - User must be a "Users" object!')
            raise InvalidInput('Input must be a "Users" object!')
        elif self.login_token.role != 'Administrator':
            raise InvalidToken
        elif self.repo.get_by_id(Users, customer.user_id) != None:
            self.logger.logger.error(
                f'{UserAlreadyExists} - User-ID {customer.user_id} already in use!')
            raise UserAlreadyExists
        elif len(user.password) < int(self.password_length):
            self.logger.logger.error(
                f'{PasswordTooShort} - Use at least 6 characters for the password!')
            raise PasswordTooShort
        elif user.user_role == int(self.customer_role_number):
            self.create_user(user)
            self.logger.logger.info(f'User {user.username} created!')
            self.repo.add(customer)
            self.logger.logger.info(
                f'Customer {customer.first_name} {customer.last_name} created!')
        else:
            self.logger.logger.error(
                f'{UnauthorizedUserID} - Unauthorized ID to create a "customer"!')
            raise UnauthorizedUserID

    def remove_admin(self, administrator):
        self.logger.logger.debug(f'Attempting to remove Admin...')
        if not isinstance(administrator, int):
            raise InvalidInput('Input must be an integer!')
        elif self.login_token.role != 'Administrator':
            raise InvalidToken
        admin = self.repo.get_by_id(Administrators, administrator)
        if admin == None:
            raise AdminNotFound
        else:
            admin_user_id = admin.user_id
            self.repo.delete_by_id(
                Administrators, Administrators.id, administrator)
            self.repo.delete_by_id(Users, Users.id, admin_user_id)

    def remove_airline(self, airline):
        self.logger.logger.debug(f'Attempting to remove Airline...')
        if not isinstance(airline, int):
            self.logger.logger.error(
                f'{InvalidInput} - Input must be an integer!!')
            raise InvalidInput('Input must be an integer!')
        elif self.login_token.role != 'Administrator':
            raise InvalidToken
        airline1 = self.repo.get_by_id(AirlineCompanies, airline)
        if airline1 == None:
            self.logger.logger.error(
                f'{AirlineNotFound} - Airline #{airline} was not found!')
            raise AirlineNotFound
        else:
            airline_user_id = airline1.user_id
            self.repo.delete_by_id(
                AirlineCompanies, AirlineCompanies.id, airline)
            self.logger.logger.info(f'Airline #{airline} Deleted!')
            self.repo.delete_by_id(Users, Users.id, airline_user_id)
            self.logger.logger.info(f'User #{airline_user_id} Deleted!')

    def remove_customer(self, customer):
        self.logger.logger.debug(f'Attempting to remove customer...')
        if not isinstance(customer, int):
            self.logger.logger.error(
                f'{InvalidInput} - Input must be an integer!!')
            raise InvalidInput('Input must be an integer!')
        elif self.login_token.role != 'Administrator':
            raise InvalidToken
        customer1 = self.repo.get_by_id(Customers, customer)
        if customer1 == None:
            self.logger.logger.error(
                f'{CustomerNotFound} - Customer #{customer} was not found!')
            raise CustomerNotFound
        else:
            customer1_user_id = customer1.user_id
            self.repo.delete_by_id(Customers, Customers.id, customer)
            self.logger.logger.info(f'Customer #{customer} Deleted!')
            self.repo.delete_by_id(Users, Users.id, customer1_user_id)
            self.logger.logger.info(f'User #{customer1_user_id} Deleted!')

    def remove_flight(self, flight):
        self.logger.logger.debug(f'Attempting to remove flight...')
        if not isinstance(flight, int):
            self.logger.logger.error(
                f'{InvalidInput} - Input must be an integer!!')
            raise InvalidInput('Input must be an integer!')
        elif self.login_token.role != 'Administrator':
            raise InvalidToken
        flight1 = self.repo.get_by_id(Flights, flight)
        if flight1 == None:
            self.logger.logger.error(
                f'{FlightNotFound} - Flight #{flight} was not found!')
            raise FlightNotFound
        else:
            self.repo.delete_by_id(Flights, Flights.id, flight)
            self.logger.logger.info(f'Flight #{flight} Deleted!')

    def __str__(self):
        return f'<<Administrator-Facade: {self.logger}>>\nToken ID: {self.login_token.id} Name: {self.login_token.name} Role: {self.login_token.role}'
