import { createContext, useReducer, useContext, useEffect } from "react";
import { reducerFunc } from "../utilities";
import axios from "axios";
import { useAuthContext } from "./AuthContext";
import { useToastContext } from "./ToastContext";
const VideosContext = createContext();

export const VideosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunc, {
    liked: [],
    history: JSON.parse(localStorage.getItem("history")) || [],
    playlist: JSON.parse(localStorage.getItem("myPlaylist")) || [],
    watchLater: [],
    videos: null,
  });
  const { auth } = useAuthContext();
  const { toast } = useToastContext();
  useEffect(
    () => localStorage.setItem("myPlaylist", JSON.stringify(state.playlist)),
    [state.playlist]
  );
  // useEffect(() => {
  //   localStorage.setItem("history", JSON.stringify(state.history));
  // }, [state.history]);
  useEffect(() => {
    if (auth) {
      (async function () {
        try {
          const response = await axios.post(
            "https://clink-player-backend.herokuapp.com/history",
            state?.history,
            { headers: { authorization: auth } }
          );
          // console.log(response?.data?.savedHistory);
        } catch (err) {
          console.log({ err });
        }
      })();
    }
  }, [state?.history]);
  useEffect(() => {
    if (auth) {
      (async function () {
        try {
          const response = await axios.post(
            "https://clink-player-backend.herokuapp.com/playlist",
            state?.playlist,
            { headers: { authorization: auth } }
          );
          // console.log(response?.data?.savedPlaylist);
          if (response) {
            // console.log({ response });
          }
        } catch (err) {
          console.log({ err });
        }
      })();
    }
  }, [state?.playlist]);

  return (
    <VideosContext.Provider value={{ state, dispatch }}>
      {children}
    </VideosContext.Provider>
  );
};

export const useVideosContext = () => useContext(VideosContext);
