import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PostsContextProvider } from "./Context/PostsContext";
import { AuthContextProvider } from "./Context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostsContextProvider>
        <App />
      </PostsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
