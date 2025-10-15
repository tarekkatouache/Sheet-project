import api from "./api";
import { apiMultipart } from "./api"; //  multipart instance

export const getSheetsByInstrument = async (instrumentId) => {
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
export const uploadTechnicalSheet = async (
  file,
  reference,
  instrumentId,
  subSystemid,
  key_words
) => {
  const formData = new FormData();
  formData.append("file", file); // must match multer field name
  if (instrumentId) formData.append("instrumentId", instrumentId);
  if (reference) formData.append("reference", reference);
  if (subSystemid) formData.append("subSystemid", subSystemid);
  if (key_words) formData.append("key_words", JSON.stringify(key_words)); // append keywords

  const response = await apiMultipart.post("/technicalSheets/upload", formData);
  console.log("Upload response:", response.data);
  return response.data;
};

export const updateTechnicalSheet = async (id, data) => {
  const response = await api.put(`/technical-sheets/${id}`, data);
  return response.data;
};

export const getsheetWithInstrumentAndSystem = async (id) => {
  // Fetch the sheet with its instrument and system details
  const response = await api.get(`/sheetdata/${id}`);

  return response.data;
};
export const getAllTechnicalSheets = async () => {
  const response = await api.get("/technical-sheets");
  return response.data;
};
