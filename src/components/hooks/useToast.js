// import { toast } from "react-toastify";

// const useToast = () => {

//     const toastSuccess = (message) => {
//         return toast.success(message, {
//             color: "#2F3940",
//             position: "bottom-center",
//             autoClose: 1500,
//             hideProgressBar: true,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: false,
//             progress: undefined,
//             theme: "dark",
//         });
//     }
//     const toastError = (message) => {
//         return toast.error(message, {
//             color: "#2F3940",
//             position: "bottom-center",
//             autoClose: 1500,
//             hideProgressBar: true,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: false,
//             progress: undefined,
//             theme: "dark"
//         });
//     }
//     const toastInfo = (message) => {
//         return toast.info(message, {
//             position: "bottom-center",
//             autoClose: 1500,
//             hideProgressBar: true,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: false,
//             progress: undefined,
//             theme: "dark",
//         });
//     }

//     return { toastSuccess, toastError, toastInfo };
// };
import { toast } from "react-toastify";

const useToast = () => {
    const vibrate = (type = "success") => {
        const pattern =
            type === "error"
                ? [300, 100, 300]
                : [100, 50, 100];
        if (window.Telegram?.WebApp?.HapticFeedback) {
            // Use Telegram WebApp haptic feedback if available in production
            window.Telegram.WebApp.HapticFeedback.notificationOccurred(type);
        } else if (navigator.vibrate) {
            // Fallback to standard vibration API
            navigator.vibrate(pattern);
        }
    };

    const showToast = (type, message) => {
        // Trigger vibration or haptic feedback based on toast type
        // vibrate(type);

        // Show toast notification
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
