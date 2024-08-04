import axios from "axios";
import { BASE_URL } from "../../endpoints/baseEndpoint";
export const AddPropertiesAPI = async (data) => {
  const response = await axios.post(`${BASE_URL}/project/add-property`, data, {
    withCredentials: true,
  });
  return response?.data;
};

// export const AllProjectsAPI = async () => {
//   const response = await axios.get(`${BASE_URL}/project/get-project`, {
//     withCredentials: true,
//   });
//   return response?.data;
// };

// export const getProjectAPI = async (id) => {
//   const response = await axios.get(`${BASE_URL}/project/get-project/${id}`, {
//     withCredentials: true,
//   });
//   return response?.data;
// };

// export const EditProjectAPI = async (data) => {
//   const response = await axios.post(
//     `${BASE_URL}/project/update-project`,
//     data,
//     {
//       withCredentials: true,
//     }
//   );
//   return response?.data;
// };

// export const deleteProjectAPI = async (id) => {
//   const response = await axios.delete(
//     `${BASE_URL}/project/delete-project/${id}`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response?.data;
// };
