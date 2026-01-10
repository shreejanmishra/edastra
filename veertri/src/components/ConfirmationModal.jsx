import { AlertCircle } from "lucide-react";

export const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-sm w-full relative border dark:border-gray-800 border-gray-200 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-yellow-500/20 text-yellow-500 rounded-full flex items-center justify-center mb-4">
            <AlertCircle size={24} />
          </div>
          <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
            {message}
          </p>
          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white py-2 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-[#FAD502] text-[#090D0E] py-2 rounded-lg font-medium hover:bg-[#FAD502]/80 transition-colors"
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
