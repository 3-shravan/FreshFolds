# from flask import Blueprint, request, jsonify
# from flask_restful import Api, Resource
# import random
# from root.db import mdb  
# from root.general.authUtils import validate_auth

# orders_collection = mdb['orders']

# def generate_tracking_id():
#     return str(random.randint(100000, 999999))

# class create_order(Resource):
#     validate_auth(optional=True)
#     def post(self, suid, suser):
#         data = request.get_json(silent=True)
#         tracking_id = generate_tracking_id()
#         new_order = {
#             'trackingId': tracking_id,
#             'fullName': data.get('fullName'),
#             'user_id': data.get('user_id'),
#             'address': data.get('address'),
#             'numberOfClothes': data.get('numberOfClothes'),
#             'dateSubmitted': data.get('dateSubmitted'),
#             'expectedDate': data.get('expectedDate'),
#             'status': data.get('status')
#         }
#         result = orders_collection.insert_one(new_order)
#         new_order['_id'] = str(result.inserted_id)
#         return jsonify(new_order), 201


# class check_tracking_id(Resource):
#     validate_auth(optional=True)
#     def post(self,suid,suser):
#         try:
#             data = request.get_json(silent=True)
#             tracking_id = data.get('trackingId')

#             # Check if the tracking ID exists in the MongoDB collection
#             exists = orders_collection.find_one({'trackingId': tracking_id}) is not None

#             return jsonify({'exists': exists})
#         except Exception as e:
#             print(f"Error: {e}")
#             return jsonify({'error': str(e)}), 500



from flask import Blueprint, request, jsonify
import random
from root.db import mdb  


neworder_bp = Blueprint('neworder', __name__)
trackorder_bp = Blueprint('trackorder', __name__)


orders_collection = mdb['orders']

def generate_tracking_id():
    return str(random.randint(100000, 999999))

@neworder_bp.route('/orders', methods=['POST'])
def create_order():
    print("Received POST request on /api/orders")  # Debugging line
    data = request.json
    print("Request data:", data)  # Debugging line

    tracking_id = generate_tracking_id()
    print("Generated tracking ID:", tracking_id)  # Debugging line

    new_order = {
        'trackingId': tracking_id,
        'fullName': data.get('fullName'),
        'user_id': data.get('user_id'),
        'address': data.get('address'),
        'numberOfClothes': data.get('numberOfClothes'),
        'dateSubmitted': data.get('dateSubmitted'),
        'expectedDate': data.get('expectedDate'),
        'status': data.get('status')
    }

   
    result = orders_collection.insert_one(new_order)

    new_order['_id'] = str(result.inserted_id)  
    return jsonify(new_order), 201

@neworder_bp.route('/check-tracking-id', methods=['POST'])
def check_tracking_id():
    try:
        data = request.json
        tracking_id = data.get('trackingId')

        # Check if the tracking ID exists in the MongoDB collection
        exists = orders_collection.find_one({'trackingId': tracking_id}) is not None

        return jsonify({'exists': exists})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500


@trackorder_bp.route('/orders/<tracking_id>', methods=['GET'])
def get_order_by_tracking_id(tracking_id):
    try:
        order = orders_collection.find_one({'trackingId': tracking_id})

        if order:
            order['_id'] = str(order['_id'])  # Convert ObjectId to string
            return jsonify(order), 200
        else:
            return jsonify({'message': 'Order not found'}), 404
    except Exception as e:
        print(f"Error fetching order: {e}")
        return jsonify({'error': str(e)}), 500