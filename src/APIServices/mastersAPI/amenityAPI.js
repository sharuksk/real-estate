import { BASE_URL } from "../../endpoints/baseEndpoint";
import axios from "axios";
export const addAmenityAPI=async (amenityData)=>{
    const response=await axios.post(`${BASE_URL}/master/add-amenity`,{
        amenityname:amenityData?.amenityname,
    },{
withCredentials:true,
    })
    return response?.data;
}
export const getAmenityAPI = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/master/list-amenity`, {
            withCredentials: true,
        });
        return response.data.amenity;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch amenities');
    }
};