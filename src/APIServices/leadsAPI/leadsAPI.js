import axios from "axios"
import { BASE_URL } from "../../endpoints/baseEndpoint";

export const addLead = async (leadData) => {
    const response = await axios.post(`${BASE_URL}/master/add-lead`, leadData, { withCredentials: true });
    return response.data;
  };
export const getAgentsAPI=async ()=>{
    const response=await axios.get(`${BASE_URL}/admin/list-agents`,{
        withCredentials:true,
    });
    return response?.data;
}
export const getleadSourceAPI=async ()=>{
    const response=await axios.get(`${BASE_URL}/master/list-leadsource`,{
        withCredentials:true,
    });
    return response?.data;

}
export const getleadpropertytTypeAPI=async ()=>{
    const response=await axios.get(`${BASE_URL}/master/list-type`,{
        withCredentials:true,
    });
    return response?.data;

}
export const getAllLeadsAPI = async (page = 10, limit = 10, search = '') => {
    try {
        const response = await axios.get(`${BASE_URL}/master/list-lead`, {
            params: { page, limit, search },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch lEAD');
    }
};
export const deleteleadAPI=async (id)=>{
    const response=await axios.delete(`${BASE_URL}/master/delete-lead/${id}`,{
        withCredentials:true,
    })
    return response?.data;
}
export const getLeadById=async (id)=>{
    const response=await axios.get(`${BASE_URL}/master/get-lead/${id}`,{
        withCredentials:true,
    });
    return response?.data;
}
export const updateLeadAPI = async (id, updatedData) => {
    try {
        const response = await axios.put(`${BASE_URL}/master/update-lead/${id}`, updatedData, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to update owner: ${error.response?.data?.message || error.message}`);
    }
};