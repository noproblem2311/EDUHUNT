import axios from "axios";

const API_URL = "https://eduhuntbe20240320020607.azurewebsites.net//api/ScholarshipInfoes";

export const useScholarship = () => {
  const getScholarship = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const approveScholarship = async (id, isApproved) => {
    try {
      const response = await axios.put(`${API_URL}/${id}/approve`, isApproved, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const deleteScholarship = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const postScholarship = async (scholarshipData) => {
    try {
      const response = await axios.post(API_URL, scholarshipData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const getDetailScholarShip = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  return {
    getScholarship,
    deleteScholarship,
    postScholarship,
    getDetailScholarShip,
    approveScholarship,
  };
};
