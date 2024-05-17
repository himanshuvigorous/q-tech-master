// api/serverApi.js
import axios from "axios";
import { API_URL } from "../utils/config";

const token = localStorage.getItem("token");
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: token ? `Bearer ${token}` : "",
    },
});

export default axiosInstance;
