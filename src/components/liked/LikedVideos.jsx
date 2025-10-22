import { useEffect, useState } from "react";
import { useVideosContext } from "../../context/VideosContext";
import likedStyle from "../history/history.module.css";
import axios from "axios";
import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useToastContext } from "../../context/ToastContext";
import { Spinner } from "../home/Spinner";
import { API_URL } from "../../utilities";

export const LikedVideos = () => {
  const {
    state: { liked },
    dispatch,
  } = useVideosContext();
  const { auth } = useAuthContext();
  const { toast, runToast } = useToastContext();
  const [loading, setLoading] = useState(true);

  const fetchLikedVideos = async () => {
    if (auth) {
      try {
        const response = await axios.get(`${API_URL}likedVideos`, {
          headers: { authorization: auth },
        });
        if (response?.data?.success === true) {
          dispatch({
            type: "UPLOAD-LIKED-VIDEOS",
            payload: response?.data?.likedVideos,
          });
        }
      } catch (err) {
        console.log({ likedErr: err });
      }
    }
    setLoading(!loading);
  };

  const deleteLikedVideos = async (name, _id) => {
    dispatch({ type: "REMOVE-FROM-LIKED", payload: name });
    try {
      const response = await axios.delete(`${API_URL}likedVideos/${_id}`, {
        headers: { authorization: auth },
      });
      if (response?.data?.success === true) {
        runToast(toast.success, response?.data?.message);
      }
    } catch (err) {
      console.log({ err });
    }
  };

  console.log({ liked });

  useEffect(() => {
    fetchLikedVideos();
  }, [auth]);
  return (
    <div className={likedStyle.container}>
      <h1 className={likedStyle.title}>
        {loading
          ? "Loading!......"
          : liked?.length > 0
          ? "Videos You've Liked!"
          : "You don't have any Liked Videos"}
      </h1>
      {loading && <Spinner />}
      <div className={likedStyle.grid}>
        {liked?.map(({ _id, videoId, thumbnail, intro, channel, name }) => (
          <div className={likedStyle.main} key={_id}>
            <Link
              to={`/watch/${encodeURIComponent(name)}`}
              className={likedStyle.link}
              key={_id}
            >
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
              onClick={() => deleteLikedVideos(name, _id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
