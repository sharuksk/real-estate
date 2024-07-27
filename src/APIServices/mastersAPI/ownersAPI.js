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