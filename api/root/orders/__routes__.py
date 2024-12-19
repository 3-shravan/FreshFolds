from . import orders_api

from root.orders.orderhistory import OrderHistoryUser, AdminOrderList 
from root.orders.ordertracking import OrderTracking
from root.orders.neworder import create_order, check_tracking_id

orders_api.add_resource(OrderHistoryUser, "/order-history")
orders_api.add_resource(AdminOrderList , "/admin/users")
orders_api.add_resource(OrderTracking, "/order-tracking/<string:order_id>")
# orders_api.add_resource(create_order, "/orders")
# orders_api.add_resource(check_tracking_id, "/check-tracking-id")