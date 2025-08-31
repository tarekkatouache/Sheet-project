import api from "./api";

export const getSystems = async () => {
  const response = await api.get("/systems");
  return response.data;
};

export const addSystem = async (data) => {
  const response = await api.post("/systems", data);
  return response.data;
};

export const deleteSystem = async (id) => {
  const response = await api.delete(`/systems/${id}`);
  return response.data;
};

export const updateSystem = async (id, data) => {
  const response = await api.put(`/systems/${id}`, data);
  return response.data;
};
export const getSystemById = async (id) => {
  const response = await api.get(`/systems/${id}`);
  return response.data;
};
