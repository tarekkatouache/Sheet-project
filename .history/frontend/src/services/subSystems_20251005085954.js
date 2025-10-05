export const getSystems = async () => {
  const response = await api.get("/systems");
  return response.data;
};
