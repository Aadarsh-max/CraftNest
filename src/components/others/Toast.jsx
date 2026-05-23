import toast, { Toaster } from "react-hot-toast";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiXCircle,
} from "react-icons/fi";

const ToastContainer = ({
  icon,
  children,
  borderColor,
  bgColor,
  iconBgColor,
  iconColor,
}) => (
  <div
    className={`flex items-center gap-4 rounded-3xl border ${borderColor} ${bgColor} px-6 py-4 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.15)] animate-[fadeInUp_0.3s_ease-out]`}
  >
    <div className={`rounded-full ${iconBgColor} ${iconColor} p-2`}>{icon}</div>
    <p className="text-sm font-bold text-slate-900 pr-2">{children}</p>
  </div>
);

export const showSuccessToast = (message) => {
  toast.custom((t) => (
    <ToastContainer
      icon={<FiCheckCircle size={20} />}
      borderColor="border-emerald-100"
      bgColor="bg-white"
      iconBgColor="bg-emerald-50"
      iconColor="text-emerald-600"
    >
      {message}
    </ToastContainer>
  ));
};

export const showErrorToast = (message) => {
  toast.custom((t) => (
    <ToastContainer
      icon={<FiXCircle size={20} />}
      borderColor="border-pink-100"
      bgColor="bg-white"
      iconBgColor="bg-pink-50"
      iconColor="text-pink-600"
    >
      {message}
    </ToastContainer>
  ));
};

export const showInfoToast = (message) => {
  toast.custom((t) => (
    <ToastContainer
      icon={<FiInfo size={20} />}
      borderColor="border-violet-100"
      bgColor="bg-white"
      iconBgColor="bg-violet-50"
      iconColor="text-violet-600"
    >
      {message}
    </ToastContainer>
  ));
};

export const showWarningToast = (message) => {
  toast.custom((t) => (
    <ToastContainer
      icon={<FiAlertCircle size={20} />}
      borderColor="border-yellow-100"
      bgColor="bg-white"
      iconBgColor="bg-yellow-50"
      iconColor="text-yellow-600"
    >
      {message}
    </ToastContainer>
  ));
};

const Toast = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 4000,
      }}
    />
  );
};

export default Toast;
