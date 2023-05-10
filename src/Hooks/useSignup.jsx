import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "../Components/api";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (username, password) => {
    setIsLoading(true);
    setError(null);

    const response = await axios.post("/user/register", { username, password });
    const json = await response.data;
    console.log(json);

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

  return { signup, isLoading, error };
};
