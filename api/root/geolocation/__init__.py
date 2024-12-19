from flask import Blueprint

# Create the blueprint
geolocation_bp = Blueprint('geolocation', __name__)

# Import the routes associated with the blueprint
from .geolocation import update_location  # Make sure the import path is correct
