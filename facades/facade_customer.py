from db_files.logger import Logger
from tables.users import Users
from tables.tickets import Tickets
from tables.flights import Flights
from tables.customers import Customers
from facades.facade_base import FacadeBase
from errors.error_invalid_input import InvalidInput
from errors.error_invalid_token import InvalidToken
from errors.error_no_more_tickets import NoMoreTicketsLeft
from errors.error_flight_not_found import FlightNotFound
from errors.error_ticket_not_found import TicketNotFound
from errors.error_customer_not_found import CustomerNotFound


class CustomerFacade(FacadeBase):

    def __init__(self, repo, config, login_token):
        super().__init__(repo, config)
        self.login_token = login_token
        self.logger = Logger.get_instance()

    def update_customer(self, customer, customer_id):
        self.logger.logger.debug(
            f'Attempting to update customer #{customer_id}...')
        if not isinstance(customer_id, int):
            self.logger.logger.error(
                f'{InvalidInput} - Input must be an integer!')
            raise InvalidInput('Input must be an integer!')
        elif not isinstance(customer, dict):
            self.logger.logger.error(
                f'{InvalidInput} - Input must be an integer!')
            raise InvalidInput('input must be a dictionary!')
        elif self.repo.get_by_id(Customers, customer_id) == None:
            self.logger.logger.error(
                f'{CustomerNotFound} - Customer #{customer_id} was not found!')
            raise CustomerNotFound
        else:
            customer_check = self.repo.get_by_id(Customers, customer_id)
            if self.login_token.id != customer_check.user_id:
                self.logger.logger.error(
                    f'{InvalidToken} - you cannot edit other customers!')
                raise InvalidToken
            else:
                self.logger.logger.info(f'Customer #{customer_id} Updated!')
                self.repo.update_by_id(
                    Customers, Customers.id, customer_id, customer)

    def add_ticket(self, ticket):
        self.logger.logger.debug(f'Attempting to create ticket...')
        if not isinstance(ticket, Tickets):
            self.logger.logger.error(
                f'{InvalidInput} - Input must be an "Tickets" object!')
            raise InvalidInput('Input must be an "Tickets" object!')
        flight = self.get_flight_by_id(ticket.flight_id)
        if flight == None:
            self.logger.logger.error(
                f'{FlightNotFound} - Flight #{ticket.flight_id} was not found!')
            raise FlightNotFound
        elif flight.remaining_tickets == 0:
            self.logger.logger.error(
                f'{NoMoreTicketsLeft} - No seats available. Ticket canceled!')
            raise NoMoreTicketsLeft
        else:
            customer_check = self.repo.get_by_id(Customers, ticket.customer_id)
            if self.login_token.id != customer_check.user_id:
                self.logger.logger.error(
                    f'{InvalidToken} - you cannot edit for other customers!')
                raise InvalidToken
            else:
                self.repo.add(ticket)
                self.repo.update_by_id(Flights, Flights.id, ticket.flight_id, {
                                       'remaining_tickets': flight.remaining_tickets - 1})
                self.logger.logger.info(f'Ticket created!')

    def remove_ticket(self, ticket):
        self.logger.logger.debug(f'Attempting to remove ticket #{ticket}...')
        if not isinstance(ticket, int):
            self.logger.logger.error(
                f'{InvalidInput} - Input must be an integer!!')
            raise InvalidInput('Input must be an integer!')
        elif self.repo.get_by_id(Tickets, ticket) == None:
            self.logger.logger.error(
                f'{TicketNotFound} - Ticket #{ticket} was not found!')
            raise TicketNotFound
        else:
            ticket_delete = self.repo.get_by_id(Tickets, ticket)
            customer = self.repo.get_by_id(
                Customers, ticket_delete.customer_id)
            if self.login_token.id != customer.user_id:
                self.logger.logger.error(
                    f'{InvalidToken} - you cannot edit for other customers!')
                raise InvalidToken
            else:
                flight = self.get_flight_by_id(ticket_delete.flight_id)
                self.repo.update_by_id(Flights, Flights.id, flight.id, {
                                       'remaining_tickets': flight.remaining_tickets + 1})
                self.repo.delete_by_id(Tickets, Tickets.id, ticket)
                self.logger.logger.info(f'Ticket #{ticket} Deleted!')

    def remove_customer(self, customer_id):
        self.logger.logger.debug(f'Attempting to remove customer...')
        if not isinstance(customer_id, int):
            self.logger.logger.error(
                f'{InvalidInput} - Input must be an integer!!')
            raise InvalidInput('Input must be an integer!')
        elif self.login_token.role != 'Customer':
            raise InvalidToken
        customer1 = self.repo.get_by_id(Customers, customer_id)
        if customer1 == None:
            self.logger.logger.error(
                f'{CustomerNotFound} - Customer #{customer_id} was not found!')
            raise CustomerNotFound
        else:
            customer1_user_id = customer1.user_id
            self.repo.delete_by_id(Customers, Customers.id, customer_id)
            self.logger.logger.info(f'Customer #{customer_id} Deleted!')
            self.repo.delete_by_id(Users, Users.id, customer1_user_id)
            self.logger.logger.info(f'User #{customer1_user_id} Deleted!')

    def get_ticket_by_customer(self, customer):
        self.logger.logger.debug(
            f'Attempting to fetch ticket(s) for customer #{customer}...')
        if not isinstance(customer, int):
            self.logger.logger.error(
                f'{InvalidInput} - Input must be an integer!!')
            raise InvalidInput('Input must be an integer!')
        elif self.repo.get_by_id(Customers, customer) == None:
            self.logger.logger.error(
                f'{CustomerNotFound} - Customer #{customer} was not found!')
            raise CustomerNotFound
        else:
            customer_check = self.repo.get_by_id(Customers, customer)
            if self.login_token.id != customer_check.user_id:
                self.logger.logger.error(
                    f'{InvalidToken} - you cannot edit for other customers!')
                raise InvalidToken
            else:
                self.logger.logger.info(
                    f'Ticket(s) for #{customer} Displayed!')
                return self.repo.get_by_column_value(Tickets, Tickets.customer_id, customer)

    def __str__(self):
        return f'<<Customer-Facade: {self.logger}>>\nToken ID: {self.login_token.id} Name: {self.login_token.name} Role: {self.login_token.role}'
