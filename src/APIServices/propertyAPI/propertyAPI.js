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

export const EditPropertyAPI = async (data) => {
  const response = await axios.post(
    `${BASE_URL}/project/update-property/${data.id}`,
    data,
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

export const deletePropertyAPI = async (id) => {
  const response = await axios.delete(
    `${BASE_URL}/project/delete-property/${id}`,
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

export const getAllPropertyAPI = async (page = 10, limit = 10, search = "") => {
  try {
    const response = await axios.get(`${BASE_URL}/project/getAllProperty`, {
      params: { page, limit, search },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch lEAD");
  }
};
