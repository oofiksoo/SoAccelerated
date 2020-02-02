import axios from "axios";
const token = localStorage.getItem("Authorization");
export const axiosWithAuth = () => {
    return axios.create({
        baseURL: "http://ctfjmg01:5000/api",
        headers: {
            authorization: token
        }
    });
};