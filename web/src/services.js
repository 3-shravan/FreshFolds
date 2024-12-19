import { _get, _post } from "./utils/http";


export const getCurrentUserService = () => {
  return _get("/api/currentUser");
};

export const loginService = (data) => {
  return _post("/api/login", data);
};

export const registerService = (data) => {
  return _post("/api/register", data);
};
export const logoutService = () => {
  return _post("/api/user/logout");
}
// export const neworderService = (data) => {
//   return _post("/api/orders", data);
// }
// export const checkTrackingService = (data) => {
//   return _post("/api/check-tracking-id", data);
// }



export const userOrderHistoryService = (data) => {
  return _post("/api/order-history", data);
}

export const adminFetchUsers = (data) => {
  return _post("/api/admin/users", data);
}








// export const adminFetchUsers = async (search) => {
//   const response = await axios.post('/api/admin/users', { search });
//   return response.data;
// };

// export const adminFetchUserOrders = async (userId) => {
//   const response = await axios.post('/api/admin/user-orders', { user_id: userId });
//   return response.data;
// };

// export const adminUpdateOrder = async (data) => {
//   const response = await axios.put('/api/admin/order/update', data);
//   return response.data;
// };

// export const adminDeleteOrder = async (data) => {
//   const response = await axios.delete('/api/admin/order/delete', { data });
//   return response.data;
// };
