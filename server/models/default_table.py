from flask_login import UserMixin
from pydantic import BaseModel

from server import db
from server.models._base import MyBase
import uuid


class DefaultTable(MyBase):
    __tablename__ = "default_table"
    __mapper_args__ = {"polymorphic_identity": "default_table"}

    name = db.Column(db.Text, primary_key=True)
    restaurant_id = db.Column(
        db.Text, db.ForeignKey("restaurant.id", ondelete="CASCADE"), primary_key=True
    )

    class Schema(BaseModel):
        restaurant_id: str
        name: str

    def to_schema(self):
        return DefaultTable.Schema(restaurant_id=self.restaurant_id, name=self.name)
