import { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";

const ToastContext = createContext();
function runToast(status, message) {
  status(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

export const ToastProvider = ({ children }) => (
  <ToastContext.Provider value={{ ToastContainer, toast, runToast }}>
    {children}
  </ToastContext.Provider>
);

export const useToastContext = () => useContext(ToastContext);
