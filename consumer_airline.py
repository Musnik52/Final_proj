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
from db_files.db_config import local_session, config, mongo_insert
from db_files.db_rabbit_consumer import DbRabbitConsumer
from db_files.db_rabbit_producer import DbRabbitProducer

repo = DbRepo(local_session)
anonymus_facade = AnonymusFacade(repo, config)


def airline_callback(ch, method, properties, body):
    data = json.loads(body)
    print("#"*50)
    print(data)
    print("#"*50)
    if data["action"] == 'addFlight':
        pass

    elif data["action"] == "updateAirline":
        airline_facade = anonymus_facade.login(
            data["username"], data["password"].encode('utf8'))
        airline_id = int(data["id"])
        airline_updates = {"name": data["name"],
                           "country_id": data["country_id"],
                           "user_id": data["user_id"]}
        airline_facade.update_airline(airline_updates, airline_id)

    elif data["action"] == "remove":
        pass

    rabbit_producer = DbRabbitProducer(data["queue_name"])
    rabbit_producer.publish(json.dumps({"status": "SUCCESS"}))


if __name__ == '__main__':
    customer_rabbit = DbRabbitConsumer(
        queue_name='airline', callback=airline_callback)
    customer_rabbit.consume()
