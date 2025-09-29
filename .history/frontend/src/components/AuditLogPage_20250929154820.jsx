import "./AuditLogPage.css"; // optional, if you want to add custom styles
import React, { useEffect, useMemo, useState } from "react";
import { getAuditLogs } from "../services/auditLogs"; // adjust import path if needed

const AuditLogsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // rows per page

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const logs = await getAuditLogs();
        if (!cancelled) setData(Array.isArray(logs) ? logs : []);
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to fetch logs");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  // Reset to page 1 whenever pageSize or data changes (so we don't show empty pages)
  useEffect(() => {
    setPage(1);
  }, [pageSize, data.length]);

  // derived values
  const totalItems = data.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // clamp current page
  const currentPage = Math.min(Math.max(1, page), totalPages);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  }, [data, currentPage, pageSize]);

  const formatDate = (value) => {
    if (!value) return "-";
    const d = new Date(value);
    if (isNaN(d.getTime())) return String(value);
    return d.toLocaleString(); // or toLocaleDateString() if you prefer
  };

  const goTo = (p) => setPage(Math.min(Math.max(1, p), totalPages));

  return (
    <div
      style={{ padding: 16, fontFamily: "Segoe UI, Roboto, Arial, sans-serif" }}
    >
      <span className="item-page">
        {totalItems} item{totalItems !== 1 ? "s" : ""} — page {currentPage} /{" "}
        {totalPages}
      </span>
      <h2>Audit Logs</h2>

      {loading ? (
        <div>Loading logs...</div>
      ) : error ? (
        <div style={{ color: "crimson" }}>Error: {error}</div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <div>
              <label style={{ marginRight: 8 }}>
                Rows per page:
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  style={{ marginLeft: 8 }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </label>
            </div>

            <div>
              <button
                onClick={() => goTo(1)}
                disabled={currentPage === 1}
                style={{ marginRight: 6 }}
              >
                « First
              </button>
              <button
                onClick={() => goTo(currentPage - 1)}
                disabled={currentPage === 1}
                style={{ marginRight: 6 }}
              >
                ‹ Prev
              </button>

              {/* Show a simple page range (you can make this more advanced if you want) */}
              <span style={{ margin: "0 6px" }}>
                {Math.max(1, currentPage - 2)} …{" "}
                {Math.min(totalPages, currentPage + 2)}
              </span>

              <button
                onClick={() => goTo(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{ marginRight: 6 }}
              >
                Next ›
              </button>
              <button
                onClick={() => goTo(totalPages)}
                disabled={currentPage === totalPages}
              >
                Last »
              </button>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              }}
            >
              <thead style={{ background: "#4a90e2", color: "#fff" }}>
                <tr>
                  <th style={thStyle}>userLogged</th>
                  <th style={thStyle}>action</th>
                  <th style={thStyle}>entity</th>
                  <th style={thStyle}>description</th>
                  <th style={thStyle}>action date</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      style={{
                        padding: 12,
                        textAlign: "center",
                        color: "#666",
                      }}
                    >
                      No logs to show.
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item, index) => (
                    <tr
                      key={index}
                      style={
                        index % 2 === 0 ? { background: "#fafafa" } : undefined
                      }
                    >
                      <td style={tdStyle}>{item.userLogged ?? "-"}</td>
                      <td style={tdStyle}>{item.action ?? "-"}</td>
                      <td style={tdStyle}>{item.entity ?? "-"}</td>
                      <td style={tdStyle}>{item.description ?? "-"}</td>
                      <td style={tdStyle}>{formatDate(item.createdAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Simple page number buttons */}
          <div
            style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
              const active = p === currentPage;
              return (
                <button
                  key={p}
                  onClick={() => goTo(p)}
                  aria-current={active ? "page" : undefined}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 4,
                    border: active ? "1px solid #4a90e2" : "1px solid #ddd",
                    background: active ? "#eaf3ff" : "#fff",
                    cursor: "pointer",
                  }}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

// small inline styles used above
const thStyle = {
  textAlign: "left",
  padding: "10px 12px",
  fontWeight: 600,
  letterSpacing: 0.3,
};

const tdStyle = {
  padding: "10px 12px",
  borderTop: "1px solid #eee",
  verticalAlign: "middle",
};

export default AuditLogsPage;
