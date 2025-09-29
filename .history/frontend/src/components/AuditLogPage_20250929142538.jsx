import React from "react";
import "./AuditLogPage.css";
import { getAuditLogs } from "../services/auditLogs";
// import { get  } from "../../../backend/routes/auth";

const AuditLogsPage = () => {
  const data = getAuditLogs();
  console.log("Audit Logs", data);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>userLogged</th>
            <th>action</th>
            <th>entity</th>
            <th>action date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.userLogged}</td>
              <td>{item.action}</td>
              <td>{item.entity}</td>
              <td>{item.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditLogsPage;
