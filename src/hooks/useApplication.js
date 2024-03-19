import axios from "axios";

const API_URL = "https://eduhuntbe20240320020607.azurewebsites.net/api/Applications";

export const useApplication = () => {
  const getApplications = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getApplication = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const postApplication = async (application) => {
    try {
      const response = await axios.post(API_URL, application);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const putApplication = async (id, application) => {
    console.log(application);
    try {
      const response = await axios.put(`${API_URL}/${id}`, application);
      console.log(response);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const deleteApplication = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getApplicationsByScholarshipProvider = async (
    scholarshipProviderId
  ) => {
    try {
      const response = await axios.get(
        `${API_URL}/ScholarshipProvider/${scholarshipProviderId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    getApplications,
    getApplication,
    postApplication,
    putApplication,
    deleteApplication,
    getApplicationsByScholarshipProvider, // Add this line to return the new function
  };
};
