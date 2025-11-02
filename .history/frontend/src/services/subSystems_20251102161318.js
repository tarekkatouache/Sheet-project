import api from "./api";

export const getSubSystems = async () => {
  const response = await api.get("/subSystems");
  return response.data;
};
export const addSubSystem = async (data) => {
  const response = await api.post("/subSystems", data);
  console.log("adding subsystem : ", data);
  return response.data;
};
//GET SUBSYSTEMS BY SYSTEM ID with route /api/subSystems/by-system/:systemId
export const getSubSystemsBySystemId = async (systemId) => {
  const response = await api.get(`/subSystems/by-system/${systemId}`);
  return response.data;
};
// get SUBSYSTEM BY ID
export const getSubSystemById = async (id) => {
  const response = await api.get(`/subSystems/${id}`);
  return response.data;
};
export const createSubSystem = async (formData) => {
  const response = await api.post("/subSystems/createSubSystem", formData);
  return response.data;
};
