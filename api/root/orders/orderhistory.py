
from flask_restful import Resource
from flask import request, jsonify
from bson import ObjectId
from root.db import mdb
from root.general.authUtils import validate_auth

class OrderHistoryUser(Resource):
    @validate_auth(optional=True)
    def post(self, suid, suser):
        input_data = request.get_json(silent=True)
        user_id = input_data.get('user_id')
        search_query = input_data.get('search', '')  
        status_filter = input_data.get('status', '')  

        if not user_id:
            return {'error': 'User not logged in'}, 401

        query = {'user_id': user_id}
        
        # If search query is provided, add regex search for order_id (only search by order ID)
        if search_query:
            query['trackingId'] = {'$regex': search_query, '$options': 'i'}
        
        # If status filter is provided, add it to the query
        if status_filter:
            query['status'] = status_filter

        orders = list(mdb['orders'].find(query, {'_id': 0}))

        if not orders:
            return jsonify([])

        return jsonify(orders)
     
     
     
class AdminOrderList(Resource):
    @validate_auth(optional=True)
    def post(self, suid, suser):
        input_data = request.get_json(silent=True)
        
        
        pipeline = [
            {"$group": {
                "_id": "$user_id",  
                "fullName": {"$first": "$fullName"},
                "latestDate": {"$max": {"$dateFromString": {"dateString": "$dateSubmitted"}}}
            }},
            {"$project": {
                "_id": 0,
                "user_id": "$_id",
                "fullName": 1,
                "latestDate": 1
            }},
            {"$sort": {"latestDate": -1}}
        ]

        # If search input is provided
        if input_data:
            search = input_data.get('search', '').strip()

            # Modify the pipeline to filter by fullName or user_id
            if search:
                pipeline.insert(0, {
                    "$match": {
                        "$or": [
                            {"fullName": {"$regex": search, "$options": "i"}},  
                            {"user_id": {"$regex": search, "$options": "i"}}                           ]
                    }
                })
        
        result = list(mdb['orders'].aggregate(pipeline))
        return jsonify(result)


