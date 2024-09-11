import React from "react";
import css from "./NewsItem.module.css";

const NewsItem = ({
  title,
  description,
  source_name,
  pubDate,
  image_url,
  link,
}) => {
  return (
    <div className={`${css.container}`}>
      <img
        className={`${css.img} card-img-top`}
        src={
          image_url !== null
            ? image_url
            : "https://plus.unsplash.com/premium_photo-1688561384438-bfa9273e2c00?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D"
        }
        onError={(event) => {
          event.target.src =
            "https://plus.unsplash.com/premium_photo-1688561384438-bfa9273e2c00?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D";
          event.onError = null;
        }}
      />
      <div className={`${css.textContainer} card-body`}>
        <h5>{title} .</h5>
        <p>{description === null ? "" : description.substr(0, 120) + "..."} </p>
        <div className={`${css.timeAuthor}`}>
          <p>
            By - {source_name} on - {new Date(pubDate).toLocaleString()}
          </p>
        </div>
        <center>
          <a href={link}>
            {" "}
            <button className={`${css.button}`}>Read More</button>
          </a>
        </center>
      </div>
    </div>
  );
};

export default NewsItem;
