import axios from "axios";

export default axios.create({
  baseURL: "https://blogapp-be.up.railway.app/api",
});
