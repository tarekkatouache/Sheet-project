import api from "./api";

export const getUserById = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

// export const getAllUsers = async () => {
//   console.log("Fetching all users from user/service...");
//   try {
//     const response = await api.get("/users");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching all users:", error);
//     throw error;
//   }
// };
export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};
export const getUploadFolderSize = async () => {
  console.log("Fetching upload folder size from frontend/services/user.js...");
  const response = await api.get("/users/upload-folder-size");
  console.log("Upload folder size response:", response);
  return response.data;
};
