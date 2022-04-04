import json
from datetime import datetime
from sqlalchemy import asc
from db_files.logger import Logger
from db_files.db_config import create_all_entities, config
from tables.users import Users
from tables.flights import Flights
from tables.tickets import Tickets
from tables.customers import Customers
from tables.countries import Countries
from tables.user_roles import UserRoles
from tables.administrators import Administrators
from tables.airline_companies import AirlineCompanies


class DbRepo:
    def __init__(self, local_session):
        self.local_session = local_session
        self.logger = Logger.get_instance()

    def get_all(self, table_class):
        return self.local_session.query(table_class).all()

    def get_all_limit(self, table_class, limit_num):
        return self.local_session.query(table_class).limit(limit_num).all()

    def get_all_order_by(self, table_class, column_name, direction=asc):
        return self.local_session.query(table_class).order_by(direction(column_name)).all()

    def get_by_column_value(self, table_class, column_name, value):
        return self.local_session.query(table_class).filter(column_name == value).all()

    def get_by_id(self, table_class, id):
        return self.local_session.get(table_class,id)

    def get_by_condition(self, table_class, cond):
        return cond(self.local_session.query(table_class)).all()
    
    def get_by_ilike(self,table_class, column_name, exp):
        return self.local_session.query(table_class).filter(column_name.ilike(exp)).all()

    def add(self, one_row):
        self.local_session.add(one_row)
        self.local_session.commit()
        print('added')

    def add_all(self, rows_list):
        self.local_session.add_all(rows_list)
        self.local_session.commit()
        print('Multiple added')

    def delete_by_id(self, table_class, id_column_name, id):
        self.local_session.query(table_class).filter(id_column_name == id).delete(synchronize_session=False)
        self.local_session.commit()
        self.logger.logger.warning(f'deleting from table {table_class}.')
        print('Deleted')

    def delete_table(self, table_name):
        self.logger.logger.warning(f'deleting table {table_name}.')
        self.local_session.execute(f'drop TABLE if exists {table_name} cascade')
        self.local_session.commit()
        print(f'{table_name} Deleted')

    def delete_all_tables(self):
        self.logger.logger.warning('deleting all tables.')
        self.delete_table('countries')
        self.delete_table('flights')
        self.delete_table('tickets')
        self.delete_table('airline_companies')
        self.delete_table('administrators')
        self.delete_table('customers')
        self.delete_table('users')
        self.delete_table('user_roles')

    def update_by_id(self, table_class, id_column_name, id, data):
        self.local_session.query(table_class).filter(id_column_name == id).update(data)#data must be dict.
        self.local_session.commit()
        print('Updated')

    def reset_auto_inc(self, table_class):
        self.local_session.execute(f'TRUNCATE TABLE {table_class.__tablename__} RESTART IDENTITY CASCADE')
    
    def create_all_sp(self, file):
            try:
                with open(file, 'r') as sp_file:
                    queries = sp_file.read().split('|||')
                for query in queries:
                    self.local_session.execute(query)
                self.local_session.commit()
                self.logger.logger.debug(f'From {file} - All SP were created.')
            except FileNotFoundError:
                self.logger.logger.critical(f'File "{file}" was not found')

    def reset_db(self):
        self.logger.logger.debug(f'Reseting initial DB.')
        self.delete_all_tables()
        create_all_entities()
        self.reset_auto_inc(Countries)
        self.reset_auto_inc(Users)
        self.reset_auto_inc(AirlineCompanies)
        self.reset_auto_inc(Customers)
        self.reset_auto_inc(Flights)
        self.reset_auto_inc(Tickets)
        self.reset_auto_inc(Administrators)
        self.reset_auto_inc(UserRoles)
        countries = open(config['db']['countries_json'])
        data = json.load(countries)
        for i in data: self.add(Countries(name=i['name']))
        countries.close()
        self.add_all([  UserRoles(role_name='administrator'),
                        UserRoles(role_name='airline company'), 
                        UserRoles(role_name='customer')])
        self.add_all([  Users(username='b0r1s', password='boris1992', email='boris@jb.com', user_role=config['user_roles']['airline']), 
                        Users(username='m4x1m', password='2themax', email='max@jb.com', user_role=config['user_roles']['airline']),
                        Users(username='l10r', password='lior1999', email='lior@jb.com', user_role=config['user_roles']['admin']),
                        Users(username='sh4ch4r', password='18031991', email='shachar@jb.com', user_role=config['user_roles']['admin']), 
                        Users(username='k0st4', password='1kosta1', email='kosta@jb.com', user_role=config['user_roles']['customer']),
                        Users(username='3m1l', password='e0m1i2l', email='emil@jb.com', user_role=config['user_roles']['customer']),
                        Users(username='y4h4v', password='y4h4av5ch', email='yahav@jb.com', user_role=config['user_roles']['customer'])])
        self.add_all([  AirlineCompanies(name='bazooka air', country_id=1, user_id=1),
                        AirlineCompanies(name='sky high', country_id=2, user_id=2)])
        self.add_all([  Administrators(first_name='lior', last_name='musnik', user_id=3),
                        Administrators(first_name='shachar', last_name='harush', user_id=4)])
        self.add_all([  Customers(first_name='kosta', last_name='makarkov', address='rashi 31', phone_number='0507897765', credit_card_number='13323432', user_id=5),
                        Customers(first_name='emil', last_name='tayeb', address='amsterdam 32', phone_number='0523452231', credit_card_number='13245678', user_id=6), 
                        Customers(first_name='yahav', last_name='schwartz', address='lachish 32', phone_number='04786367899', credit_card_number='1342455678', user_id=7)])
        self.add_all([  Flights(airline_company_id=1, origin_country_id=1, destination_country_id=2, departure_time=datetime(2022, 1, 1, 10, 10, 10), landing_time=datetime(2022, 1, 24, 10, 29, 1), remaining_tickets=0),
                        Flights(airline_company_id=2, origin_country_id=2, destination_country_id=1, departure_time=datetime(2022, 3, 18, 10, 12, 10), landing_time=datetime(2022, 12, 4, 23, 29, 1), remaining_tickets=3),
                        Flights(airline_company_id=2, origin_country_id=3, destination_country_id=2, departure_time=datetime(2022, 1, 2, 10, 12, 10), landing_time=datetime(2022, 1, 24, 10, 29, 1), remaining_tickets=400),
                        Flights(airline_company_id=1, origin_country_id=1, destination_country_id=3, departure_time=datetime(2022, 1, 2, 10, 12, 10), landing_time=datetime(2022, 1, 24, 10, 29, 1), remaining_tickets=0)])
        self.add_all([  Tickets(flight_id=1, customer_id=1),
                        Tickets(flight_id=1, customer_id=2),
                        Tickets(flight_id=3, customer_id=2)])
        self.create_all_sp(config['db']['sp_file'])