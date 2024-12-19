from flask_socketio import emit

def handle_location_update(data):
    """Handle location updates via WebSocket."""
    emit('new_location', data, broadcast=True)
