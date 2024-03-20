import axios from "axios";

const API_URL = "https://eduhuntbe20240320020607.azurewebsites.net/api/Certificates";

export const useCertificate = () => {
  const getCertificate = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const approveCertificate = async (id, isApproved) => {
    try {
      const response = await axios.put(`${API_URL}/${id}/approve`, isApproved, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const deleteCertificate = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const postCertificate = async (userId, contentURL) => {
    try {
      const response = await axios.post(API_URL, { userId, contentURL });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  return {
    getCertificate,
    deleteCertificate,
    postCertificate,
    approveCertificate,
  };
};
