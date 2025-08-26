import api from "./api";

export const getUploadFolderSize = async () => {
  try {
    const response = await api.get("/storage-usage");

    return response.data;
  } catch (error) {
    console.error("Error fetching upload folder size:", error);
    throw error;
  }
};
