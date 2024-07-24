import axios from "axios"
import { BASE_URL } from "../../endpoints/baseEndpoint"
export const loginAPI=async(userData)=>{
    const response=await axios.post(`${BASE_URL}/user/login`,{
email:userData?.email,
password:userData?.password,
role:userData?.role,
    },{
        withCredentials: true,
    })
    return response?.data;
}
export const logoutAPI=async ()=>{
    const response=await axios.post(`${BASE_URL}/user/logout`,{},{
        withCredentials:true,
    })
    return response?.data;
}