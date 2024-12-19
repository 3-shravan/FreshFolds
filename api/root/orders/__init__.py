from flask import Blueprint
from flask_restful import Api

orders_bp = Blueprint("orders", __name__)
orders_api=Api(orders_bp)

from . import __routes__