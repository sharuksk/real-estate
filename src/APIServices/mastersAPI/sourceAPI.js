import axios from "axios";
import { BASE_URL } from "../../endpoints/baseEndpoint";
export const addSourceAPI = async (sourceData) => {
  const response = await axios.post(
    `${BASE_URL}/master/add-source`,
    {
      sourcename: sourceData?.sourcename,
    },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
export const getSourceAPI = async (page = 10, limit = 3, search = "") => {
  try {
    const response = await axios.get(`${BASE_URL}/master/list-source`, {
      params: { page, limit, search },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch Source");
  }
};
export const deleteSourceTypeAPI = async (id) => {
  const response = await axios.delete(
    `${BASE_URL}/master/delete-source/${id}`,
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

export const getAllSourceAPI = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/master/getAllsource/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch Source");
  }
};
