import api from "./api";

export const getInstrument = async () => {
  const response = await api.get("/instruments");
  return response.data;
};

export const addInstrument = async (data) => {
  const response = await api.post("/instruments", data);
  return response.data;
};

export const deleteInstrument = async (id) => {
  const response = await api.delete(`/instruments/${id}`);
  return response.data;
};

export const updateInstrument = async (id, data) => {
  const response = await api.put(`/instruments/${id}`, data);
  return response.data;
};
export const getInstrumentById = async (id) => {
  console.log("Fetching instrument with id:", id); // 👀 debug

  const response = await api.get(`/instruments/${id}`);
  console.log("API response:", response.data);

  return response.data;
};
