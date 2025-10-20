import React from "react";
import homeStyle from "./home.module.css";
import { GoVerified } from "react-icons/go";
import { ImSpinner } from "react-icons/im";
import { useVideosContext } from "../../context/VideosContext";
import { Link } from "react-router-dom";
import { Spinner } from "./Spinner";

export const Home = () => {
  const {
    state: { videos, history },
    dispatch,
  } = useVideosContext();

  return (
    <div className={homeStyle.container}>
      {!videos && <Spinner />}
      <div className={homeStyle.grid}>
        {videos?.map(
          ({
            _id,
            logo,
            name,
            channel,
            thumbnail,
            verified,
            intro,
            duration,
          }) => (
            <Link
              key={_id}
              to={`/watch/${name}`}
              className={homeStyle.link}
              onClick={() => {
                if (history?.find((vid) => vid._id === _id)) {
                  return dispatch({
                    type: "CHANGE-HISTORY",
                    payload: videos?.find((vid) => vid._id === _id),
                  });
                }
                dispatch({
                  type: "HISTORY",
                  payload: videos?.find((video) => video._id === _id),
                });
              }}
            >
              <div className={homeStyle.card}>
                <figure style={{ position: "relative" }}>
                  <img
                    src={thumbnail}
                    alt="channel"
                    style={{ width: "100%" }}
                  />
                  <span className={homeStyle.duration}>{duration}</span>
                </figure>

                <div className={homeStyle.cardBody}>
                  <div className={homeStyle.cardHead}>
                    <figure>
                      <img src={logo} alt="channel" />
                    </figure>
                  </div>
                  <div className={homeStyle.cardText}>
                    <p>{intro}</p>
                    <p className={homeStyle.channel}>
                      {channel} &nbsp;
                      {verified && (
                        <GoVerified
                          style={{ position: "absolute", top: "0.12rem" }}
                        />
                      )}
                    </p>{" "}
                  </div>
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
};
