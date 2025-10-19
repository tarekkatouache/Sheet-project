import api from "./api";
import { apiMultipart } from "./api"; //  multipart instance

// / uploadTechnicalSheetSubSystem function to handle file uploads
export const uploadTechnicalSheetSubSystem = async (
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
  // if (key_words) formData.append("key_words", JSON.stringify(key_words)); // append keywords

  const response = await apiMultipart.post("/technicalSheets/upload", formData);
  console.log("Upload response:", response.data);
  return response.data;
};
