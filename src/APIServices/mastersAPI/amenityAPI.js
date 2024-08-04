import { BASE_URL } from "../../endpoints/baseEndpoint";
import axios from "axios";
export const addAmenityAPI = async (amenityData) => {
  const response = await axios.post(
    `${BASE_URL}/master/add-amenity`,
    {
      amenityname: amenityData?.amenityname,
    },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
export const getAmenityAPI = async (page = 10, limit = 3, search = "") => {
  try {
    const response = await axios.get(`${BASE_URL}/master/list-amenity`, {
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
export const deleteAmenityAPI = async (id) => {
  const response = await axios.delete(
    `${BASE_URL}/master/delete-amenity/${id}`,
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

export const getAllAmenityAPI = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/master/getAmenity`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch amenities"
    );
  }
};
