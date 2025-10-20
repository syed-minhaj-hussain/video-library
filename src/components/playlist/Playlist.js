import React, { useState } from "react";
import { useVideosContext } from "../../context/VideosContext";
import playStyle from "./playlist.module.css";
import { v4 as uuidv4 } from "uuid";
import { TiDelete } from "react-icons/ti";

export const Playlist = ({ video, id, setShow }) => {
  const [text, setText] = useState("");
  const {
    state: { playlist },
    dispatch,
  } = useVideosContext();

  // console.log({ playlist });

  return (
    <div className={playStyle.list}>
      <TiDelete
        className={playStyle.del}
        onClick={() => setShow((prev) => !prev)}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // setValue(text);
          if (text !== "") {
            dispatch({
              type: "CREATE-NEW-PLAYLIST",
              payload: { id: uuidv4(), name: text, videos: [] },
            });
          }
          setText("");
        }}
      >
        <label htmlFor="playlist">
          Enter Playlist Name : <br />
          <input
            type="text"
            name="playlist"
            id="playlist"
            className={playStyle.input}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <input type="submit" value="Create" className={playStyle.submit} />
      </form>
      <h2>Avaliable playlist</h2>
      {playlist?.map((list) => (
        <div
          key={list.id}
          style={{
            padding: "0.25rem",
            backgroundColor: "#000",
            margin: "0.1rem",
          }}
        >
          <p style={{ fontSize: "1.5rem", fontWeight: "400" }}>
            {" "}
            {list?.name} &nbsp;&nbsp;&nbsp;{" "}
            <button
              onClick={() => {
                dispatch({
                  type: "GET-LIST-BY-ID",
                  payload: { list, video },
                });
                // console.log({ list });
              }}
              disabled={
                list.videos.find((vid) => vid._id === id) ? true : false
              }
              style={{
                padding: "0.2rem 1rem",
                fontSize: "1rem",
                fontWeight: "600",
                color: "#000",
                float: "right",
              }}
            >
              {list.videos.find((vid) => vid._id === id) ? "Added" : "ADD"}
            </button>
          </p>
        </div>
      ))}
    </div>
  );
};
