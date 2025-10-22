import { useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/lazy";
import axios from "axios";
import { AiFillEye, AiFillLike } from "react-icons/ai";
import { FaListAlt } from "react-icons/fa";
import { MdWatchLater } from "react-icons/md";
import videoStyle from "./video.module.css";
import { useVideosContext } from "../../context/VideosContext";
import { useAuthContext } from "../../context/AuthContext";
import { Playlist } from "../playlist/Playlist";
import { useToastContext } from "../../context/ToastContext";
import { API_URL } from "../../utilities";

export const VideoPlayer = () => {
  const [show, setShow] = useState(false);
  const { auth } = useAuthContext();
  const {
    state: { videos, liked, watchLater },
    dispatch,
  } = useVideosContext();
  const { toast, runToast } = useToastContext();
  const { name } = useParams();

  const decodedName = decodeURIComponent(name);

  const findVideoById = videos?.find((video) => video?.name === decodedName);
  const isVideoLiked = liked?.find((vid) => vid?.name === findVideoById?.name);
  const isVideoInWatchLater = watchLater?.find(
    (vid) => vid?.name === decodedName
  );

  const likedVideoData = {
    name: findVideoById?.name,
    duration: findVideoById?.duration,
    url: findVideoById?.url,
    channel: findVideoById?.channel,
    logo: findVideoById?.logo,
    thumbnail: findVideoById?.thumbnail,
    intro: findVideoById?.intro,
    verified: findVideoById?.verified,
    videoId: findVideoById?._id,
  };

  const watchLaterVideoData = {
    name: findVideoById?.name,
    duration: findVideoById?.duration,
    url: findVideoById?.url,
    channel: findVideoById?.channel,
    logo: findVideoById?.logo,
    thumbnail: findVideoById?.thumbnail,
    intro: findVideoById?.intro,
    verified: findVideoById?.verified,
    watchLaterId: findVideoById?._id,
  };

  const handleWatchLaterSubmit = async () => {
    if (isVideoInWatchLater) {
      dispatch({
        type: "REMOVE-FROM-WATCH-LATER",
        payload: findVideoById?.name,
      });
      try {
        const response = await axios.delete(
          `${API_URL}watchLater/${isVideoInWatchLater._id}`,
          { headers: { authorization: auth } }
        );
        if (response) {
          runToast(toast.success, response?.data?.message);
        }
      } catch (err) {
        console.log({ err });
      }
      return console.log("Already In List");
    }

    try {
      const response = await axios.post(
        `${API_URL}watchLater`,
        watchLaterVideoData,
        { headers: { authorization: auth } }
      );
      if (response) {
        dispatch({
          type: "WATCH-LATER",
          payload: response.data?.saveItemCreated,
        });
        runToast(toast.success, response?.data?.message);
      }
    } catch (err) {
      console.log({ err });
    }
  };

  const handleLikeButtonPress = async () => {
    const isLiked = liked?.find((vid) => vid?.name === findVideoById?.name);

    if (isLiked) {
      dispatch({
        type: "REMOVE-FROM-LIKED",
        payload: findVideoById?.name,
      });
      try {
        const response = await axios.delete(
          `${API_URL}likedVideos/${isLiked._id}`,
          { headers: { authorization: auth } }
        );
        if (response?.data?.success === true) {
          runToast(toast.success, response?.data?.message);
        }
      } catch (err) {
        console.log({ deleteErr: err });
      }
      return console.log("VIDEO-ALREADY-LIKED");
    }

    try {
      const response = await axios.post(
        `${API_URL}likedVideos`,
        likedVideoData,
        { headers: { authorization: auth } }
      );
      if (response?.data?.success === true) {
        dispatch({
          type: "LIKE",
          payload: response.data?.saveItemCreated,
        });
        runToast(toast.success, response?.data?.message);
      }
    } catch (err) {
      console.log({ postErr: err });
    }
  };

  return (
    <div className={videoStyle.container}>
      <div className={videoStyle.wrapper}>
        <ReactPlayer
          url={findVideoById?.url}
          playing
          controls
          width="100%"
          height="100%"
          className={videoStyle.player}
        />
      </div>
      <>
        <div className={videoStyle.videoBody}>
          <>
            <p className={videoStyle.title}>{findVideoById?.name}</p>
          </>

          <div className={videoStyle.subTitle}>
            <div className={videoStyle.left}>
              15k <AiFillEye /> | 1 month ago
            </div>
            {auth && (
              <div className={videoStyle.right}>
                <span className={videoStyle.icons}>
                  <button
                    className={videoStyle.btn}
                    onClick={handleLikeButtonPress}
                  >
                    <AiFillLike
                      style={{ color: `${isVideoLiked ? "red" : "#fff"}` }}
                    />
                  </button>
                </span>
                <span className={videoStyle.icons}>
                  <button
                    className={videoStyle.btn}
                    onClick={handleWatchLaterSubmit}
                  >
                    <MdWatchLater
                      style={{
                        color: `${isVideoInWatchLater ? "red" : "#fff"}`,
                      }}
                    />
                  </button>
                </span>
                <span className={videoStyle.icons}>
                  <button
                    className={videoStyle.btn}
                    onClick={() => setShow((prev) => !prev)}
                  >
                    <FaListAlt />
                  </button>
                </span>
              </div>
            )}
          </div>
        </div>
      </>
      <div
        style={{ display: `${show ? "block" : "none"}` }}
        className={videoStyle.list}
      >
        <Playlist
          setShow={setShow}
          video={findVideoById}
          id={findVideoById?._id}
          name={decodedName}
        />
      </div>
    </div>
  );
};
