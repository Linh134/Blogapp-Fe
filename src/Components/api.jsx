import axios from "axios";

export default axios.create({
  baseURL: "https://test-be-production.up.railway.app/api",
});
