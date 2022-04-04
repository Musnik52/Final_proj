from db_files.db_config import Base
from sqlalchemy.orm import backref, relationship
from sqlalchemy import Column, UniqueConstraint, BigInteger, Text, ForeignKey

class Customers(Base):
    __tablename__ = 'customers'

    id = Column(BigInteger(), primary_key=True, autoincrement=True)
    first_name = Column(Text(), nullable=False)
    last_name = Column(Text(), nullable=False)
    address = Column(Text(), nullable=False, unique=True)
    phone_number = Column(Text(), nullable=False, unique=True)
    credit_card_number = Column(Text(), nullable=False, unique=True)
    user_id = Column(BigInteger(),ForeignKey('users.id', ondelete='CASCADE'), unique=True)

    user = relationship("Users", backref=backref("customers", uselist=False, passive_deletes=True)) 

    __table_args__= (UniqueConstraint('first_name', 'last_name', name='una_2'),)

    def __repr__(self):
        return f'<Customer id={self.id} First name={self.first_name} Last name={self.last_name} Address={self.address} Phone number={self.phone_number} Credit-card number={self.credit_card_number} User id={self.user_id}>'

    def __str__(self):
        return f'<Customer id={self.id} First name={self.first_name} Last name={self.last_name} Address={self.address} Phone number={self.phone_number} Credit-card number={self.credit_card_number} User id={self.user_id}>'