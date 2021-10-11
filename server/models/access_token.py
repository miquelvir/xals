from flask import current_app
from flask_login import UserMixin
from pydantic import BaseModel
from sqlalchemy.ext.hybrid import hybrid_property

from server import db
from server.models._base import MyBase
import uuid


class AccessToken(MyBase, UserMixin):
    PREFIX = '[ACCESS_TOKEN]-'

    __tablename__ = "access_token"
    __mapper_args__ = {"polymorphic_identity": "access_token"}

    id = db.Column(db.Text, primary_key=True)
    comment = db.Column(db.Text, nullable=True, unique=False)
    token = db.Column(db.Text, nullable=False, unique=True)

    restaurant_id = db.Column(db.Text, db.ForeignKey("restaurant.id"))

    issuer_id = db.Column(db.Text, db.ForeignKey("admin.id"))

    @classmethod
    def new(cls, restaurant_id, issuer_id, comment=""):
        return AccessToken(
            id=str(uuid.uuid4()),
            comment=comment,
            token=str(uuid.uuid4()),
            restaurant_id=restaurant_id,
            issuer_id=issuer_id,
        )

    @hybrid_property
    def url(self):
        return f"{current_app.config['FRONTEND_SERVER_URL']}/app/restaurant?id={self.restaurant_id}&token={self.token}"

    class Schema(BaseModel):
        restaurant_id: str
        issuer_id: str
        comment: str
        token: str
        id: str
        url: str

    def to_schema(self):
        return AccessToken.Schema(
            restaurant_id=self.restaurant_id,
            issuer_id=self.issuer_id,
            comment=self.comment,
            token=self.token,
            id=self.id,
            url=self.url
        )

    def get_id(self):
        return f"{AccessToken.PREFIX}{self.id}"

    @classmethod
    def parse_id(cls, id_):
        if not id_.startswith(AccessToken.PREFIX):
            raise ValueError("not a valid access token id")
        return id_[len(AccessToken.PREFIX):]
