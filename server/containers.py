from dependency_injector import containers, providers

from server.services.jwt_service import JwtService
from server.services.recaptcha_service import RecaptchaService


class Container(
    containers.DeclarativeContainer
):  # todo can we migrate to not using this and just use patch in the mock library?
    recaptcha_service = providers.Singleton(RecaptchaService)
    jwt_service = providers.Factory(JwtService)
