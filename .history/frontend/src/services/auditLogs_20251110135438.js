import api from "./api";

export const getAuditLogs = async () => {
  try {
    const response = await api.get("/auditlogs");
    console.log("Audit Logs fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    throw error;
  }
};
export const getLengthAuditLogs = async () => {
  try {
    const response = await api.get("/auditlogs/length");
    console.log("Audit Logs length fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching audit logs length:", error);
    
