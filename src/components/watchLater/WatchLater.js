import React from "react";
import { useVideosContext } from "../../context/VideosContext";
import watchLaterStyle from "../history/history.module.css";
import axios from "axios";

import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export const WatchLater = () => {
  const {
    state: { watchLater },
    dispatch,
  } = useVideosContext();
  const { auth } = useAuthContext();
  // const rev = watchLater.reverse();
  // console.log({ watchLater });
  return (
    <div className={watchLaterStyle.container}>
      <h1 className={watchLaterStyle.title}>Watch When You're Free!</h1>
      <div className={watchLaterStyle.grid}>
        {watchLater?.map(({ _id, thumbnail, intro, channel }) => (
          <div className={watchLaterStyle.main} key={_id}>
            {" "}
            <Link
              to={`/watch/${_id}`}
              className={watchLaterStyle.link}
              key={_id}
            >
              <div className={watchLaterStyle.card}>
                <figure>
                  <img src={thumbnail} alt={channel} />
                </figure>
                <div className={watchLaterStyle.cardBody}>
                  <p className={watchLaterStyle.intro}>{intro}</p>
                  <p className={watchLaterStyle.channel}>{channel}</p>
                </div>
              </div>
            </Link>
            <TiDelete
              className={watchLaterStyle.delete}
              onClick={async () => {
                dispatch({ type: "REMOVE-FROM-WATCH-LATER", payload: _id });
                try {
                  const response = await axios.delete(
                    `https://clink-player-backend.herokuapp.com/watchLater/${_id}`,
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
