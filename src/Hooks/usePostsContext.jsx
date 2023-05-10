import { useContext } from "react";
import { PostsContext } from "../Context/PostsContext";

export const usePostsContext = () => {
  const context = useContext(PostsContext);
  return context;
};
