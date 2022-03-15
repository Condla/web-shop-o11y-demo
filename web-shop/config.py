"""Flask configuration variables."""
from os import environ


class Config:
    """Set Flask configuration from .env file."""

    # General Config
    SECRET_KEY = environ.get('SECRET_KEY', "secretkey")
    FLASK_APP = environ.get('FLASK_APP', )
    FLASK_ENV = environ.get('FLASK_ENV')