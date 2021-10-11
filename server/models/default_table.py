from flask_login import UserMixin
from server import db
from server.models._base import MyBase
import uuid


class DefaultTable(MyBase):
    __tablename__ = "default_table"
    __mapper_args__ = {"polymorphic_identity": "default_table"}

    name = db.Column(db.Text, primary_key=True)
    issuer_id = db.Column(db.Text, db.ForeignKey("admin.id"))
    restaurant_id = db.Column(db.Text, db.ForeignKey("restaurant.id"), primary_key=True)




