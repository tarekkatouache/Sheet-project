import api from "./api";

export const getSubSystems = async () => {
  const response = await api.get("/subSystems");
  return response.data;
};
export const addSubSystem = async (data) => {
  const response = await api.post("/subSystems", data);
  return response.data;
};
