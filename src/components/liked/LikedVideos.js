import React, { useEffect } from "react";
import { useVideosContext } from "../../context/VideosContext";
import likedStyle from "../history/history.module.css";
import axios from "axios";
import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useToastContext } from "../../context/ToastContext";
import { Spinner } from "../home/Spinner";

export const LikedVideos = () => {
  const {
    state: { liked },
    dispatch,
  } = useVideosContext();
  const { auth } = useAuthContext();
  const { toast, runToast } = useToastContext();

  useEffect(() => {
    (async function () {
      if (auth) {
        try {
          const response = await axios.get(
            "https://clink-player-backend.herokuapp.com/likedVideos",
            { headers: { authorization: auth } }
          );
          if (response?.data?.success === true) {
            // console.log("Like Updated");
            dispatch({
              type: "UPLOAD-LIKED-VIDEOS",
              payload: response?.data?.likedVideo,
            });
          }
        } catch (err) {
          console.log({ likedErr: err });
        }
      }
    })();
  }, []);
  return (
    <div className={likedStyle.container}>
      <h1 className={likedStyle.title}>Videos You've Liked!</h1>
      {liked?.length < 1 && <Spinner />}
      <div className={likedStyle.grid}>
        {liked?.map(({ _id, videoId, thumbnail, intro, channel, name }) => (
          <div className={likedStyle.main} key={_id}>
            {" "}
            <Link to={`/watch/${name}`} className={likedStyle.link} key={_id}>
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
                dispatch({ type: "REMOVE-FROM-LIKED", payload: name });
                try {
                  const response = await axios.delete(
                    `https://clink-player-backend.herokuapp.com/likedVideos/${_id}`,
                    { headers: { authorization: auth } }
                  );
                  if (response?.data?.success === true) {
                    // console.log(response.data.message);
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
