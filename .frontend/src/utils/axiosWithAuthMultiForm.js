import axios from "axios";
const token = localStorage.getItem("Authorization");
export const axiosWithAuthMultiForm = () => {
    return axios.create({
        baseURL: "http://localhost:5000/api",
        headers: {
            Contenttype: "multipart/form-data",
            authorization: token
        }
    });
};