import axios from "axios"
import {BASE_URL} from "../../endpoints/baseEndpoint"
export const addAgentsAPI=async (agentData)=>{
    const response=await axios.post(`${BASE_URL}/admin/add-agent`,{
name:agentData?.name,
contact:agentData?.contact,
email:agentData?.email,
qatarId:agentData?.qatarId,
address:agentData?.address,
state:agentData?.state,
dob:agentData?.dob,
city:agentData?.city,
pinCode:agentData?.pinCode,
commissionInfo: agentData?.commissionInfo,
licenseInfo: agentData?.licenseInfo,
projects: agentData?.projects
    },{
        withCredentials:true,
    })
    return response?.data;
}
export const listAgentsAPI=async (page=10,limit=3,search='')=>{
    const response=await axios.get(`${BASE_URL}/admin/list-agents`,
    {
        params:{page,limit,search},
        withCredentials:true,
    });
    return response?.data;
}
export const deleteAgentsAPI=async (id)=>{
    const response=await axios.delete(`${BASE_URL}/admin/remove-agent/${id}`,{
        withCredentials:true,
    });
    return response?.data;
}
export const getAgentById=async (id)=>{
    const response=await axios.get(`${BASE_URL}/admin/agent/${id}`,{
        withCredentials:true,
    });
    return response?.data;
}
export const updateAgentAPI = async (id, updatedData) => {
    try {
        const response = await axios.put(`${BASE_URL}/admin/update-agent/${id}`, updatedData, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to update agent: ${error.response?.data?.message || error.message}`);
    }
};