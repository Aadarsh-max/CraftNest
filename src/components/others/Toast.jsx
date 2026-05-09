import toast, { Toaster } from "react-hot-toast";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiXCircle,
} from "react-icons/fi";

export const showSuccessToast = (message) => {
  toast.custom(() => (
    <div className="flex items-center gap-3 rounded-2xl border border-green-100 bg-white px-5 py-4 shadow-xl">
      <div className="rounded-full bg-green-100 p-2 text-green-600">
        <FiCheckCircle size={18} />
      </div>

      <p className="text-sm font-medium text-gray-800">
        {message}
      </p>
    </div>
  ));
};

export const showErrorToast = (message) => {
  toast.custom(() => (
    <div className="flex items-center gap-3 rounded-2xl border border-red-100 bg-white px-5 py-4 shadow-xl">
      <div className="rounded-full bg-red-100 p-2 text-red-600">
        <FiXCircle size={18} />
      </div>

      <p className="text-sm font-medium text-gray-800">
        {message}
      </p>
    </div>
  ));
};

export const showInfoToast = (message) => {
  toast.custom(() => (
    <div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-white px-5 py-4 shadow-xl">
      <div className="rounded-full bg-blue-100 p-2 text-blue-600">
        <FiInfo size={18} />
      </div>

      <p className="text-sm font-medium text-gray-800">
        {message}
      </p>
    </div>
  ));
};

export const showWarningToast = (message) => {
  toast.custom(() => (
    <div className="flex items-center gap-3 rounded-2xl border border-yellow-100 bg-white px-5 py-4 shadow-xl">
      <div className="rounded-full bg-yellow-100 p-2 text-yellow-600">
        <FiAlertCircle size={18} />
      </div>

      <p className="text-sm font-medium text-gray-800">
        {message}
      </p>
    </div>
  ));
};

const Toast = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
      }}
    />
  );
};

export default Toast;