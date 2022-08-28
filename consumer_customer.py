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


def customer_callback(ch, method, properties, body):
    data = json.loads(body)
    print("#"*50)
    print(data)
    print("#"*50)
    if data["action"] == 'addCustomer':
        salt = bcrypt.gensalt()
        new_user = Users(username=data["username"],
                         password=bcrypt.hashpw(data["password"].encode(
                             'utf8'), salt).decode('utf8'),
                         email=data["email"],
                         public_id=str(data['public_id']),
                         user_role=config["user_roles"]["customer"])
        mongo_insert({"username": data["username"],
                      "password": bcrypt.hashpw(data["password"].encode(
                          'utf8'), salt).decode('utf8'),
                      "email": data["email"],
                      "public_id": data["public_id"],
                      "user_role": "customer"})
        new_customer = Customers(first_name=data["first_name"],
                                 last_name=data["last_name"],
                                 address=data["address"],
                                 phone_number=data["phone_number"],
                                 credit_card_number=data["credit_card_number"],
                                 user_id=new_user.id)
        anonymus_facade.add_customer(new_customer, new_user)

    elif data["action"] == "updateCustomer":
        customer_facade = anonymus_facade.login(
            data["username"], data["password"].encode('utf8'))
        customer_id = int(data["id"])
        customer_updates = {"first_name": data["first_name"],
                            "last_name": data["last_name"],
                            "address": data["address"],
                            "phone_number": data["phone_number"],
                            "credit_card_number": data["credit_card_number"]}
        customer_facade.update_customer(customer_updates, customer_id)

    elif data["action"] == "deleteCustomer":
        customer_facade = anonymus_facade.login(
            data["username"], data["password"].encode('utf8'))
        customer_id = int(data["id"])
        customer_facade.remove_customer(customer_id)
        mongo_delete_one(data["username"])

    elif data["action"] == "addTicket":
        customer_facade = anonymus_facade.login(
            data["username"], data["password"].encode('utf8'))
        ticket = Tickets(flight_id=int(data["flight_id"]),
                         customer_id=int(data["customer_id"]))
        customer_facade.add_ticket(ticket)

    elif data["action"] == "removeTicket":
        customer_facade = anonymus_facade.login(
            data["username"], data["password"].encode('utf8'))
        ticket = int(data["ticket_id"])
        customer_facade.remove_ticket(ticket)

    rabbit_producer = DbRabbitProducer(data["queue_name"])
    rabbit_producer.publish(json.dumps({"status": "SUCCESS"}))


if __name__ == '__main__':
    customer_rabbit = DbRabbitConsumer(
        queue_name='customer', callback=customer_callback)
    customer_rabbit.consume()
