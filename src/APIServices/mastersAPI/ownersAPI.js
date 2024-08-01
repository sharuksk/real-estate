import axios from "axios"
import {BASE_URL} from "../../endpoints/baseEndpoint"
export const addOwnersAPI=async (ownerData)=>{
    const response=await axios.post(`${BASE_URL}/admin/add-owner`,{
name:ownerData?.name,
contact:ownerData?.contact,
email:ownerData?.email,
qatarId:ownerData?.qatarId,
address:ownerData?.address,
state:ownerData?.state,
dob:ownerData?.dob,
preferredLanguage:ownerData?.preferredLanguage,
city:ownerData?.city,
pinCode:ownerData?.pinCode
    },{
        withCredentials:true,
    })
    return response?.data;
}
export const listOwnersAPI=async (page=10,limit=3,search='')=>{
    const response=await axios.get(`${BASE_URL}/admin/list-owner`,
    {
        params:{page,limit,search},
        withCredentials:true,
    });
    return response?.data;
}
export const deleteOwnersAPI=async (id)=>{
    const response=await axios.delete(`${BASE_URL}/admin/delete-owner/${id}`,{
        withCredentials:true,
    });
    return response?.data;
}
export const getOwnerById=async (id)=>{
    const response=await axios.get(`${BASE_URL}/admin/owner/${id}`,{
        withCredentials:true,
    });
    return response?.data;
}
export const updateOwnerAPI = async (id, updatedData) => {
    try {
        const response = await axios.put(`${BASE_URL}/admin/update-owner/${id}`, updatedData, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to update owner: ${error.response?.data?.message || error.message}`);
    }
};