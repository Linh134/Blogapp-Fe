import { useEffect } from "react";
import { usePostsContext } from "../Hooks/usePostsContext";
import { useAuthContext } from "../Hooks/useAuthContext";
import axios from "../Components/api";
import PostDetail from "../Components/PostDetail";

const Home = () => {
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();

  // Get all Posts
  useEffect(() => {
    const getPosts = async () => {
      const options = {
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
        url: "/post",
      };
      const response = await axios(options);
      const json = response.data;
      if (response.status == 200) {
        dispatch({ type: "GET_POST", payload: json });
      }
    };
    if (user) {
      getPosts();
    }
  }, [dispatch, user]);

  return (
    <div className="home-articles max-width-1 m-auto font-primary">
      <p className="font-secondary fs-800 fw-bold">Featured Articles</p>

      {posts && posts.map((post) => <PostDetail key={post._id} post={post} />)}
    </div>
  );
};

export default Home;
