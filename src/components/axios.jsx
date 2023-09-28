import axios from "axios";
axios.defaults.baseURL = "https://backoffice.nodemy.vn/api/"; //src chung của tất cả request khi gọi api
// axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
axios.defaults.headers.post["Content-Type"] = "application/json"; //headers  với key content type =""dùng chung nhiều lần khi gọi api
