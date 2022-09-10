from db_files.db_repo import DbRepo
from db_files.db_config import local_session

# defining
repo = DbRepo(local_session)

# db_refresh
repo.reset_db()
print('DONE')
