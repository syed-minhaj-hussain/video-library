import React, { useEffect } from "react";
import { useVideosContext } from "../../context/VideosContext";
import watchLaterStyle from "../history/history.module.css";
import axios from "axios";

import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useToastContext } from "../../context/ToastContext";

export const WatchLater = () => {
  const {
    state: { watchLater, videos, history },
    dispatch,
  } = useVideosContext();
  const { auth } = useAuthContext();
  const { toast, runToast } = useToastContext();

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          "https://clink-player-backend.herokuapp.com/watchLater",
          { headers: { authorization: auth } }
        );
        if (response?.data?.success === true) {
          dispatch({
            type: "UPLOAD-WATCH-LATER",
            payload: response?.data?.watchLater,
          });
          // console.log({ response });
        }
      } catch (err) {
        console.log({ err });
      }
    })();
  }, []);
  return (
    <div className={watchLaterStyle.container}>
      <h1 className={watchLaterStyle.title}>Watch When You're Free!</h1>
      <div className={watchLaterStyle.grid}>
        {watchLater?.map(({ _id, name, thumbnail, intro, channel }) => (
          <div className={watchLaterStyle.main} key={_id}>
            {" "}
            <Link
              to={`/watch/${name}`}
              className={watchLaterStyle.link}
              key={_id}
              onClick={() => {
                if (history?.find((vid) => vid.name === name)) {
                  return dispatch({
                    type: "CHANGE-HISTORY",
                    payload: videos?.find((vid) => vid.name === name),
                  });
                }
                dispatch({
                  type: "HISTORY",
                  payload: videos?.find((video) => video._id === _id),
                });
              }}
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
                dispatch({ type: "REMOVE-FROM-WATCH-LATER", payload: name });
                try {
                  const response = await axios.delete(
                    `https://clink-player-backend.herokuapp.com/watchLater/${_id}`,
                    { headers: { authorization: auth } }
                  );
                  if (response) {
                    console.log(response.data.message);
                    runToast(toast.success, response?.data?.message);
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
