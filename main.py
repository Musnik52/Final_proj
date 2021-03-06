from db_files.db_repo import DbRepo
from db_files.db_config import local_session, config
from facades.facade_anonymus import AnonymusFacade

# defining
repo = DbRepo(local_session)
anonymus_facade = AnonymusFacade(repo, config)
admin_facade = anonymus_facade.login('l10r', 'lior1999')
airline_facade = anonymus_facade.login('m4x1m', '2themax')
customer_facade = anonymus_facade.login('3m1l', 'e0m1i2l')

# db_refresh
repo.reset_db()
print('DONE')

