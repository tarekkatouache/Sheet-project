import React from "react";
import  { useEffect, useState, useMemo } from "react";
import "./AuditLogPage.css";
import { getAuditLogs } from "../services/auditLogs";
// import { get  } from "../../../backend/routes/auth";

const AuditLogsPage = () => {


  // token prop if given, otherwise try localStorage

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI controls
  const [query, setQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function loadLogs() {
      setLoading(true);
      setError(null);
      try {
        const data = await getAuditLogs();
        if (!cancelled) {
          setLogs(data);
        } 
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load logs");
        }
    }

    loadLogs();
    return () => {
      cancelled = true;
    };
  }, [apiBase, bearer]);

  // derived filtered logs
  const filteredLogs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return logs.filter((log) => {
      // severity filter if present
      if (severityFilter) {
        // assumes log.severity exists and is lowercase like "info"/"warning"/"error"
        if (!log.severity || log.severity.toLowerCase() !== severityFilter.toLowerCase()) {
          return false;
        }
      }

      if (!q) return true;

      const fields = [
        log.userLogged ?? "",
        String(log.userId ?? ""),
        log.action ?? "",
        log.entity ?? "",
        log.description ?? "",
      ];

      return fields.join(" ").toLowerCase().includes(q);
    });
  }, [logs, query, severityFilter]);

  const formatTimestamp = (ts) => {
    if (!ts) return "-";
    // try to parse numeric or string date
    try {
      const d = new Date(ts);
      if (isNaN(d)) return String(ts);
      // localized date/time — adjust locale if desired
      return d.toLocaleString();
    } catch {
      return String(ts);
    }
  };

  return (
    <div className="audit-logs-page" style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <div className="audit-logs-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h1 style={{ margin: 0 }}>Audit Logs</h1>
        <div className="audit-logs-actions" style={{ display: "flex", gap: 8 }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            className="audit-logs-search"
            placeholder="Search by user, action, resource..."
            aria-label="Search audit logs"
            style={{ padding: "6px 10px", minWidth: 240 }}
          />
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="audit-logs-filter"
            aria-label="Filter by severity"
            style={{ padding: "6px 10px" }}
          >
            <option value="">All severities</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>
      </div>

      <div className="audit-logs-content">
        {loading ? (
          <div>Loading logs…</div>
        ) : error ? (
          <div style={{ color: "red" }}>Error: {error}</div>
        ) : filteredLogs.length === 0 ? (
          <div className="audit-logs-empty">No logs yet.</div>
        ) : (
          <div className="audit-logs-table" style={{ border: "1px solid #ddd", borderRadius: 6, overflow: "hidden" }}>
            <div className="audit-logs-table-header" style={{ display: "grid", gridTemplateColumns: "220px 160px 120px 1fr 100px", padding: "10px 12px", background: "#f7f7f7", fontWeight: 600 }}>
              <div>Timestamp</div>
              <div>User</div>
              <div>Action</div>
              <div>Resource</div>
              <div>Severity</div>
            </div>

            <div className="audit-logs-table-body">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className="audit-log-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "220px 160px 120px 1fr 100px",
                    padding: "10px 12px",
                    borderTop: "1px solid #eee",
                    alignItems: "center",
                  }}
                >
                  <div>{formatTimestamp(log.createdAt ?? log.timestamp ?? log.time)}</div>
                  <div>{log.userLogged ?? (log.userId ? `user:${log.userId}` : "Anonymous")}</div>
                  <div style={{ textTransform: "uppercase" }}>{log.action ?? "-"}</div>
                  <div>
                    <div style={{ fontWeight: 600 }}>{log.entity ?? "-"}</div>
                    {log.description ? <div style={{ fontSize: 12, color: "#555" }}>{log.description}</div> : null}
                  </div>
                  <div style={{ textTransform: "capitalize" }}>{log.severity ?? "-"}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


export default AuditLogsPage;
