import bcrypt
from tables.users import Users
from db_files.logger import Logger
from tables.customers import Customers
from facades.login_token import LoginToken
from facades.facade_base import FacadeBase
from facades.facade_airline import AirlineFacade
from facades.facade_customer import CustomerFacade
from facades.facade_administrator import AdministratorFacade
from errors.error_user_exists import UserAlreadyExists
from errors.error_invalid_input import InvalidInput
from errors.error_user_not_found import UsernameNotFound
from errors.error_short_password import PasswordTooShort
from errors.error_invalid_password import InvalidPassword
from errors.error_invalid_user_role import InvalidUserRole


class AnonymusFacade(FacadeBase):

    def __init__(self, repo, config):
        super().__init__(repo, config)
        self.logger = Logger.get_instance()
        self.admin_role_number = self.config["user_roles"]["admin"]
        self.airline_role_number = self.config["user_roles"]["airline"]
        self.customer_role_number = self.config["user_roles"]["customer"]
        self.password_length = self.config["limits"]["password_length"]

    def login(self, username, password):
        self.logger.logger.debug('Attempting Logging-in...')
        if not isinstance(username, str):
            self.logger.logger.error(
                f'{InvalidInput} - username must be string!')
            raise InvalidInput('username must be string!')
        # elif not isinstance(password, str):
        #     self.logger.logger.error(
        #         f'{InvalidInput} - password must be string!')
        #     raise InvalidInput('password must be a string!')
        user = self.repo.get_by_column_value(Users, Users.username, username)
        if not user:
            self.logger.logger.error(
                f'{UsernameNotFound} - Login attempt failed - username: {username}')
            raise UsernameNotFound(
                f'User not found - Login attempt failed - username: {username}')
        elif not bcrypt.checkpw(password,user[0].password.encode('utf8')):
            self.logger.logger.error(
                f'{InvalidPassword} - Login attempt failed - username: {username}')
            raise InvalidPassword(
                f'Invalid password - Login attempt failed - username: {username}')
        try:
            user_role_dict = {self.admin_role_number: lambda: AdministratorFacade(self.repo, self.config, LoginToken(id=user[0].administrators.user_id, name=user[0].administrators.first_name, role='Administrator')),
                              self.airline_role_number: lambda: AirlineFacade(self.repo, self.config, LoginToken(id=user[0].airline_companies.user_id, name=user[0].airline_companies.name, role='Airline')),
                              self.customer_role_number: lambda: CustomerFacade(self.repo, self.config, LoginToken(id=user[0].customers.user_id, name=user[0].customers.first_name, role='Customer'))}
            self.logger.logger.info(
                f'Welcome, {user[0].username}')
            return user_role_dict[str(user[0].user_role)]()
        except:
            raise InvalidUserRole

    def add_customer(self, customer, user):
        self.logger.logger.debug('Setting up new customer and user...')
        if not isinstance(customer, Customers):
            self.logger.logger.error(
                f'{InvalidInput} - Customer must be a "Customers" object!')
            raise InvalidInput('Customer must be a "Customers" object!')
        elif not isinstance(user, Users):
            self.logger.logger.error(
                f'{InvalidInput} - User must be a "Users" object!')
            raise InvalidInput('User must be a "Users" object!')
        elif self.repo.get_by_id(Users, customer.user_id) != None:
            self.logger.logger.error(
                f'{UserAlreadyExists} - User-ID {customer.user_id} already in use!')
            raise UserAlreadyExists(
                f'User-ID {customer.user_id} already in use!')
        elif len(user.password) < int(self.password_length):
            self.logger.logger.error(
                f'{PasswordTooShort} - Use at least 6 characters for the password!')
            raise PasswordTooShort
        else:
            self.create_user(user)
            new_user = list(self.repo.get_by_column_value(
                Users, Users.username, user.username))
            customer.user_id = new_user[0].id
            self.logger.logger.info(f'User {user.username} created!')
            self.repo.add(customer)
            self.logger.logger.info(
                f'Customer {customer.first_name} {customer.last_name} created!')

    def __str__(self):
        return f'<<Anonymus-Facade: {self.logger}>>'
