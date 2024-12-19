from flask_restful import Resource
from flask import jsonify
from root.db import mdb

class OrderTracking(Resource):
    def get(self, order_id):
        try:
            
            order = mdb['order_history'].find_one({'order_id': order_id, 'status': 'in-progress'}, {'_id': 0})
            if not order:
                return {'error': 'Order not in progress or invalid order ID'}, 404
            
            tracking_info = order.get('tracking_info', 'No tracking info available.')
            return jsonify({'order_id': order_id, 'tracking_info': tracking_info})
        except Exception as e:
            return {'error': str(e)}, 500
