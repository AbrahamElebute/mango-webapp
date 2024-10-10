import { toast, ToastOptions, Id } from "react-toastify";

type ToastType = "success" | "error" | "info" | "warning";

const useToast = () => {
  let toastId: Id | null = null;

  const showToast = (message: string, type: ToastType = "info") => {
    // Check if there is already an active toast
    if (toastId === null || !toast.isActive(toastId)) {
      switch (type) {
        case "success":
          toastId = toast.success(message);
          break;
        case "error":
          toastId = toast.error(message);
          break;
        case "warning":
          toastId = toast.warning(message);
          break;
        default:
          toastId = toast.info(message);
          break;
      }
    }
  };

  return { showToast };
};

export default useToast;
