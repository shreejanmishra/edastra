import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, MessageSquare, Users } from "lucide-react";

import StatCard from "./StatCard";
import ROIChart from "./ROIChart";
import UserTable from "./UserTable";
import useROIData from "./useROIData";

const ROIPage = () => {
  const {
    stats,
    graphData,
    feedbackCount,
    loading,
    error,
    totalPages,
    totalUsers,
    currentPage,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
  } = useROIData();

  // Filter State (local to this component)
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [feedbackFilter, setFeedbackFilter] = useState("all");

  // CSV Export State
  const [exporting, setExporting] = useState(false);

  const downloadCSV = async () => {
    setExporting(true);
    try {
      const response = await fetch(`/api/roi?page=1&limit=100000`);
      if (!response.ok) {
        throw new Error("Failed to fetch data for export");
      }
      const data = await response.json();
      const allUsers = data.users;

      const headers = [
        "First Name",
        "Last Name",
        "Email",
        "Age",
        "Gender",
        "Phone",
        "Feedback",
        "Joined Date",
      ];
      const csvContent = [
        headers.join(","),
        ...allUsers.map((user) =>
          [
            `"${(user.firstName || "").replace(/"/g, '""')}"`,
            `"${(user.lastName || "").replace(/"/g, '""')}"`,
            `"${(user.email || "").replace(/"/g, '""')}"`,
            user.age || "",
            user.gender || "",
            user.phoneNumber || "",
            `"${(user.feedback || "").replace(/"/g, '""')}"`,
            new Date(user.createdAt).toLocaleDateString(),
          ].join(",")
        ),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "user_activity_roi.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
      alert("Failed to export CSV. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="w-10 h-10 border-4 border-[#FAD502] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FAD502] to-[#ffeba1] bg-clip-text text-transparent">
              Metrics Dashboard
            </h1>
          </div>
          <button
            onClick={downloadCSV}
            disabled={exporting}
            className="flex items-center gap-2 bg-[#FAD502] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#eac702] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {exporting ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Download className="w-5 h-5" />
            )}
            {exporting ? "Exporting..." : "Export CSV"}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-100 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard
            icon={Users}
            iconColor="text-blue-400"
            iconBgColor="bg-blue-500/20"
            title="Total Unique Users Visited"
            value={totalUsers}
          />
          <StatCard
            icon={MessageSquare}
            iconColor="text-green-400"
            iconBgColor="bg-green-500/20"
            title="Feedback Provided"
            value={feedbackCount}
            subtitle={`${
              stats.count > 0
                ? ((feedbackCount / stats.count) * 100).toFixed(1)
                : 0
            }% response rate`}
          />
        </div>

        {/* Activity Graph */}
        <ROIChart graphData={graphData} />

        {/* Users Table */}
        <UserTable
          users={stats.users}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          genderFilter={genderFilter}
          setGenderFilter={setGenderFilter}
          feedbackFilter={feedbackFilter}
          setFeedbackFilter={setFeedbackFilter}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalUsers={totalUsers}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ROIPage;
