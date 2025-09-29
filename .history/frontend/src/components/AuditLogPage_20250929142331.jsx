import React from "react";
import "./AuditLogPage.css";
import { getAuditLogs } from "../services/auditLogs";
// import { get  } from "../../../backend/routes/auth";

const AuditLogsPage = () => {
  const data = getAuditLogs();
  console.log("Audit Logs", data);
  return 
()
};

export default AuditLogsPage;
