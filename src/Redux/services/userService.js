// adminService.js
import axios from "axios";
import { API_URL } from "../utils/config";

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
});

export const httpGet = async (url) => {
    try {
        const response = await axiosInstance.get(url);
      
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

