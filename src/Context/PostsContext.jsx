import { createContext, useReducer } from "react";

export const PostsContext = createContext();

export const postReducer = (state, action) => {
  
  if (action.type === "GET_POST") {
    return {
      posts: action.payload,
    };
  }
   else {
    return state;
  }
};

export const PostsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, { posts: null });

  return (
    <PostsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PostsContext.Provider>
  );
};
