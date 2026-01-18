import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Custom hook for fetching and managing ROI dashboard data
 */
export function useROIData() {
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

  const abortControllerRef = useRef(null);

  const processGraphData = useCallback((dailyData) => {
    const minValidDate = new Date("2025-11-01");

    const validData = dailyData.filter((item) => {
      const d = new Date(item.date);
      return !isNaN(d.getTime()) && d >= minValidDate;
    });

    const grouped = validData.reduce((acc, item) => {
      const d = new Date(item.date);
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

    const data = Object.values(grouped).sort((a, b) => a.rawDate - b.rawDate);
    setGraphData(data);
  }, []);

  const fetchData = useCallback(
    async (signal) => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/roi?page=${currentPage}&limit=${itemsPerPage}`,
          { signal }
        );
        if (!response.ok) {
          let errorMessage = `Error ${response.status}: ${response.statusText}`;
          try {
            const errorData = await response.json();
            if (errorData.message) errorMessage = errorData.message;
            if (errorData.error) errorMessage += ` (${errorData.error})`;
          } catch (e) {
            // Could not parse JSON
          }
          throw new Error(errorMessage);
        }
        const data = await response.json();

        setStats({ count: data.count, users: data.users });
        setTotalUsers(data.count);
        setTotalPages(data.pagination.totalPages);
        setFeedbackCount(data.feedbackCount);
        processGraphData(data.graphData);
        setLoading(false);
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }
        console.error("Error fetching ROI data:", err);
        setError(err.message);
        setLoading(false);
      }
    },
    [currentPage, itemsPerPage, processGraphData]
  );

  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    fetchData(abortControllerRef.current.signal);

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  const handleItemsPerPageChange = useCallback((newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  }, []);

  const refetch = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    fetchData(abortControllerRef.current.signal);
  }, [fetchData]);

  return {
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
    refetch,
  };
}

export default useROIData;
