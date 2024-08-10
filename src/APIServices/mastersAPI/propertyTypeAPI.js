import axios from "axios";
import { BASE_URL } from "../../endpoints/baseEndpoint";
export const addPropertyTypeAPI = async (propertyTypeData) => {
  const response = await axios.post(
    `${BASE_URL}/master/add-propertyType`,
    {
      propertyTypeName: propertyTypeData?.propertyTypeName,
    },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
export const getPropertyTypeAPI = async (page = 10, limit = 3, search = "") => {
  try {
    const response = await axios.get(`${BASE_URL}/master/list-propertyType`, {
      params: { page, limit, search },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch amenities"
    );
  }
};
export const deletePropertyTypeAPI = async (id) => {
  const response = await axios.delete(
    `${BASE_URL}/master/delete-propertyType/${id}`,
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

export const getAllPropertyTypeAPI = async (id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/master/getAllpropertyType/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch amenities"
    );
  }
};
