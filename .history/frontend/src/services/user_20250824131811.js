import api from "./api";

export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
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
