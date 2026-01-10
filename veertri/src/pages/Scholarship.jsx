import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { scholarships } from "../data/scholarships";

import scholarshipBg from "../assets/scholarshipBG.jpg";
import entertainmentBg from "../assets/entertainment.jpg";
import {
  Calendar,
  IndianRupee,
  Award,
  UserCheck,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  X,
  Upload,
  Download,

} from "lucide-react";
import { EligibilityModal } from "../components/EligibilityModal";
import { BankDetailsModal } from "../components/BankDetailsModal";
import { ConfirmationModal } from "../components/ConfirmationModal";







export default function Scholarship() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all"); // 'all' or 'applications'
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [showBankModal, setShowBankModal] = useState(false);
  const [selectedAppForBank, setSelectedAppForBank] = useState(null);
  const [showExamConfirmModal, setShowExamConfirmModal] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState(null);

  const handleApplicationSubmit = (scholarship) => {
    const newApp = {
      id: scholarship.id,
      title: scholarship.title,
      provider: scholarship.provider,
      status: "In Review",
      appliedDate: new Date().toISOString().split("T")[0],
      amount: scholarship.amount,
      image: scholarship.image,
    };
    setApplications([...applications, newApp]);
  };

  const handleBankDetailsSubmit = (bankDetails) => {
    // In a real app, you would send this to the backend
    console.log("Bank Details Submitted:", bankDetails);

    // Update application status locally
    setApplications((prevApps) =>
      prevApps.map((app) => {
        if (app.id === selectedAppForBank.id) {
          return { ...app, bankDetailsSubmitted: true };
        }
        return app;
      })
    );

    // Persist to localStorage for POC
    localStorage.setItem(
      `scholarship_bank_submitted_${selectedAppForBank.id}`,
      "true"
    );

    // Simulate Disbursement after 3 seconds for POC
    setTimeout(() => {
      localStorage.setItem(
        `scholarship_disbursed_${selectedAppForBank.id}`,
        "true"
      );
      setApplications((prevApps) =>
        prevApps.map((app) => {
          if (app.id === selectedAppForBank.id) {
            return { ...app, disbursed: true };
          }
          return app;
        })
      );
    }, 3000);
  };

  // Mock data for applied scholarships
  const [applications, setApplications] = useState([
    {
      id: 1,
      title: "PM Yasasvi Scholarship Scheme",
      provider: "Ministry of Social Justice & Empowerment",
      status: "In Review",
      appliedDate: "2024-11-15",
      amount: "₹75,000 - ₹1,25,000",
      image:
        "https://www.pmindia.gov.in/wp-content/uploads/2025/11/H20251127197887.jpg",
    },
    {
      id: 3,
      title: "Wipro's Underprivileged Women Scholarship",
      provider: "Wipro Cares",
      status: "Approved",
      appliedDate: "2024-10-20",
      amount: "₹24,000/year",
      image:
        "https://thecsruniverse.com/adminxsafe/uploads/IMG-20240703-WA0003.jpg",
    },
  ]);

  useEffect(() => {
    // Check for exam results and bank details in localStorage
    setApplications((prevApps) =>
      prevApps.map((app) => {
        const examStatus = localStorage.getItem(
          `scholarship_exam_status_${app.id}`
        );
        const bankSubmitted = localStorage.getItem(
          `scholarship_bank_submitted_${app.id}`
        );
        const disbursed = localStorage.getItem(
          `scholarship_disbursed_${app.id}`
        );

        let updatedApp = { ...app };
        if (examStatus) {
          updatedApp.examStatus = examStatus;
        }
        if (bankSubmitted) {
          updatedApp.bankDetailsSubmitted = true;
        }
        if (disbursed) {
          updatedApp.disbursed = true;
        }
        return updatedApp;
      })
    );
  }, []);

  const handleDownloadReceipt = (app) => {
    const receiptContent = `
VEERTRI SCHOLARSHIP RECEIPT
---------------------------
Scholarship: ${app.title}
Provider: ${app.provider}
Amount: ${app.amount}
Date: ${new Date().toLocaleDateString()}
Status: Disbursed

Thank you for using Veertri.
    `;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Receipt_${app.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-600 bg-green-500/10 border-green-800/20";
      case "Rejected":
        return "text-red-500 bg-red-500/10 border-red-500/20";
      case "In Review":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      default:
        return "text-blue-500 bg-blue-500/10 border-blue-500/20";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <CheckCircle size={16} />;
      case "Rejected":
        return <XCircle size={16} />;
      case "In Review":
        return <Clock size={16} />;
      default:
        return <AlertCircle size={16} />;
    }
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${entertainmentBg})` }}
    >
      <div className="min-h-screen dark:bg-black/50 dark:backdrop-blur-sm transition-colors duration-300 pt-24 px-4 md:px-16 pb-12">
        <div
          className="relative rounded-2xl overflow-hidden mb-12 text-left py-16 px-8 md:px-12"
          style={{
            backgroundImage: `url(${scholarshipBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-white mb-4">
              Scholarship Opportunities
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Explore funding opportunities to support your educational journey.
              Find scholarships that match your profile and aspirations.
            </p>
          </div>
        </div>

        {/* Section 1: Application Tracker */}
        <div className="mb-16">
          <div className="dark:bg-gray-900/40 bg-white/10 backdrop-blur-sm border dark:border-gray-800 border-gray-200 rounded-2xl p-4 md:p-6 shadow-xl relative group transition-all duration-300 hover:shadow-2xl hover:border-gray-300 dark:hover:border-gray-700">
            <h2 className="text-2xl font-bold dark:text-white text-gray-200 mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-[#FAD502] rounded-full block shadow-[0_0_10px_#FAD502]"></span>
              Application Status
            </h2>

            {applications.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="dark:bg-gray-900/80 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-md border dark:border-gray-800 border-gray-100 flex gap-4 items-center"
                  >
                    <img
                      src={app.image}
                      alt={app.title}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold dark:text-white text-gray-900 line-clamp-1">
                        {app.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {app.provider}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <div
                          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            app.status
                          )}`}
                        >
                          {getStatusIcon(app.status)}
                          {app.status}
                        </div>
                        <span className="text-xs text-gray-400">
                          Applied: {app.appliedDate}
                        </span>
                      </div>

                      {app.status === "Approved" && app.id % 2 !== 0 && (
                        <>
                          {!app.examStatus && (
                            <button
                              onClick={() => {
                                setSelectedExamId(app.id);
                                setShowExamConfirmModal(true);
                              }}
                              className="mt-3 w-full bg-[#FAD502] text-[#090D0E] py-2 rounded-lg font-bold text-sm hover:bg-[#FAD502]/90 transition-colors"
                            >
                              Take Eligibility Exam
                            </button>
                          )}

                          {app.examStatus === "failed" && (
                            <div className="mt-3 w-full bg-red-500/10 border border-red-500/20 text-red-500 py-2 rounded-lg font-bold text-sm text-center flex items-center justify-center gap-2">
                              <XCircle size={16} />
                              Exam Failed. Cannot Retake.
                            </div>
                          )}

                          {app.examStatus === "passed" && (
                            <div className="mt-3 space-y-2">
                              <div className="w-full bg-green-500/10 border border-green-800/20 text-green-600 py-2 rounded-lg font-bold text-sm text-center flex items-center justify-center gap-2">
                                <CheckCircle size={16} />
                                Exam Passed
                              </div>

                              {app.bankDetailsSubmitted ? (
                                app.disbursed ? (
                                  <div className="space-y-2">
                                    <div className="w-full bg-green-500/10 border border-green-800/20 text-green-600 py-2 rounded-lg font-bold text-sm text-center flex items-center justify-center gap-2">
                                      <IndianRupee size={16} />
                                      Scholarship Disbursed
                                    </div>
                                    <button
                                      onClick={() => handleDownloadReceipt(app)}
                                      className="w-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white py-2 rounded-lg font-bold text-sm hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                      <Download size={16} />
                                      Download Receipt
                                    </button>
                                  </div>
                                ) : (
                                  <div className="w-full bg-blue-500/10 border border-blue-500/20 text-blue-500 py-2 rounded-lg font-bold text-sm text-center flex items-center justify-center gap-2">
                                    <CheckCircle size={16} />
                                    Bank Details Submitted
                                  </div>
                                )
                              ) : (
                                <button
                                  onClick={() => {
                                    setSelectedAppForBank(app);
                                    setShowBankModal(true);
                                  }}
                                  className="w-full bg-[#FAD502] text-[#090D0E] py-2 rounded-lg font-bold text-sm hover:bg-[#FAD502]/90 transition-colors"
                                >
                                  Add Beneficiary Bank Details
                                </button>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="dark:bg-gray-900/80 bg-white/90 backdrop-blur-sm rounded-xl p-8 text-center border dark:border-gray-800 border-gray-100">
                <p className="text-gray-500">
                  You haven't applied to any scholarships yet.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Section 2: Available Scholarships */}
        <div>
          <div className="dark:bg-gray-900/40 bg-white/10 backdrop-blur-sm border dark:border-gray-800 border-gray-200 rounded-2xl p-4 md:p-6 shadow-xl relative group transition-all duration-300 hover:shadow-2xl hover:border-gray-300 dark:hover:border-gray-700">
            <h2 className="text-2xl font-bold dark:text-white text-gray-200 mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-[#FAD502] rounded-full block shadow-[0_0_10px_#FAD502]"></span>
              Available Scholarships
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {scholarships.map((scholarship) => (
                <div
                  key={scholarship.id}
                  className="dark:bg-gray-900/80 bg-white/90 backdrop-blur-sm rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={scholarship.image}
                      alt={scholarship.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-[#090D0E] backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-[#FAD502] shadow-sm">
                      {scholarship.category}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                      <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-2 line-clamp-2 transition-colors duration-300">
                        {scholarship.title}
                      </h2>
                      <p className="text-sm dark:text-gray-400 text-gray-500 font-medium transition-colors duration-300">
                        Provided by {scholarship.provider}
                      </p>
                    </div>

                    <p className="dark:text-gray-300 text-gray-600 mb-6 line-clamp-3 flex-1 transition-colors duration-300">
                      {scholarship.description}
                    </p>

                    <div className="space-y-3 border-t dark:border-gray-800 border-gray-100 pt-4 transition-colors duration-300">
                      <div className="flex items-center dark:text-gray-300 text-gray-700 transition-colors duration-300">
                        <IndianRupee
                          size={18}
                          className="text-green-600 mr-2"
                        />
                        <span className="font-semibold">
                          {scholarship.amount}
                        </span>
                      </div>
                      <div className="flex items-center dark:text-gray-300 text-gray-700 transition-colors duration-300">
                        <Calendar size={18} className="text-blue-600 mr-2" />
                        <span>Deadline: {scholarship.deadline}</span>
                      </div>
                      <div className="flex items-start dark:text-gray-300 text-gray-700 transition-colors duration-300">
                        <UserCheck
                          size={18}
                          className="text-purple-600 mr-2 mt-1 flex-shrink-0"
                        />
                        <span className="text-sm">
                          {scholarship.eligibility}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button className="flex-1 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white py-2 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200">
                        Details
                      </button>
                      <button
                        onClick={() => setSelectedScholarship(scholarship)}
                        className="flex-1 bg-[#FAD502] text-[#090D0E] py-2 rounded-lg font-medium hover:bg-[#FAD502]/80 transition-colors duration-200"
                      >
                        Check Eligibility
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Eligibility Modal */}
      <EligibilityModal
        scholarship={selectedScholarship}
        onClose={() => setSelectedScholarship(null)}
        onSubmit={handleApplicationSubmit}
      />

      {/* Bank Details Modal */}
      <BankDetailsModal
        isOpen={showBankModal}
        onClose={() => {
          setShowBankModal(false);
          setSelectedAppForBank(null);
        }}
        onSubmit={handleBankDetailsSubmit}
      />

      {/* Exam Confirmation Modal */}
      <ConfirmationModal
        isOpen={showExamConfirmModal}
        onClose={() => {
          setShowExamConfirmModal(false);
          setSelectedExamId(null);
        }}
        onConfirm={() => {
          setShowExamConfirmModal(false);
          navigate(`/scholarship/exam/${selectedExamId}`);
        }}
        title="Start Eligibility Exam?"
        message="Are you sure you want to start the exam? Once started, you cannot pause or restart it."
      />
    </div>
  );
}
