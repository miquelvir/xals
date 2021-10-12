from flask_login import UserMixin
from pydantic import BaseModel

from server import db
from server.models._base import MyBase
import re


class Admin(MyBase, UserMixin):
    __tablename__ = "admin"
    __mapper_args__ = {"polymorphic_identity": "admin"}

    PREFIX = "[ADMIN]-"

    id = db.Column(db.Text, primary_key=True)
    email = db.Column(db.Text, nullable=False, unique=True)

    restaurant_id = db.Column(db.Text, db.ForeignKey("restaurant.id"))

    access_tokens = db.relationship(
        "AccessToken",
        backref="issuer",
    )

    def login(self, token: str) -> bool:
        """checks if the token is a valid google sign in token for this email"""
        # todo !!! do not merge !!! use G Sign in
        return True

    def get_id(self):
        return f"{Admin.PREFIX}{self.id}"

    @classmethod
    def parse_id(cls, id_):
        if not id_.startswith(Admin.PREFIX):
            raise ValueError("not a valid admin id")
        return id_[len(Admin.PREFIX) :]

    class Schema(BaseModel):
        id: str
        email: str

    def to_schema(self):
        return Admin.Schema(id=self.id, email=self.email)

    @classmethod
    def is_email_valid(cls, email):
        return re.match(r"[^@]+@[^@]+\.[^@]+", email)
