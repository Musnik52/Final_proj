import json
from db_files.db_repo import DbRepo
from db_files.db_config import local_session, config
from db_files.db_rabbit_consumer import DbRabbitConsumer
from facades.facade_anonymus import AnonymusFacade


def callback(ch, method, properties, body):
    data = json.loads(body)
    repo = DbRepo(local_session)
    anonymus_facade = AnonymusFacade(repo, config)
    '''data_dict = {'GET': lambda:,
                    'POST': lambda:,
                    'PUT': lambda:,
                    'DELETE': lambda:}'''
    if data['role'] == 'admin':
        admin_facade = anonymus_facade.login(
            data['username'], data['password'])
        pass
    elif data['role'] == 'airline':
        airline_facade = anonymus_facade.login(
            data['username'], data['password'])
        pass
    elif data['role'] == 'customer':
        customer_facade = anonymus_facade.login(
            data['username'], data['password'])
        pass


def main():
    rabbit = DbRabbitConsumer(queue_name='DataFromWeb', callback=callback)
    rabbit.consume()


if __name__ == '__main__':
    main()
