from sqlalchemy import create_engine
from configparser import ConfigParser
from sqlalchemy.orm import declarative_base, sessionmaker

config = ConfigParser()
config.read("C:\git\pyCodeBasement\FINAL_PROJECT\db_files\config.conf")
connection_string = config["db"]["conn_string"]
Base = declarative_base()
engine = create_engine(connection_string, echo=True)


def create_all_entities():
    Base.metadata.create_all(engine)


Session = sessionmaker()
local_session = Session(bind=engine)
