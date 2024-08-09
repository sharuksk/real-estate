import axios from "axios";
import { BASE_URL } from "../../endpoints/baseEndpoint";
export const loginAPI = async (userData) => {
  const response = await axios.post(
    `${BASE_URL}/user/login`,
    {
      email: userData?.email,
      password: userData?.password,
      role: userData?.role,
    },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
export const logoutAPI = async () => {
  const response = await axios.post(
    `${BASE_URL}/user/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
export const checkAuthenticatedAPI = async () => {
  const response = await axios.get(`${BASE_URL}/user/checkAuth`, {
    withCredentials: true,
  });

  return response.data;
};

export const AllAgentAPI = async () => {
  const response = await axios.get(`${BASE_URL}/user/getAgent`, {
    withCredentials: true,
  });
  return response?.data;
};

export const RegisterAPI = async (userData) => {
  const response = await axios.post(`${BASE_URL}/user/register`, userData, {
    withCredentials: true,
  });
  return response?.data;
};

export const AdminRegisterAPI = async (userData) => {
  const response = await axios.post(
    `${BASE_URL}/user/register-admin`,
    userData,
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

//OnBoardingFormAPI//

export const OnBoardingAPI = async (data) => {
  const response = await axios.post(`${BASE_URL}/user/update-profile`, data, {
    withCredentials: true,
  });
  return response?.data;
};
