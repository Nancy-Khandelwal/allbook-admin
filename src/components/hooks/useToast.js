import { toast } from "react-toastify";

const useToast = () => {
  const vibrate = (type = "success") => {
    const pattern = type === "error" ? [300, 100, 300] : [100, 50, 100];
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred(type);
    } else if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  const showToast = (type, message) => {
    return toast[type](message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: false,
      closeButton: false,
    });
  };

  const toastSuccess = (message) => showToast("success", message);
  const toastError = (message) => showToast("error", message);
  const toastInfo = (message) => showToast("info", message);

  return { toastSuccess, toastError, toastInfo, vibrate };
};

export default useToast;
