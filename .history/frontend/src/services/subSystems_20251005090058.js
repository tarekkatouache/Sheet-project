export const getSubSystems = async () => {
  const response = await api.get("/subSystems");
  return response.data;
};
