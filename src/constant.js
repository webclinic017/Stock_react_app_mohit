import axios from "axios";

const base_url="https://sabertoothdashboard.herokuapp.com/";

export default axios.create({
    baseURL:base_url,
});

localStorage.setItem("base_url", base_url);
