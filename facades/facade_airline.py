from db_files.logger import Logger
from tables.flights import Flights
from tables.airline_companies import AirlineCompanies
from facades.facade_base import FacadeBase
from errors.error_invalid_time import InvalidTime
from errors.error_invalid_input import InvalidInput
from errors.error_invalid_token import InvalidToken
from errors.error_flight_not_found import FlightNotFound
from errors.error_invalid_location import InvalidLocation
from errors.error_airline_not_found import AirlineNotFound
from errors.error_invalid_remaining_tickets import InvalidRemainingTickets


class AirlineFacade(FacadeBase):

    def __init__(self, repo, config, login_token):
        super().__init__(repo, config)
        self.login_token = login_token
        self.logger = Logger.get_instance()
        self.ticket_limit = self.config["limits"]["ticket_limit"]

    def get_flights_by_airline(self, airline):
        self.logger.logger.debug(
            f'Attempting to fetch flight(s) for airline #{airline}...')
        if not isinstance(airline, int):
            self.logger.logger.error(
                f'{InvalidInput} - Input must be an integer!!')
            raise InvalidInput('Input must be an integer!')
        elif self.repo.get_by_id(AirlineCompanies, airline) == None:
            self.logger.logger.error(
                f'{AirlineNotFound} - Airline #{airline} was not found!')
            raise AirlineNotFound
        else:
            airline_check = self.repo.get_by_id(AirlineCompanies, airline)
            if self.login_token.id != airline_check.user_id:
                self.logger.logger.error(
                    f'{InvalidToken} - you cannot edit for other airline!')
                raise InvalidToken
            else:
                self.logger.logger.info(f'Flight(s) for #{airline} Displayed!')
                return self.repo.get_by_column_value(Flights, Flights.airline_company_id, airline)

    def add_flight(self, flight):
        self.logger.logger.debug('Attempting to create a flight...')
        if not isinstance(flight, Flights):
            self.logger.logger.error(
                f'{InvalidInput} - Input must be an "Flights" object!')
            raise InvalidInput('Input must be "Flights" object!')
        elif flight.departure_time > flight.landing_time:
            self.logger.logger.error(
                f'{InvalidTime} - Departure time cannot be later than landing time!')
            raise InvalidTime
        elif flight.remaining_tickets < int(self.ticket_limit):
            self.logger.logger.error(
                f'{InvalidRemainingTickets} - Negative number of seats is impossible!')
            raise InvalidRemainingTickets
        elif flight.origin_country_id == flight.destination_country_id:
            self.logger.logger.error(
                f'{InvalidLocation} - Destination & origin countries cannot be the same country!')
            raise InvalidLocation
        else:
            airline_check = self.repo.get_by_id(
                AirlineCompanies, flight.airline_company_id)
            if self.login_token.id != airline_check.user_id:
                self.logger.logger.error(
                    f'{InvalidToken} - you cannot edit for other airline!')
                raise InvalidToken
            else:
                self.logger.logger.info(f'Flight created!')
                self.repo.add(flight)

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
            airline_check = self.repo.get_by_id(AirlineCompanies, airline_id)
            if self.login_token.id != airline_check.user_id:
                self.logger.logger.error(
                    f'{InvalidToken} - you cannot edit for other airline!')
                raise InvalidToken
            else:
                self.logger.logger.info(f'Airline updated!')
                self.repo.update_by_id(
                    AirlineCompanies, AirlineCompanies.id, airline_id, airline)

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
                flight_check = self.repo.get_by_id(Flights, flight_id)
                airline_check = self.repo.get_by_id(
                    AirlineCompanies, flight_check.airline_company_id)
                if self.login_token.id != airline_check.user_id:
                    self.logger.logger.error(
                        f'{InvalidToken} - you cannot edit for other airline!')
                    raise InvalidToken
                else:
                    self.logger.logger.info(f'Flight updated!')
                    print(
                        f'{updated_tickets} remaining ticket(s) on flight #{flight_id}')

    def remove_flight(self, flight_id):
        self.logger.logger.debug(
            f'Attempting to remove flight #{flight_id}...')
        if not isinstance(flight_id, int):
            self.logger.logger.error(
                f'{InvalidInput} - Input must be an integer!!')
            raise InvalidInput('Input must be an integer!')
        elif self.get_flight_by_id(flight_id) == None:
            self.logger.logger.error(
                f'{FlightNotFound} - Flight #{flight_id} was not found!')
            raise FlightNotFound
        else:
            flight_check = self.repo.get_by_id(Flights, flight_id)
            airline_check = self.repo.get_by_id(
                AirlineCompanies, flight_check.airline_company_id)
            if self.login_token.id != airline_check.user_id:
                self.logger.logger.error(
                    f'{InvalidToken} - you cannot edit for other airline!')
                raise InvalidToken
            else:
                self.repo.delete_by_id(Flights, Flights.id, flight_id)
                self.logger.logger.info(f'Flight #{flight_id} Deleted!')

    def __str__(self):
        return f'<<Airline-Facade: {self.logger}>>\nToken ID: {self.login_token.id} Name: {self.login_token.name} Role: {self.login_token.role}'
