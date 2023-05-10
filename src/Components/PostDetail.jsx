import { Link } from "react-router-dom";
import defaultImg from "../img/defaultImg.jpg";
import moment from "moment";

const Detail = ({ post }) => {
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home-article">
      <div className="home-article-img padding-bottom-15">
        <Link to={`/post/${post._id}`}>
          <img src={post.image ? post.image : defaultImg} alt="article" />
        </Link>
      </div>
      <div className="home-article-content">
        <div>
          <Link to={`/post/${post._id}`}>
            <p className="fw-semi-bold fs-700 padding-bottom-15">
              {post.title}
            </p>
          </Link>
        </div>
        <div className="font-secondary fw-regular fs-300 padding-bottom-10">
          Posted {moment(post.createdAt).format("MMM Do YY")}
        </div>
        <Link to={`/post/${post._id}`}>
          <p className="font-secondary fw-regular fs-500 padding-bottom-10 line-height-400">
            {`${getText(post.content.substring(0, 250))}......`}
          </p>
        </Link>
      </div>
    </div>
  );
};
export default Detail;
