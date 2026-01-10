import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  MessageSquare,
  Users,
  Search,
  Filter,
} from "lucide-react";
import * as d3 from "d3";

const ROIPage = () => {
  const [stats, setStats] = useState({ count: 0, users: [] });
  const [graphData, setGraphData] = useState([]);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [feedbackFilter, setFeedbackFilter] = useState("all");

  const d3Container = useRef(null);

  useEffect(() => {
    fetchroiData();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    if (graphData.length > 0 && d3Container.current) {
      drawChart();
    }
  }, [graphData]);

  const fetchroiData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/roi?page=${currentPage}&limit=${itemsPerPage}`
      );
      if (!response.ok) {
        let errorMessage = `Error ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData.message) errorMessage = errorData.message;
          if (errorData.error) errorMessage += ` (${errorData.error})`;
        } catch (e) {
          // Could not parse JSON, stick to status text
        }
        throw new Error(errorMessage);
      }
      const data = await response.json();

      setStats({ count: data.count, users: data.users });
      setTotalUsers(data.count);
      setTotalPages(data.pagination.totalPages);
      setFeedbackCount(data.feedbackCount);

      // Process the pre-aggregated graph data
      processGraphData(data.graphData);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching ROI data:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  const processGraphData = (dailyData) => {
    // Minimum valid date: November 1, 2025
    const minValidDate = new Date("2025-11-01");

    // Filter out invalid dates first
    const validData = dailyData.filter((item) => {
      const d = new Date(item.date);
      return !isNaN(d.getTime()) && d >= minValidDate;
    });

    // Group daily data by week
    const grouped = validData.reduce((acc, item) => {
      // item.date is "YYYY-MM-DD"
      const d = new Date(item.date);
      // Get start of the week (Sunday)
      const day = d.getDay();
      const diff = d.getDate() - day;
      const weekStart = new Date(d.setDate(diff));
      const dateKey = weekStart.toLocaleDateString();

      if (!acc[dateKey]) {
        acc[dateKey] = {
          date: dateKey,
          users: 0,
          feedback: 0,
          rawDate: weekStart,
        };
      }
      acc[dateKey].users += item.users;
      acc[dateKey].feedback += item.feedback;
      return acc;
    }, {});

    // Convert to array and sort by date
    const data = Object.values(grouped).sort((a, b) => a.rawDate - b.rawDate);

    setGraphData(data);
  };

  const drawChart = () => {
    // Clear previous chart
    d3.select(d3Container.current).selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 80, left: 40 };

    // Calculate width based on data points
    const minWidthPerPoint = 100; // Minimum pixels per week
    const calculatedWidth = Math.max(
      d3Container.current.clientWidth,
      graphData.length * minWidthPerPoint + margin.left + margin.right
    );

    const width = calculatedWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(d3Container.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X Axis
    const x0 = d3
      .scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.1)
      .domain(graphData.map((d) => d.date));

    const x1 = d3
      .scaleBand()
      .padding(0.05)
      .domain(["users", "feedback"])
      .rangeRound([0, x0.bandwidth()]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x0))
      .selectAll("text")
      .style("fill", "#888")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)");

    // Y Axis
    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(graphData, (d) => Math.max(d.users, d.feedback)) * 1.1,
      ])
      .nice()
      .rangeRound([height, 0]);

    svg
      .append("g")
      .call(d3.axisLeft(y).ticks(null, "s"))
      .selectAll("text")
      .style("fill", "#888");

    // Grid lines
    svg
      .append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(y).tickSize(-width).tickFormat(""))
      .style("stroke-opacity", 0.1)
      .style("stroke", "#fff");

    const color = d3.scaleOrdinal().range(["#FAD502", "#82ca9d"]);

    // Bars
    svg
      .append("g")
      .selectAll("g")
      .data(graphData)
      .join("g")
      .attr("transform", (d) => `translate(${x0(d.date)},0)`)
      .selectAll("rect")
      .data((d) => [
        { key: "users", value: d.users, date: d.date },
        { key: "feedback", value: d.feedback, date: d.date },
      ])
      .join("rect")
      .attr("x", (d) => x1(d.key))
      .attr("y", (d) => y(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", (d) => height - y(d.value))
      .attr("fill", (d) => color(d.key))
      .append("title") // Simple tooltip
      .text(
        (d) => `${d.key === "users" ? "New Users" : "Feedback"}: ${d.value}`
      );

    // Legend
    const legend = svg
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(["New Users", "Feedback Given"])
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(0,${i * 20})`);

    legend
      .append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", (d, i) => ["#FAD502", "#82ca9d"][i]);

    legend
      .append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .style("fill", "#ccc")
      .text((d) => d);
  };

  const [exporting, setExporting] = useState(false);

  const downloadCSV = async () => {
    setExporting(true);
    try {
      // Fetch ALL users for export (not just current page)
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

  // Pagination Logic (Client-side slicing removed, now using server logic)
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = stats.users.slice(indexOfFirstItem, indexOfLastItem);
  // const totalPages = Math.ceil(stats.users.length / itemsPerPage);

  // Filter users based on search and filter criteria
  const filteredUsers = useMemo(() => {
    return stats.users.filter((user) => {
      // Search filter (name)
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const matchesSearch =
        searchTerm === "" || fullName.includes(searchTerm.toLowerCase());

      // Gender filter
      const matchesGender =
        genderFilter === "all" || user.gender === genderFilter;

      // Feedback filter
      let matchesFeedback = true;
      if (feedbackFilter === "with") {
        matchesFeedback = user.feedback && user.feedback.trim() !== "";
      } else if (feedbackFilter === "without") {
        matchesFeedback = !user.feedback || user.feedback.trim() === "";
      }

      return matchesSearch && matchesGender && matchesFeedback;
    });
  }, [stats.users, searchTerm, genderFilter, feedbackFilter]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
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

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-100 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-zinc-400 font-medium">
                Total Unique Users Visited
              </h3>
            </div>
            <p className="text-4xl font-bold text-white">{totalUsers}</p>
          </div>

          <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <MessageSquare className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-zinc-400 font-medium">Feedback Provided</h3>
            </div>
            <p className="text-4xl font-bold text-white">{feedbackCount}</p>
            <p className="text-sm text-zinc-500 mt-1">
              {stats.count > 0
                ? ((feedbackCount / stats.count) * 100).toFixed(1)
                : 0}
              % response rate
            </p>
          </div>
        </div>

        {/* Activity Graph (D3) */}
        <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-2xl backdrop-blur-sm mb-10">
          <h2 className="text-xl font-semibold mb-6">
            User Activity & Feedback Trends
          </h2>
          <div className="w-full overflow-x-auto" ref={d3Container}></div>
        </div>

        {/* Users Table */}
        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
          <div className="p-6 border-b border-white/10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-xl font-semibold">User Activity Log</h2>

              {/* Filter Controls */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-black/30 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-[#FAD502] w-48"
                  />
                </div>

                {/* Gender Filter */}
                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#FAD502]"
                >
                  <option value="all">All Genders</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>

                {/* Feedback Filter */}
                <select
                  value={feedbackFilter}
                  onChange={(e) => setFeedbackFilter(e.target.value)}
                  className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#FAD502]"
                >
                  <option value="all">All Feedback</option>
                  <option value="with">With Feedback</option>
                  <option value="without">No Feedback</option>
                </select>

                {/* Clear Filters */}
                {(searchTerm ||
                  genderFilter !== "all" ||
                  feedbackFilter !== "all") && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setGenderFilter("all");
                      setFeedbackFilter("all");
                    }}
                    className="text-sm text-zinc-400 hover:text-white underline"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-zinc-400">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Details</th>
                  <th className="p-4 font-medium">Feedback</th>
                  <th className="p-4 font-medium">Phone Number</th>
                  <th className="p-4 font-medium">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-medium text-white">
                        {user.firstName} {user.lastName}
                      </div>
                    </td>
                    <td className="p-4 text-zinc-300">{user.email || "-"}</td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1 text-sm text-zinc-400">
                        <span>Age: {user.age}</span>
                        <span>Gender: {user.gender}</span>
                      </div>
                    </td>
                    <td
                      className="p-4 text-zinc-300 truncate max-w-xs"
                      title={user.feedback}
                    >
                      {user.feedback || "-"}
                    </td>
                    <td className="p-4 text-zinc-300">{user.phoneNumber}</td>
                    <td className="p-4 text-zinc-300">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && !loading && (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-zinc-500">
                      {stats.users.length === 0
                        ? "No user activity found."
                        : "No users match the current filters."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {stats.users.length > 0 && (
            <div className="p-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-zinc-400 text-sm">
                <span>Rows per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className="bg-black/20 border border-white/10 rounded px-2 py-1 outline-none focus:border-[#FAD502]"
                >
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span>
                  {(currentPage - 1) * itemsPerPage + 1}-
                  {Math.min(currentPage * itemsPerPage, totalUsers)} of{" "}
                  {totalUsers}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-white/10 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5"
                >
                  Previous
                </button>

                {/* Simple Page Numbers (optional - showing current page) */}
                <span className="text-sm text-zinc-400">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-white/10 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ROIPage;
