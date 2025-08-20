import api from "./api";
import { apiMultipart } from "./api"; //  multipart instance

export const getSheetsByInstrument = async (instrumentId) => {
  console.log("Base URL:", api.defaults.baseURL);
  console.log("Full URL:", `/technical-sheets/instrument/${instrumentId}`);
  const response = await api.get(
    `/technical-sheets/instrument/${instrumentId}`
  );
  return response.data;
};

export const getSheetById = async (id) => {
  const response = await api.get(`/technical-sheets/${id}`);
  return response.data;
};

export const getSheetsBySystem = async (systemId) => {
  const response = await api.get(`/technical-sheets`, {
    params: { systemId },
  });
  return response.data;
};
export const deleteTechnicalSheet = async (id) => {
  const response = await api.delete(`/technical-sheets/${id}`);
  return response.data;
};

// services/technicalSheet.js
// uploadTechnicalSheet function to handle file uploads
export const uploadTechnicalSheet = async (file, instrumentId) => {
  const formData = new FormData();
  formData.append("file", file); // must match multer field name
  if (instrumentId) formData.append("instrumentId", instrumentId);

  const response = await apiMultipart.post("/technicalSheets/upload", formData);
  return response.data;
};
