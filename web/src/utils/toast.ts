import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (msg, type, p0?: { autoClose: number; }) => {
  toast[type](msg);
};
