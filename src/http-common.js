import axios from "axios";

export default axios.create({
  // baseURL: "http://192.168.99.100/api",
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-type": "application/json",
  },
});
