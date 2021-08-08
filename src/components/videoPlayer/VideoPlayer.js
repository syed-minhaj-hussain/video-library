import React from "react";
import videoStyle from "./video.module.css";
import ReactPlayer from "react-player/lazy";
import { useParams } from "react-router-dom";
import { useVideosContext } from "../../context/VideosContext";
import { AiFillEye, AiFillLike } from "react-icons/ai";
import { MdWatchLater } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";

export const VideoPlayer = () => {
  const {
    state: { videos, liked, playlist, watchLater },
    dispatch,
  } = useVideosContext();
  const { id } = useParams();

  console.log({ id });
  const findVideoUrlById = videos?.find((video) => video.id === Number(id));
  // console.log(findVideoUrlById);
  return (
    <div className={videoStyle.container}>
      <div className={videoStyle.wrapper}>
        <ReactPlayer
          url={findVideoUrlById?.url}
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
            <p className={videoStyle.title}>{findVideoUrlById?.name}</p>
          </>

          <div className={videoStyle.subTitle}>
            <div className={videoStyle.left}>
              15k <AiFillEye /> | 1 month ago
            </div>
            <div className={videoStyle.right}>
              <span className={videoStyle.icons}>
                <button
                  className={videoStyle.btn}
                  onClick={() => {
                    if (liked?.find((vid) => vid.id === Number(id))) {
                      return console.log("VIDEO-ALREADY-LIKED");
                    }
                    dispatch({
                      type: "LIKE",
                      payload: videos?.find((vid) => vid.id === Number(id)),
                    });
                  }}
                >
                  <AiFillLike />
                </button>
              </span>
              <span className={videoStyle.icons}>
                <button
                  className={videoStyle.btn}
                  onClick={() => {
                    if (watchLater?.find((vid) => vid.id === Number(id))) {
                      return console.log("Already In List");
                    }
                    dispatch({
                      type: "WATCH-LATER",
                      payload: videos?.find((vid) => vid.id === Number(id)),
                    });
                  }}
                >
                  <MdWatchLater />
                </button>
              </span>
              <span className={videoStyle.icons}>
                <button className={videoStyle.btn}>
                  <FaListAlt />
                </button>
              </span>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};
