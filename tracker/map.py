from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from pymongo import MongoClient
from datetime import datetime

app = Flask(__name__)
socketio = SocketIO(app)

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')  # Update with your MongoDB connection string
db = client['locationtracker']  # Replace with your database name
collection = db['location_updates']  # Replace with your collection name

@app.route("/")
def base():
    return render_template('index.html')

@socketio.on('location_update')
def handle_location_update(data):
    # Receive latitude and longitude from the client
    latitude = data['lat']
    longitude = data['lng']
    
    print(f"New location received: {latitude}, {longitude}")

    # Save the location update in MongoDB
    location_data = {
        'latitude': latitude,
        'longitude': longitude,
        'timestamp': datetime.utcnow()  # Store the timestamp of the update
    }
    collection.insert_one(location_data)

    # Emit the updated location back to the client
    emit('new_location', {'lat': latitude, 'lng': longitude}, broadcast=True)

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=8000, debug=True)
