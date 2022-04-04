from abc import ABC, abstractmethod
from db_files.logger import Logger
from datetime import datetime
from tables.users import Users
from tables.flights import Flights
from tables.countries import Countries
from tables.airline_companies import AirlineCompanies
from errors.error_invalid_input import InvalidInput
from errors.error_short_password import PasswordTooShort
from errors.error_invalid_country import InvalidCountry
from errors.error_flight_not_found import FlightNotFound
from errors.error_airline_not_found import AirlineNotFound

class FacadeBase(ABC):

    @abstractmethod
    def __init__(self, repo, config):
        self.repo = repo
        self.config = config
        self.logger = Logger.get_instance()

    def get_all_flights(self):
        self.logger.logger.info(f'Flights(s) Displayed!')
        return self.repo.get_all(Flights)

    def get_flight_by_id(self, id):
        self.logger.logger.debug(f'Attempting to fetch flight #{id}...')
        if not isinstance(id, int): 
            self.logger.logger.error(f'{InvalidInput} - Input must be an integer!')
            raise InvalidInput('Input must be an integer!')
        elif self.repo.get_by_id(Flights, id) == None: 
            self.logger.logger.error(f'{FlightNotFound} - Flight #{id} was not found!')
            raise FlightNotFound
        else: 
            self.logger.logger.info(f'Flight Displayed!')
            return self.repo.get_by_id(Flights, id)

    def get_flights_by_parameters(self, origin_country_id, destination_country_id, date):
        self.logger.logger.debug(f'Attempting to fetch flight by parameters...')
        if not isinstance(origin_country_id, int): 
            self.logger.logger.error(f'{InvalidInput} - Input must be an integer!')
            raise InvalidInput('Input must be an integer!')
        elif not isinstance(destination_country_id, int): 
            self.logger.logger.error(f'{InvalidInput} - Input must be an integer!')
            raise InvalidInput('Input must be an integer!')
        elif not isinstance(date, datetime):  
            self.logger.logger.error(f'{InvalidInput} - Input must be a datetime object!')
            raise InvalidInput('Input must be a datetime object!')
        elif self.repo.get_by_condition(Flights, lambda query: query.filter(Flights.origin_country_id == origin_country_id, Flights.destination_country_id == destination_country_id, Flights.departure_time == date)) == []: 
            self.logger.logger.error(f'{FlightNotFound} - Flight was not found!')
            raise FlightNotFound
        else: 
            self.logger.logger.info(f'Flight Displayed!')
            return self.repo.get_by_condition(Flights, lambda query: query.filter(Flights.origin_country_id == origin_country_id, Flights.destination_country_id == destination_country_id, Flights.departure_time == date))

    def get_all_airlines(self):
        self.logger.logger.info(f'Airline(s) Displayed!')
        return self.repo.get_all(AirlineCompanies)

    def get_airline_by_id(self, id):
        self.logger.logger.debug(f'Attempting to fetch flight #{id}...')
        if not isinstance(id, int): 
            self.logger.logger.error(f'{InvalidInput} - Input must be an integer!')
            raise InvalidInput('Input must be an integer!')
        elif self.repo.get_by_id(AirlineCompanies, id) == None: 
            self.logger.logger.error(f'{AirlineNotFound} - Airline #{id} was not found!')
            raise AirlineNotFound
        else: 
            self.logger.logger.info(f'Airline Displayed!')
            return self.repo.get_by_id(AirlineCompanies, id)

    def get_all_countries(self):
        self.logger.logger.info(f'Country(s) Displayed!')
        return self.repo.get_all(Countries)

    def get_country_by_id(self, id):
        if not isinstance(id, int): 
            self.logger.logger.error(f'{InvalidInput} - Input must be an integer!')
            raise InvalidInput('Input must be an integer!')
        elif self.repo.get_by_id(Countries, id) == None: 
            self.logger.logger.error(f'{InvalidCountry} - Country #{id} was not found!')
            raise InvalidCountry
        else: 
            self.logger.logger.info(f'Country Displayed!')
            return self.repo.get_by_id(Countries, id)

    def create_user(self, user):
        if not isinstance(user, Users): 
            self.logger.logger.error(f'{InvalidInput} - Input must be a "Users" object!')
            raise InvalidInput('Input must be a "Users" object!')
        elif len(user.password) < 6: 
            self.logger.logger.error(f'{PasswordTooShort} - Use at least 6 characters for the password!')
            raise PasswordTooShort
        else: 
            self.logger.logger.info(f'User {user.username} created!')
            self.repo.add(user)

    def __str__(self):
        return f'Base-Facade - REPOSITORY: {self.repo}'