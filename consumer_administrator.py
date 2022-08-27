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
    print("#"*50)
    print(data)
    print("#"*50)
    if data["action"] == 'addAirline':
        salt = bcrypt.gensalt()
        new_user = Users(username=data["username"],
                         password=bcrypt.hashpw(data["password"].encode(
                             'utf8'), salt).decode('utf8'),
                         email=data["email"],
                         public_id=str(data['public_id']),
                         user_role=config["user_roles"]["airline"])
        mongo_insert({"username": data["username"],
                      "password": bcrypt.hashpw(data["password"].encode(
                          'utf8'), salt).decode('utf8'),
                      "email": data["email"],
                      "public_id": data["public_id"],
                      "user_role": "airline"})
        new_airline = AirlineCompanies(name=data["name"],
                                       country_id=data["country_id"],
                                       user_id=new_user.id)
        anonymus_facade.add_airline(new_airline, new_user)

    elif data["action"] == 'addAdmin':
        salt = bcrypt.gensalt()
        new_user = Users(username=data["username"],
                         password=bcrypt.hashpw(data["password"].encode(
                             'utf8'), salt).decode('utf8'),
                         email=data["email"],
                         public_id=str(data['public_id']),
                         user_role=config["user_roles"]["airline"])
        mongo_insert({"username": data["username"],
                      "password": bcrypt.hashpw(data["password"].encode(
                          'utf8'), salt).decode('utf8'),
                      "email": data["email"],
                      "public_id": data["public_id"],
                      "user_role": "airline"})
        new_admin = Administrators(first_name=data["first_name"],
                                   last_name=data["last_name"],
                                   user_id=new_user.id)
        anonymus_facade.add_administrator(new_admin, new_user)

    elif data["action"] == "updateAdmin":
        admin_facade = anonymus_facade.login(
            data["username"], data["password"].encode('utf8'))
        admin_id = int(data["id"])
        admin_updates = {"first_name": data["first_name"],
                         "last_name": data["last_name"], }
        admin_facade.update_admin(admin_updates, admin_id)

    elif data["action"] == "deleteAdmin":
        admin_facade = anonymus_facade.login(
            data["username"], data["password"].encode('utf8'))
        admin_id = int(data["id"])
        admin_facade.remove_admin(admin_id)
        mongo_delete_one(data["username"])

    elif data["action"] == "deleteAirline":
        pass

    elif data["action"] == "deleteCustomer":
        pass

    rabbit_producer = DbRabbitProducer(data["queue_name"])
    rabbit_producer.publish(json.dumps({"status": "SUCCESS"}))


if __name__ == '__main__':
    customer_rabbit = DbRabbitConsumer(
        queue_name='admin', callback=admin_callback)
    customer_rabbit.consume()
