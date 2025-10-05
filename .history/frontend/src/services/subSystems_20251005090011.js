export const getSubSystems = async () => {
  const response = await api.get("/systems");
  return response.data;
};
