import { createContext, useReducer, useContext, useEffect } from "react";
import { API_URL, reducerFunc } from "../utilities";
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

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(state.history));
  }, [state.history]);

  useEffect(() => {
    if (auth) {
      (async function () {
        console.log("HISTORT_POST", { state });
        try {
          const response = await axios.post(
            `${API_URL}history`,
            state?.history,
            { headers: { authorization: auth } }
          );
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
            `${API_URL}playlist`,
            state?.playlist,
            { headers: { authorization: auth } }
          );
          if (response) {
            console.log({ response });
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
