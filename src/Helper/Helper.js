import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../Redux/utils/config';
const authHeader = () => {
    const token = localStorage.getItem('token') || {};
    return { 'Authorization': `Bearer ${token || ''}` };
};
// console.log("authHeader",authHeader);
// const API_URL = "http://localhost:5000/";
// const API_URL = "https://lead-management-project.vercel.app/";

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        ...authHeader()
    }
};

const handleResponse = (result, isNotify) => {
    if (isNotify && result.message) {
        // Handle notifications here
        // console.log("result", result.message);
        toast.success(result.message)
    }
    invalidToken(result.code);
    return result.data;
};

const makeHttpRequest = async (method, url, params, isNotify) => {
    try {
        const result = await axios({
            method,
            url: API_URL + url,
            data: { ...params },
            ...axiosConfig
        });

        return handleResponse(result, isNotify);
    } catch (error) {
        // alert(error.response?.data?.message);
        toast.error(error.response?.data?.message)
        console.error(error);
        throw error;
    }
};

const invalidToken = (code) => {
    if (code === 400) {
        sessionStorage.clear();
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/login";
        return false;
    }
};

const httpGet = async (url, params, isNotify) =>
    await makeHttpRequest("GET", url, params, isNotify);

const httpPost = async (url, params, isNotify) =>
    await makeHttpRequest("POST", url, params);

export { authHeader, httpGet, httpPost };
