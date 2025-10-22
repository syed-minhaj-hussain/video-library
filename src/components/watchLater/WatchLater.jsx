import { useEffect } from "react";
import { useVideosContext } from "../../context/VideosContext";
import watchLaterStyle from "../history/history.module.css";
import axios from "axios";

import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useToastContext } from "../../context/ToastContext";
import { API_URL } from "../../utilities";

export const WatchLater = () => {
  const {
    state: { watchLater, videos, history },
    dispatch,
  } = useVideosContext();
  const { auth } = useAuthContext();
  const { toast, runToast } = useToastContext();

  const fetchWatchLater = async () => {
    try {
      const response = await axios.get(`${API_URL}watchLater`, {
        headers: { authorization: auth },
      });
      if (response?.data?.success === true) {
        dispatch({
          type: "UPLOAD-WATCH-LATER",
          payload: response?.data?.watchLater,
        });
      }
    } catch (err) {
      console.log({ err });
    }
  };

  const handleWatchHistory = (name) => {
    const getVideo = (video) => video.name === name;
    if (history?.find(getVideo)) {
      return dispatch({
        type: "CHANGE-HISTORY",
        payload: videos?.find(getVideo),
      });
    }
    dispatch({
      type: "HISTORY",
      payload: videos?.find(getVideo),
    });
  };

  const removeFromWatchLater = async (_id, name) => {
    dispatch({ type: "REMOVE-FROM-WATCH-LATER", payload: name });
    try {
      const response = await axios.delete(`${API_URL}watchLater/${_id}`, {
        headers: { authorization: auth },
      });
      if (response) {
        console.log(response.data.message);
        runToast(toast.success, response?.data?.message);
      }
    } catch (err) {
      console.log({ err });
    }
  };

  useEffect(() => {
    fetchWatchLater();
  }, []);

  return (
    <div className={watchLaterStyle.container}>
      <h1 className={watchLaterStyle.title}>Watch When You're Free!</h1>
      <div className={watchLaterStyle.grid}>
        {watchLater?.map(({ _id, name, thumbnail, intro, channel }) => (
          <div className={watchLaterStyle.main} key={_id}>
            {" "}
            <Link
              to={`/watch/${encodeURIComponent(name)}`}
              className={watchLaterStyle.link}
              key={_id}
              onClick={() => handleWatchHistory(name)}
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
              onClick={() => removeFromWatchLater(_id, name)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
