import json
import bcrypt
from facades.facade_anonymus import AnonymusFacade
from tables.users import Users
from tables.flights import Flights
from tables.tickets import Tickets
from tables.customers import Customers
from tables.administrators import Administrators
from tables.airline_companies import AirlineCompanies
from db_files.db_repo import DbRepo
from db_files.db_config import local_session, config, mongo_insert, mongo_delete_one
from db_files.db_rabbit_consumer import DbRabbitConsumer
from db_files.db_rabbit_producer import DbRabbitProducer

repo = DbRepo(local_session)
anonymus_facade = AnonymusFacade(repo, config)


def admin_callback(ch, method, properties, body):
    data = json.loads(body)
    admin_facade = anonymus_facade.login(
        data["username"], data["password"].encode('utf8'))
    print("#"*50)
    print(data)
    print("#"*50)
    if data["action"] == 'addAdmin':
        salt = bcrypt.gensalt()
        new_user = Users(username=data["new_username"],
                         password=bcrypt.hashpw(data["new_password"].encode(
                             'utf8'), salt).decode('utf8'),
                         email=data["new_email"],
                         public_id=str(data['public_id']),
                         user_role=int(config["user_roles"]["admin"]))
        mongo_insert({"username": data["new_username"],
                      "password": bcrypt.hashpw(data["new_password"].encode(
                          'utf8'), salt).decode('utf8'),
                      "email": data["new_email"],
                      "public_id": data["public_id"],
                      "user_role": "admin"})
        new_admin = Administrators(first_name=data["first_name"],
                                   last_name=data["last_name"],
                                   user_id=new_user.id)
        admin_facade.add_administrator(new_admin, new_user)

    elif data["action"] == 'addAirline':
        salt = bcrypt.gensalt()
        new_user = Users(username=data["new_username"],
                         password=bcrypt.hashpw(data["new_password"].encode(
                             'utf8'), salt).decode('utf8'),
                         email=data["new_email"],
                         public_id=str(data['public_id']),
                         user_role=int(config["user_roles"]["airline"]))
        mongo_insert({"username": data["new_username"],
                      "password": bcrypt.hashpw(data["new_password"].encode(
                          'utf8'), salt).decode('utf8'),
                      "email": data["new_email"],
                      "public_id": data["public_id"],
                      "user_role": "airline"})
        new_airline = AirlineCompanies(name=data["name"],
                                       country_id=data["country_id"],
                                       user_id=new_user.id)
        admin_facade.add_airline(new_airline, new_user)

    elif data["action"] == "updateAdmin":
        admin_updates = {"first_name": data["first_name"],
                         "last_name": data["last_name"], }
        admin_facade.update_admin(admin_updates, int(data["id"]))

    elif data["action"] == "updateAirline":
        airline_updates = {"name": data["name"],
                           "country_id": data["country_id"], }
        admin_facade.update_airline(airline_updates, int(data["id"]))

    elif data["action"] == "updateFlight":
        flight_data = {"origin_country_id": data["originId"],
                       "destination_country_id": data["destinationId"],
                       "departure_time": data["departurTime"],
                       "landing_time": data["landingTime"],
                       "remaining_tickets": int(data["remainingTickets"])}
        admin_facade.update_flight(flight_data, int(data["flightId"]))

    elif data["action"] == "deleteAdmin":
        admin_facade.remove_admin(int(data["id"]))
        mongo_delete_one(data["username"])

    elif data["action"] == "deleteAirline":
        admin_facade.remove_airline(int(data["id"]))
        mongo_delete_one(data["airline_username"])

    elif data["action"] == "deleteCustomer":
        admin_facade.remove_customer(int(data["id"]))
        mongo_delete_one(data["customer_username"])

    elif data["action"] == "removeFlight":
        admin_facade.remove_flight(int(data["id"]))

    rabbit_producer = DbRabbitProducer(data["queue_name"])
    rabbit_producer.publish(json.dumps({"status": "SUCCESS"}))


if __name__ == '__main__':
    customer_rabbit = DbRabbitConsumer(
        queue_name='admin', callback=admin_callback)
    customer_rabbit.consume()
