import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "../Components/api";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { state, dispatch } = useAuthContext();

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    // const response = await fetch("/api/user/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ username, password }),
    // });
    // const json = await response.json();

    const response = await axios.post("/user/login", { username, password });
    const json = await response.data;

    if (!response.status == 200) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.status == 200) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });
    

      // update loading state
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
