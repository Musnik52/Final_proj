from db_files.db_config import Base
from sqlalchemy import Column, BigInteger, Text


class UserRoles(Base):
    __tablename__ = 'user_roles'

    id = Column(BigInteger(), primary_key=True, autoincrement=True)
    role_name = Column(Text(), unique=True)

    def __repr__(self):
        return f'\n<Role id={self.id} Role name={self.role_name}>'

    def __str__(self):
        return f'<Role id={self.id} Role name={self.role_name}>'
