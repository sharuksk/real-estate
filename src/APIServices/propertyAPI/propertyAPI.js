import axios from "axios";
import { BASE_URL } from "../../endpoints/baseEndpoint";
export const AddPropertiesAPI = async (data) => {
  const response = await axios.post(`${BASE_URL}/project/add-property`, data, {
    withCredentials: true,
  });
  return response?.data;
};

export const AllPropertiesAPI = async () => {
  const response = await axios.get(`${BASE_URL}/project/list-property`, {
    withCredentials: true,
  });
  return response?.data;
};

export const getPropertyAPI = async (id) => {
  const response = await axios.get(`${BASE_URL}/project/get-property/${id}`, {
    withCredentials: true,
  });
  return response?.data;
};

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

export const deletePropertyAPI = async (id) => {
  const response = await axios.delete(
    `${BASE_URL}/project/delete-property/${id}`,
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
