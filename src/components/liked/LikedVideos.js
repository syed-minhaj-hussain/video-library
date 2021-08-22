import React from "react";
import { useVideosContext } from "../../context/VideosContext";
import likedStyle from "../history/history.module.css";
import axios from "axios";

import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export const LikedVideos = () => {
  const {
    state: { liked },
    dispatch,
  } = useVideosContext();
  const { auth } = useAuthContext();
  // const rev = liked.reverse();
  console.log({ liked });
  return (
    <div className={likedStyle.container}>
      <h1 className={likedStyle.title}>Videos You've Liked!</h1>
      <div className={likedStyle.grid}>
        {liked?.map(({ _id, thumbnail, intro, channel }) => (
          <div className={likedStyle.main}>
            {" "}
            <Link to={`/watch/${_id}`} className={likedStyle.link} key={_id}>
              <div className={likedStyle.card}>
                <figure>
                  <img src={thumbnail} alt={channel} />
                </figure>
                <div className={likedStyle.cardBody}>
                  <p className={likedStyle.intro}>{intro}</p>
                  <p className={likedStyle.channel}>{channel}</p>
                </div>
              </div>
            </Link>
            <TiDelete
              className={likedStyle.delete}
              onClick={async () => {
                dispatch({ type: "REMOVE-FROM-LIKED", payload: _id });
                try {
                  const response = await axios.delete(
                    `https://clink-player-backend.herokuapp.com/likedVideos/${_id}`,
                    { headers: { authorization: auth } }
                  );
                  if (response) {
                    console.log(response.data.message);
                  }
                } catch (err) {
                  console.log({ err });
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
