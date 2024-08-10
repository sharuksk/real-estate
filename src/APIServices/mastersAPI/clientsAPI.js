import axios from "axios";
import { BASE_URL } from "../../endpoints/baseEndpoint";
export const addClientsAPI = async (clientData) => {
  const response = await axios.post(
    `${BASE_URL}/admin/add-client`,
    {
      name: clientData?.name,
      contact: clientData?.contact,
      email: clientData?.email,
      qatarId: clientData?.qatarId,
      address: clientData?.address,
      state: clientData?.state,
      occupation: clientData?.occupation,
      designation: clientData?.designation,
      organization: clientData?.organization,
      dob: clientData?.dob,
      preferredLanguage: clientData?.preferredLanguage,
      city: clientData?.city,
      pinCode: clientData?.pinCode,
      source: clientData?.source,
      createdById: clientData?.createdById,
      createdByType: clientData?.createdByType,
    },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
export const listClientsAPI = async (page = 10, limit = 3, search = "") => {
  const response = await axios.get(`${BASE_URL}/admin/list-clients`, {
    params: { page, limit, search },
    withCredentials: true,
  });
  return response?.data;
};
export const deleteClientsAPI = async (id) => {
  const response = await axios.delete(`${BASE_URL}/admin/remove-client/${id}`, {
    withCredentials: true,
  });
  return response?.data;
};
export const getClientById = async (id) => {
  const response = await axios.get(`${BASE_URL}/admin/client/${id}`, {
    withCredentials: true,
  });
  return response?.data;
};
export const updateClientAPI = async (id, updatedData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/admin/update-client/${id}`,
      updatedData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to update client: ${
        error.response?.data?.message || error.message
      }`
    );
  }
};
