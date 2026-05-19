import axios from "axios";

const API = axios.create({
    baseURL: "https://task-manager-prw9.onrender.com"
});

export default API;