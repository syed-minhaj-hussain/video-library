import React, { useState } from "react";
import { useVideosContext } from "../../context/VideosContext";
import mainStyle from "./playlist.module.css";
import { PlaylistNames } from "./PlaylistNames";
import { PlaylistVideos } from "./PlaylistVideos";

export const MainPlaylist = () => {
  const {
    state: { playlist },
  } = useVideosContext();

  const getPlayListNames = playlist?.map(({ name }) => name);
  const [name, setName] = useState(getPlayListNames[0]);
  return (
    <div
      className={`${
        playlist?.length !== 0
          ? `${mainStyle.container}`
          : `${mainStyle.playListContainer}`
      }`}
    >
      {playlist?.length === 0 && (
        <h1
          style={{
            marginLeft: "42vw",
            color: "#fff",
            fontWeight: "180",
            marginTop: "1rem",
          }}
        >
          Your Playlists
        </h1>
      )}
      <PlaylistNames setName={setName} name={name} />
      <PlaylistVideos name={name} />
    </div>
  );
};
