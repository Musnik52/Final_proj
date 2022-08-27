from sqlalchemy import create_engine
from configparser import ConfigParser
from sqlalchemy.orm import declarative_base, sessionmaker
import pymongo

config = ConfigParser()
config.read("C:\git\pyCodeBasement\FINAL_PROJECT\db_files\config.conf")

# SQL
connection_string = config["db"]["conn_string"]
Base = declarative_base()
engine = create_engine(connection_string, echo=True)

# MongoDB
cluster = pymongo.MongoClient(config["db"]["mongo_conn"])
db = cluster["airlock-userAuth"]
collection = db["users"]


def create_all_entities():
    Base.metadata.create_all(engine)


def mongo_insert(data):
    collection.insert_one(data)


def mongo_delete():
    collection.delete_many({})


def mongo_delete_one(username):
    collection.delete_one({'username': username})


Session = sessionmaker()
local_session = Session(bind=engine)
