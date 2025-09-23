import api from "./api";

export const getAuditLogs = async () => {
  try {
    const response = await api.get("/auditLogs");
    return response.data;
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    throw error;
  }
};
