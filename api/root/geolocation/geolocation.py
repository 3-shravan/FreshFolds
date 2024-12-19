from flask import request, jsonify
from geopy.geocoders import Nominatim
from . import geolocation_bp

geolocator = Nominatim(user_agent="location_tracker")

@geolocation_bp.route('/location', methods=['POST'])
def update_location():
    """Fetch address from latitude and longitude."""
    data = request.get_json()
    location = geolocator.reverse(f"{data['lat']}, {data['lng']}")
    return jsonify({'address': location.address if location else "Address not found"})
