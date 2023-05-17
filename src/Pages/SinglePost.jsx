import { useState, useEffect } from "react";
import { useAuthContext } from "../Hooks/useAuthContext";
import axios from "../Components/api";
import defaultImg from "../img/defaultImg.jpg";
import editpost from "../img/editpost.png";
import deletepost from "../img/deletepost.png";
import moment from "moment";

import { Link, useLocation, useNavigate } from "react-router-dom";

const singlePost = () => {
  const [post, setPost] = useState({});
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const singleId = location.pathname.split("/")[2];

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  // Get a Post
  useEffect(() => {
    const getPost = async () => {
      const options = {
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
        url: `/post/${singleId}`,
      };
      try {
        const response = await axios(options);
        setPost(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPost();
  }, [singleId]);

  // Delete a Post
  const handleDelete = async () => {
    const options = {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
      url: `/post/${singleId}`,
    };
    try {
      await axios(options);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="max-width-1 m-auto">
        <hr />
      </div>
      <div className="post-img">
        <img src={post.image ? post.image : defaultImg} alt="" />
      </div>
      <div className="m-auto blog-post-content max-width-2 m-auto my-2 font-primary">
        <h1 className="fw-bold fs-800 padding-bottom-15">{post.title}</h1>
        <div className="blogpost-meta padding-bottom-15">
          <div className="author-info">
            <div className="font-secondary fw-regular fs-500">
              <b>{`Created by ${user.username} `}</b>
            </div>
            <div className="font-secondary fw-regular fs-300">
              Posted {moment(post.createdAt).fromNow()}
            </div>
          </div>
          <div className="social">
            <Link to={`/create?edit=3`} state={post}>
              <img src={editpost} alt="" />
            </Link>
            <img onClick={handleDelete} src={deletepost} alt="" />
          </div>
        </div>
        <div className="font-secondary fw-regular fs-500 line-height-800 ">
          <p>{getText(post.content)}</p>
        </div>
      </div>
    </div>
  );
};

export default singlePost;
