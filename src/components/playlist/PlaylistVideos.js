import React from "react";
import { useVideosContext } from "../../context/VideosContext";
import likedStyle from "../history/history.module.css";
import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";

export const PlaylistVideos = ({ name }) => {
  const {
    state: { playlist },
    dispatch,
  } = useVideosContext();
  const list = playlist.find((vid) => vid.name === name);
  return (
    <div className={likedStyle.container}>
      <h1
        style={{
          fontSize: "2rem",
          textAlign: "center",
          fontWeight: "500",
          color: "#fff",
          textTransform: "capitalize",
        }}
      >
        {name}
      </h1>
      <div className={likedStyle.grid}>
        {list?.videos?.map(({ _id, thumbnail, intro, channel }) => (
          <div className={likedStyle.main} key={_id}>
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
              onClick={() => {
                dispatch({
                  type: "REMOVE-FROM-PLAYLIST",
                  payload: { _id, name, list },
                });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
