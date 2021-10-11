__version__ = "4.0.1"

import os

# from flasgger import Swagger
from flask_cors import CORS
from flask_seasurf import SeaSurf
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template, redirect
from flask_talisman import Talisman
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_socketio import SocketIO

# https://github.com/pallets/flask/issues/1045
import mimetypes

mimetypes.add_type("application/javascript", ".js")


db = SQLAlchemy()
man = Talisman()
login = LoginManager()
csrf = SeaSurf()
migrate = Migrate()
socketio = SocketIO()


def init_app(config=None):
    from config import DevelopmentBuiltConfig, ProductionConfig, DevelopmentConfig

    # app creation
    app = Flask(
        __name__,
        static_folder="../web_app/build",
        static_url_path="/",
        template_folder="../web_app/build",
    )

    if config is None:
        env = os.getenv("ENVIRONMENT")
        if env == "production":
            config = ProductionConfig
        elif env == "development-built":
            config = DevelopmentBuiltConfig
        elif env == "development":
            config = DevelopmentConfig
            print("using dev config")
        else:
            raise ValueError("no environment variable found")

    app.config.from_object(config)

    # plugin initialization
    db.init_app(app)
    login.init_app(app)

    if app.config["DEVELOPMENT"]:
        # allow cors only during development (due to the front end development server)
        cors = CORS()
        cors.init_app(app)

    csrf.init_app(app)

    man.init_app(
        app,
        content_security_policy={
            "style-src": [
                "'self'",
                "https://fonts.googleapis.com",
                "'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='",
            ],
            "font-src": ["'self'", "'unsafe-inline'", "https://fonts.gstatic.com"],
            "script-src": [
                "'self'",
                "www.google.com",
                "apis.google.com",
            ],  # allow google for recaptcha
            "default-src": ["'self'"],
            "img-src": ["'self'", "www.gstatic.com"],  # allow google for recaptcha
            "frame-src": [
                "www.google.com",
                "accounts.google.com",
            ],  # allow google for recaptcha
        },
        content_security_policy_nonce_in=["script-src", "style-src"],
    )

    migrate.init_app(app, db)

    allowed_origins = "*" if app.config["DEVELOPMENT"] else ""
    socketio.init_app(app, cors_allowed_origins=allowed_origins)

    with app.app_context():
        from . import blueprints
        from .blueprints.api.config import api_blueprint
        from .blueprints.auth.config import auth_blueprint
        from server.models import Admin

        @login.user_loader
        def user_loader(id_):
            """
            loads a user given its id for Flask-Login

            :param id_: the user id
            :return: the User with that id
            """
            if id_.startswith(Admin.PREFIX):
                id_ = Admin.parse_id(id_)
                return Admin.query.filter_by(id=id_).one_or_none()
            if app.config["DEVELOPMENT"]:
                return Admin.query.filter_by(restaurant_id=None).one_or_none()
            return None

        # serve the react frontend
        @app.route("/")
        def index():
            return redirect("/app/login")

        @app.route("/app", defaults={"path": None})
        @app.route("/app/<path:path>")
        def index2(path):
            return render_template("index.html")

        @app.route("/404")
        @app.errorhandler(404)
        def page_not_found(e):
            return "not found - 404", 404

        # load blueprints for the different parts
        app.register_blueprint(api_blueprint, url_prefix="/api/v1")
        app.register_blueprint(auth_blueprint, url_prefix="/auth/v1")
        # print(swagger.get_apispecs())  # todo customize ui
        from server.blueprints.realtime import config

        from server.containers import Container

        container = Container()
        container.wire(packages=[blueprints])
        app.container = container

        return app, socketio
