import axios from "axios";

export const setCsrfToken = () => {
    axios
        .create({
            baseURL: "http://localhost:8000/",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            },
            withCredentials: true,
        })
        .get("/sanctum/csrf-cookie")
        .then((response) => {
            // console.log("CSRF Token Set");
        })
        .catch((err) => {
            // console.log("Hear are error");
        });
};

const axiosConfig = axios.create({
    baseURL: "http://localhost:8000/api/",
});

axiosConfig.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axiosConfig.defaults.headers.common["Access-Control-Allow-Methods"] = "GET,PUT,POST,DELETE,PATCH,OPTIONS";

export default axiosConfig;
