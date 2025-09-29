import React from "react";
import "./AuditLogPage.css";
import { getAuditLogs } from "../services/auditLogs";
// import { get  } from "../../../backend/routes/auth";

const AuditLogsPage = () => {
  const data = getAuditLogs();
  console.log("Audit Logs", data);
  return (
    <div className="audit-logs-page">
      <div className="audit-logs-header">
        <h1>Audit Logs</h1>
        <div className="audit-logs-actions">
          <input
            type="search"
            className="audit-logs-search"
            placeholder="Search by user, action, resource..."
            aria-label="Search audit logs"
          />
          <select className="audit-logs-filter" aria-label="Filter by severity">
            <option value="">All severities</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>
      </div>

      <div className="audit-logs-content">
        <div className="audit-logs-table">
          <div className="audit-logs-table-header">
            <div>Timestamp</div>
            <div>User</div>
            <div>Action</div>
            <div>Resource</div>
            <div>Severity</div>
          </div>

          <div className="audit-logs-empty">No logs yet.</div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogsPage;
