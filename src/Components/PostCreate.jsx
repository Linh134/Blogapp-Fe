import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAuthContext } from "../Hooks/useAuthContext";
import axios from "../Components/api";
import { useNavigate, useLocation } from "react-router-dom";

export default function PostCreate() {
  const state = useLocation().state;
  const { user } = useAuthContext();
  const [title, setTitle] = useState(state?.title || "");
  const [content, setContent] = useState(state?.content || "");
  const [images, setImages] = useState();
  const navigate = useNavigate();
  const cloud_name = "de1tcuixs";
  let imgUrl = "";

  // Upload image
  const upload = async () => {
    const data = new FormData();
    data.append("file", images);
    data.append("upload_preset", "preset1");

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      data
    );

    imgUrl = response.data.secure_url;
    return imgUrl;
  };

  // Create or Update a Post
  const handleClick = async (e) => {
    e.preventDefault();
    if (images) {
      imgUrl = await upload();
    } else {
      imgUrl = "";
    }

    const post = {
      title,
      content,
      image: imgUrl,
    };

    if (state) {
      const options = {
        method: "PUT",
        data: post,
        headers: { Authorization: `Bearer ${user.token}` },
        url: `/post/${state._id}`,
      };
      await axios(options);
    } else {
      const options = {
        method: "POST",
        data: post,
        headers: { Authorization: `Bearer ${user.token}` },
        url: "/post",
      };
      await axios(options);
    }
    navigate("/");
  };

  // Setup Quill
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
  ];

  return (
    <div className="contact-content font1 max-width-1 m-auto font-primary">
      <div className="max-width-1 m-auto mx-1">
        <div className="contact-form">
          <div className="create-box">
            <input
              className="text"
              type="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                setImages(e.target.files[0]);
              }}
            />
          </div>
          <div className=" quill">
            <ReactQuill
              value={content}
              modules={modules}
              formats={formats}
              onChange={(newValue) => setContent(newValue)}
            />
          </div>
          <div>
            <button onClick={handleClick} className="btn">
              Create Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
