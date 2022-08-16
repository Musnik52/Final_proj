from db_files.db_config import Base
from sqlalchemy.orm import backref, relationship
from sqlalchemy import Column, Integer, DateTime, BigInteger, ForeignKey


class Flights(Base):
    __tablename__ = 'flights'

    id = Column(BigInteger(),
                primary_key=True,
                autoincrement=True)
    airline_company_id = Column(BigInteger(),
                                ForeignKey(
                                'airline_companies.id',
                                ondelete='CASCADE'),
                                nullable=False)
    origin_country_id = Column(BigInteger(),
                               ForeignKey(
                               'countries.id',
                               ondelete='CASCADE'),
                               unique=False,
                               nullable=False)
    destination_country_id = Column(BigInteger(),
                                    ForeignKey(
                                    'countries.id',
                                    ondelete='CASCADE'),
                                    unique=False,
                                    nullable=False)
    departure_time = Column(DateTime(),
                            unique=False,
                            nullable=False)
    landing_time = Column(DateTime(),
                          unique=False,
                          nullable=False)
    remaining_tickets = Column(Integer())

    company = relationship("AirlineCompanies",

                           backref=backref(
                               "flights",
                               uselist=False,
                               passive_deletes=True))
    origin = relationship("Countries",
                          foreign_keys=[
                              origin_country_id],
                          backref=backref("oc_flights",
                                          uselist=False))
    destination = relationship("Countries",
                               foreign_keys=[
                                   destination_country_id],
                               backref=backref("dc_flights",
                                               uselist=False))

    def __repr__(self):
        return f'\n<Flight id={self.id} Airline Co. id={self.airline_company_id} Origin country id={self.origin_country_id} Desitnation country id={self.destination_country_id} Departure time={self.departure_time} Landing time={self.landing_time} Remaining tickets={self.remaining_tickets}>'

    def __str__(self):
        return f'<Flight id={self.id} Airline Co. id={self.airline_company_id} Origin country id={self.origin_country_id} Desitnation country id={self.destination_country_id} Departure time={self.departure_time} Landing time={self.landing_time} Remaining tickets={self.remaining_tickets}>'
