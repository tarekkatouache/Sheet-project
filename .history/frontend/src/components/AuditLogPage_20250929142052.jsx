import React from "react";
import { useEffect, useState, useMemo } from "react";
import "./AuditLogPage.css";
import { getAuditLogs } from "../services/auditLogs";
// import { get  } from "../../../backend/routes/auth";

export default function AuditLogPage() {
  const [auditLogs, setAuditLogs] = useState([]);
  const [error, setError] = useState(null);
  const logsPerPage = 10; // Number of logs to display per page
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [sortConfig, setSortConfig] = useState({
    key: "timestamp",
    direction: "desc",
  }); // this state is for sorting

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = sortedLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(sortedLogs.length / logsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const filteredLogs = useMemo(() => {
    return auditLogs.filter(
      (log) =>
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [auditLogs, searchTerm]);

  const sortedLogs = useMemo(() => {
    let sortableLogs = [...filteredLogs];
    sortableLogs.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sortableLogs;
  }, [filteredLogs, sortConfig]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const logs = await getAuditLogs();
        setAuditLogs(logs);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>userLogged</th>
            <th>action</th>
            <th>entity</th>
            <th>description</th>

            <th>action date</th>
          </tr>
        </thead>
        /
        <tbody>
          {currentLogs.map((item, index) => (
            <tr key={index}>
              <td>{item.userLogged}</td>
              <td>{item.action}</td>
              <td>{item.entity}</td>
              <td>{item.description}</td>
              <td>{item.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => handlePageChange(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
// // const [searchTerm, setSearchTerm] = useState("");
// const [currentPage, setCurrentPage] = useState(1);
// const [sortConfig, setSortConfig] = useState({
//   key: "timestamp",
//   direction: "desc",
// }); // this state is for sorting

// const handleSearch = (e) => {
//   setSearchTerm(e.target.value);
//   setCurrentPage(1); // Reset to first page on new search
// };

// const filteredLogs = useMemo(() => {
//   return auditLogs.filter(
//     (log) =>
//       log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       log.details.toLowerCase().includes(searchTerm.toLowerCase())
//   );
// }, [auditLogs, searchTerm]);
// const sortedLogs = useMemo(() => {
//   let sortableLogs = [...filteredLogs];
//   sortableLogs.sort((a, b) => {
//     if (a[sortConfig.key] < b[sortConfig.key]) {
//       return sortConfig.direction === "asc" ? -1 : 1;
//     }
//     if (a[sortConfig.key] > b[sortConfig.key]) {
//       return sortConfig.direction === "asc" ? 1 : -1;
//     }
//     return 0;
//   });
//   return sortableLogs;
// }, [filteredLogs, sortConfig]);
// const indexOfLastLog = currentPage * logsPerPage;
// const indexOfFirstLog = indexOfLastLog - logsPerPage;
// const currentLogs = sortedLogs.slice(indexOfFirstLog, indexOfLastLog);
// const totalPages = Math.ceil(sortedLogs.length / logsPerPage);
// const handleSort = (key) => {
//   let direction = "asc";
//   if (sortConfig.key === key && sortConfig.direction === "asc") {
//     direction = "desc";
//   }
//   setSortConfig({ key, direction });
// };
// const handlePageChange = (pageNumber) => {
//   setCurrentPage(pageNumber);
// };

// if (loading) return <div>Loading...</div>;
// if (error) return <div>Error: {error.message}</div>;
//   return (
//     <div className="audit-log-page">
//       <h1>Audit Logs</h1>
//       <input
//         type="text"
//         placeholder="Search by action, user, or details..."
//         value={searchTerm}
//         onChange={handleSearch}
//       />
//       <table>
//         <thead>
//           <tr>
//             <th onClick={() => handleSort("timestamp")}>Timestamp</th>
//             <th onClick={() => handleSort("user")}>User</th>
//             <th onClick={() => handleSort("action")}>Action</th>
//             <th onClick={() => handleSort("details")}>Details</th>
//           </tr>
//         </thead>
//         <tbody style={{}}>
//           {currentLogs.map((log) => (
//             <tr key={log.id}>
//               <td>{new Date(log.timestamp).toLocaleString()}</td>
//               <td>{log.user}</td>
//               <td>{log.action}</td>
//               <td>{log.details}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="pagination">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button key={i} onClick={() => handlePageChange(i + 1)}>
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
