from threading import Thread

from flask import current_app

from server.models import Student, User
from server import signals

from server.schemas.schemas import StudentSchema, UserSchema


def when_student_enrolled(_, student: Student) -> None:
    pass


def when_user_password_reset_request(_, user: User, token: str) -> None:
    pass


def when_user_password_changed(_, user: User) -> None:
    pass


def add_subscribers():
    signals.student_pre_enrolled.connect(when_student_enrolled)
    signals.user_password_reset_request.connect(when_user_password_reset_request)
    signals.user_password_changed.connect(when_user_password_changed)
