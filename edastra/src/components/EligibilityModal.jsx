import { useState } from "react";
import { CheckCircle, Clock, Upload, X } from "lucide-react";

export const EligibilityModal = ({ scholarship, onClose, onSubmit }) => {
  const [files, setFiles] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const requirements = [
    {
      id: "citizenship",
      label: "Citizenship Proof",
      description: "Aadhar Card, Passport, or Voter ID",
    },
    {
      id: "income",
      label: "Income Certificate",
      description: "Family income certificate (< ₹2.5 Lakhs)",
    },
    {
      id: "marks",
      label: "Previous Marksheet",
      description: "Class 10/12 Marksheet (> 60%)",
    },
  ];

  const handleFileChange = (reqId, event) => {
    const file = event.target.files[0];
    if (file) {
      setFiles({ ...files, [reqId]: file });
    }
  };

  const handleUploadSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call/verification
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onSubmit(scholarship);
    }, 1500);
  };

  if (!scholarship) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full relative border dark:border-gray-800 border-gray-200 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 z-10"
        >
          <X size={24} />
        </button>

        {!isSubmitted ? (
          <>
            <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-2">
              Eligibility Verification
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
              Please upload the required documents to verify your eligibility
              for{" "}
              <span className="font-semibold text-[#FAD502]">
                {scholarship.title}
              </span>
            </p>

            <div className="space-y-6">
              {requirements.map((req) => (
                <div key={req.id} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <label className="dark:text-gray-200 text-gray-800 font-medium block">
                      {req.label}
                    </label>
                    {files[req.id] && (
                      <span className="text-green-500 text-xs flex items-center gap-1">
                        <CheckCircle size={12} /> Uploaded
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {req.description}
                  </p>

                  <div className="relative">
                    <input
                      type="file"
                      id={`file-${req.id}`}
                      className="hidden"
                      onChange={(e) => handleFileChange(req.id, e)}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <label
                      htmlFor={`file-${req.id}`}
                      className={`flex items-center justify-center gap-2 w-full p-3 rounded-lg border-2 border-dashed cursor-pointer transition-all ${
                        files[req.id]
                          ? "border-green-500/50 bg-green-500/5 text-green-600"
                          : "border-gray-300 dark:border-gray-700 hover:border-[#FAD502] dark:text-gray-400 text-gray-600"
                      }`}
                    >
                      {files[req.id] ? (
                        <>
                          <CheckCircle size={18} />
                          <span className="truncate max-w-[200px]">
                            {files[req.id].name}
                          </span>
                        </>
                      ) : (
                        <>
                          <Upload size={18} />
                          <span>Upload Document</span>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleUploadSubmit}
              disabled={
                Object.keys(files).length !== requirements.length ||
                isSubmitting
              }
              className="w-full mt-8 bg-[#FAD502] text-[#090D0E] py-3 rounded-lg font-bold hover:bg-[#FAD502]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Verifying...
                </>
              ) : (
                "Submit for Verification"
              )}
            </button>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-yellow-500/20 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={32} />
            </div>
            <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-2">
              Application Under Review
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Your documents have been submitted successfully. We will review
              them and update your status shortly.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white py-3 rounded-lg font-bold hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
