'use client'
import axios from "axios";

const useMentor = () => {

    let url = "https://eduhuntbe20240320020607.azurewebsites.net/api/QAs/GetAllUserOrMentor/";
    let url2 = "https://eduhuntbe20240320020607.azurewebsites.net/api/QAs/Conversations/";
    if (typeof window !== "undefined") {
        url += localStorage.getItem("userId");
        url2 +=  localStorage.getItem("userId");
    }

    const getMentorIDList = async () => {
        try {
          const response = await axios.get(
            url,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
    
          const userList = response.data;
          return userList;
        } catch (error) {
          console.error(error);
          throw error;
        }
    };

    const getUserList = async () => {
        try {
          const response = await axios.get(
            'https://eduhuntbe20240320020607.azurewebsites.net/api/Profiles',
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
    
          const userList = response.data;
          return userList;
        } catch (error) {
          console.error(error);
          throw error;
        }
      };

    const getQAList = async () => {
      try {
        const response = await axios.get(
          url2,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        
        const list = response.data;
        return list;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    const getProfiles = async () => {
      try {
        const response = await axios.get(
          'https://eduhuntbe20240320020607.azurewebsites.net/api/Profiles',
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        const userList = response.data;
        return userList;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    
    return { getMentorIDList, getUserList, getQAList, getProfiles }
}

export default useMentor