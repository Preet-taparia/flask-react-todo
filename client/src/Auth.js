import client from "./KeycloakConfig";
import axios from "axios";

function getCookie(name){
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length == 2) return parts.pop().split(";").shift(); 
}

const axiosInstance = axios.create({baseURL: process.env.REACT_APP_API_URL,});

axiosInstance.interceptors.request.use(
    (config)=>{
        const csrfToken = getCookie("csrftoken");
        config.headers["X-CSRFToken"] = csrfToken;
        if(client && client.token){
            config.headers["Authorization"] = `Bearer ${client.token}`;
        }
        return config
    },(error) =>{
        return Promise.reject(error);
    }

);

export default axiosInstance;