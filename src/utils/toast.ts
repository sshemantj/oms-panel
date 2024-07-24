import { ToastPosition, toast } from "react-hot-toast";

// Define the position type explicitly
type CustomToastOptions = {
  duration?: number;
  position?: ToastPosition;
};
// Function to show toast messages
const Toast = (
  message: string,
  type: "success" | "error" | "warning" | "info" = "success",
  options?: CustomToastOptions
) => {
  // Default options
  const defaultOptions: any = {
    duration: 4000, // Default duration in milliseconds (4 seconds)
    position: options?.position || "top", // Default position for mobile
  };

  // If on desktop, override position to top-right
  if (window.innerWidth > 768) {
    defaultOptions.position = "top-right";
  }

  // Merge default and custom options
  const toastOptions = {
    ...defaultOptions,
    ...options,
  };

  // Show toast message based on type
  switch (type) {
    case "success":
      toast.success(message, toastOptions);
      break;
    case "error":
      toast.error(message, toastOptions);
      break;
    // case "warning":
    //   toast.warning(message, toastOptions);
    //   break;
    // case "info":
    //   toast.info(message, toastOptions);
    //   break;
    default:
      toast(message, toastOptions);
  }
};

// Export named functions for each toast type
export const ToastSuccess = (message: string, options?: CustomToastOptions) => {
  Toast(message, "success", options);
};

export const ToastError = (message: string, options?: CustomToastOptions) => {
  Toast(message, "error", options);
};

// export const ToastWarning = (message: string, options?: CustomToastOptions) => {
//   Toast(message, "warning", options);
// };

// export const ToastInfo = (message: string, options?: CustomToastOptions) => {
//   Toast(message, "info", options);
// };

export default Toast;
