import { memo, useMemo } from "react";
import { Search } from "lucide-react";

/**
 * User activity table component with filters and pagination
 */
const UserTable = memo(
  ({
    users,
    searchTerm,
    setSearchTerm,
    genderFilter,
    setGenderFilter,
    feedbackFilter,
    setFeedbackFilter,
    currentPage,
    itemsPerPage,
    totalUsers,
    totalPages,
    onPageChange,
    onItemsPerPageChange,
    loading,
  }) => {
    // Filter users based on search and filter criteria
    const filteredUsers = useMemo(() => {
      return users.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const matchesSearch =
          searchTerm === "" || fullName.includes(searchTerm.toLowerCase());

        const matchesGender =
          genderFilter === "all" || user.gender === genderFilter;

        let matchesFeedback = true;
        if (feedbackFilter === "with") {
          matchesFeedback = user.feedback && user.feedback.trim() !== "";
        } else if (feedbackFilter === "without") {
          matchesFeedback = !user.feedback || user.feedback.trim() === "";
        }

        return matchesSearch && matchesGender && matchesFeedback;
      });
    }, [users, searchTerm, genderFilter, feedbackFilter]);

    const clearFilters = () => {
      setSearchTerm("");
      setGenderFilter("all");
      setFeedbackFilter("all");
    };

    const hasActiveFilters =
      searchTerm || genderFilter !== "all" || feedbackFilter !== "all";

    return (
      <div className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
        {/* Header with filters */}
        <div className="p-6 border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-xl font-semibold">User Activity Log</h2>

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
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-zinc-400 hover:text-white underline"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
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
                    {users.length === 0
                      ? "No user activity found."
                      : "No users match the current filters."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {users.length > 0 && (
          <div className="p-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-zinc-400 text-sm">
              <span>Rows per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
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
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-white/10 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5"
              >
                Previous
              </button>

              <span className="text-sm text-zinc-400">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-white/10 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default UserTable;
