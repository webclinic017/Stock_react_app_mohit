import axios from "axios";

// const base_url="http://127.0.0.1:8000/";
// const base_url="https://sabertoothdashboard.herokuapp.com/";
const base_url = "http://74.207.225.205:8000/";


export const getToken = () => {
    return localStorage.getItem('token');
}
if (getToken()) {
    axios.defaults.headers.common['Authorization'] = `Token ${getToken()}`;
}

axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedError) {
        console.log("Logging Error", error);
        alert("An Unexpected error occurred")
    }
    return Promise.reject(error);

})
export default axios.create({
    baseURL: base_url,
});

localStorage.setItem("base_url", base_url);
















