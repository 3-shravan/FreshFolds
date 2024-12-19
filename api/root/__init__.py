from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_restful import Api
from config import Config
from flask_socketio import SocketIO

# Initialize SocketIO globally
socketio = SocketIO(cors_allowed_origins="*")


def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(Config)
    app.debug = True
    CORS(app, resources={r"/*": {"origins": "*"}})

    jwt = JWTManager()

    api = Api(app)

    # from root.home import Home
    # api.add_resource(Home, "/", endpoint="Home")

    from root.auth import auth_bp
    app.register_blueprint(auth_bp)

    from root.dashboard import dashboard_bp
    app.register_blueprint(dashboard_bp, url_prefix="/api")
    
    from root.orders import orders_bp
    app.register_blueprint(orders_bp, url_prefix="/api")

    from root.orders.neworder import neworder_bp , trackorder_bp
    app.register_blueprint(neworder_bp, url_prefix="/api") 
    app.register_blueprint(trackorder_bp, url_prefix="/api")
    
    # Import and register the geolocation blueprint
    from root.geolocation import geolocation_bp
    app.register_blueprint(geolocation_bp, url_prefix="/api")

    api.init_app(app)
    jwt.init_app(app)

    register_socketio_events(socketio)

    return app

def register_socketio_events(socketio):
    """Import and register SocketIO events."""
    from root.socket.events import handle_location_update
    socketio.on_event('location_update', handle_location_update)

# if __name__ == "__main__":
#     app = create_app()
#     socketio.run(app, host="0.0.0.0", port=8000, debug=True)