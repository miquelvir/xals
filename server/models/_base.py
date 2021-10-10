import uuid

from sqlalchemy.orm.attributes import InstrumentedAttribute
from sqlalchemy.ext.hybrid import hybrid_property
from server import db


class MyBase(db.Model):
    __abstract__ = True

    id: str  # common interface, all of our models must have a field id

    @classmethod
    def get_field(cls, item):
        field = cls.__dict__[item]

        if not isinstance(field, (InstrumentedAttribute, hybrid_property)):
            raise AttributeError("protected field '%s' can't be accessed" % item)

        return field

    @classmethod
    def generate_new_id(cls, avoid=None):
        return str(
            uuid.uuid4()
        )  # to avoid coupling to db since probability of collision is negligible

