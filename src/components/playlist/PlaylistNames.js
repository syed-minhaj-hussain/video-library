import React from "react";
import { useVideosContext } from "../../context/VideosContext";
import nameStyle from "./playlist.module.css";

import { TiDelete } from "react-icons/ti";

export const PlaylistNames = ({ setName, name }) => {
  const {
    state: { playlist },
    dispatch,
  } = useVideosContext();
  return (
    <>
      {playlist.map(({ id, name: pName }) => (
        <button
          key={id}
          className={nameStyle.listBtn}
          onClick={() => setName(pName)}
          style={{
            backgroundColor: `${name === pName ? "red" : "#fff"}`,
            color: `${name === pName ? "#fff" : "#000"}`,
          }}
        >
          {pName}
          <TiDelete
            className={nameStyle.delete}
            onClick={() =>
              dispatch({ type: "DELETE-PLAYLIST", payload: pName })
            }
          />
        </button>
      ))}
    </>
  );
};
