from db_files.db_config import Base
from sqlalchemy.orm import backref, relationship
from sqlalchemy import Column, Integer, BigInteger, Text, ForeignKey


class Users(Base):
    __tablename__ = 'users'

    id = Column(BigInteger(), primary_key=True, autoincrement=True)
    username = Column(Text(), nullable=False, unique=True)
    password = Column(Text(), nullable=False)
    email = Column(Text(), nullable=False, unique=True)
    public_id = Column(Text(), unique=True)
    user_role = Column(Integer(), ForeignKey(
        'user_roles.id', ondelete='CASCADE'), unique=False, nullable=False)

    userrole = relationship("UserRoles", backref=backref(
        "users", uselist=False, passive_deletes=True))

    def __repr__(self):
        return f'\n<User id={self.id} Username={self.username} Password={self.password} Email={self.email} User role={self.user_role}>'

    def __str__(self):
        return f'<User id={self.id} Username={self.username} Password={self.password} Email={self.email} User role={self.user_role}>'
