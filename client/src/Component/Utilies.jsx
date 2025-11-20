import { toast } from "react-toastify";

const notifySuccess = (message) => {
  toast.success(message, {
    position: "top-right",  
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}


const notifyError = (message) => {
  toast.error(message, {
    position: "top-right",  
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}



export { notifySuccess, notifyError };