// // services/authService.js
// import axios from "axios";
// import { API_URL } from "../utils/config";

// const axiosInstance = axios.create({
//     baseURL: API_URL,
// });

// const authService = {
//     login: async (loginDetails, selectedUserType) => {
//         const endpoints = {
//             admin: '/api/admin/loginadmin',
//             pm: '/api/pm/loginpm',
//             company: '/api/company/logincompany'
//         };
//         const apiEndpoint = endpoints[selectedUserType];
//         const response = await axiosInstance.post(apiEndpoint, { ...loginDetails });
//         return response.data;
//     },
//     logout: async () => {
//         const response = await axiosInstance.post("/logout");
//         return response.data;
//     },
// };

// export default authService;



// services/authService.js
import axios from "axios";
import { API_URL } from "../utils/config";
import axiosInstance from "./serverApi";

// const axiosInstance = axios.create({
//     baseURL: API_URL,
// });


// api/admin/updateadmin
// api/company/updatecompany

const authService = {
    login: async (loginDetails) => {

        const response = await axiosInstance.post("admin/companyLogin", { ...loginDetails });
        return response.data;
    },
    logout: async () => {
        const response = await axiosInstance.post("/logout");
        return response.data;
    },
    editUser: async (userData, selectedUserType) => {
        console.log("userData", userData, selectedUserType);
        const endpoints = {
            admin: '/api/admin/updateadmin',
            company: '/api/company/updatecompany'
        };
        const apiEndpoint = endpoints[selectedUserType];
        const response = await axiosInstance.post(apiEndpoint, userData);
        return response.data;
    },
    deleteUser: async (userId) => {
        const response = await axiosInstance.delete(`/api/users/${userId}`);
        return response.data;
    },
};

export default authService;

