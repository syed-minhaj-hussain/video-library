import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import { Navbar } from "./components/nav/Navbar";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";
import { Home } from "./components/home/Home";
import { VideoPlayer } from "./components/videoPlayer/VideoPlayer";
import { PrivateRoute } from "./components/privateRoutes/PrivateRoute";
import { History } from "./components/history/History";
import { LikedVideos } from "./components/liked/LikedVideos";
import { MainPlaylist } from "./components/playlist/MainPlaylist";
import { WatchLater } from "./components/watchLater/WatchLater";
import { Footer } from "./components/footer/Footer";
import axios from "axios";
import { useVideosContext } from "./context/VideosContext";
import { useToastContext } from "./context/ToastContext";
import { Playlist } from "./components/playlist/Playlist";

function App() {
  const { auth } = useAuthContext();
  const { history, liked, playlist, watchLater, dispatch } = useVideosContext();
  const { ToastContainer } = useToastContext();
  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          "https://clink-player-backend.herokuapp.com/videos"
        );
        dispatch({ type: "UPLOAD-VIDEOS", payload: response?.data?.videos });
      } catch (err) {
        console.log({ err });
      }
    })();
    if (auth) {
      (async function () {
        try {
          const response = await axios.get(
            "https://clink-player-backend.herokuapp.com/watchLater",
            { headers: { authorization: auth } }
          );
          dispatch({
            type: "UPLOAD-WATCH-LATER",
            payload: response?.data?.watchLater,
          });
          // console.log({ response });
        } catch (err) {
          console.log({ err });
        }
      })();
      (async function () {
        try {
          const response = await axios.get(
            "https://clink-player-backend.herokuapp.com/playlist",
            { headers: { authorization: auth } }
          );
          if (response) {
            dispatch({
              type: "UPLOAD-PLAYLIST",
              payload: response?.data[0]?.playlist
                ? response.data[0].playlist
                : [],
            });
            // console.log(response);
          }
        } catch (err) {
          console.log({ err });
        }
      })();
      (async function () {
        try {
          const response = await axios.get(
            "https://clink-player-backend.herokuapp.com/history",
            { headers: { authorization: auth } }
          );
          if (response) {
            dispatch({
              type: "UPLOAD-HISTORY",
              payload: response?.data[0]?.history
                ? response?.data[0]?.history
                : [],
            });
          }
          // console.log({ response });
        } catch (err) {
          console.log({ err });
        }
      })();
      (async function () {
        try {
          const response = await axios.get(
            `https://clink-player-backend.herokuapp.com/likedVideos/`,
            { headers: { authorization: auth } }
          );
          // console.log("APP");
          dispatch({
            type: "UPLOAD-LIKED-VIDEOS",
            payload: response?.data?.likedVideo,
          });
          // console.log(response);
        } catch (err) {
          console.log({ err });
        }
      })();
    }
  }, [auth]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:name" element={<VideoPlayer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <PrivateRoute
          auth={auth}
          path="/likedVideos"
          element={<LikedVideos />}
        />
        <PrivateRoute auth={auth} path="/history" element={<History />} />
        <PrivateRoute auth={auth} path="/playlist" element={<MainPlaylist />} />
        <PrivateRoute auth={auth} path="/watchLater" element={<WatchLater />} />
      </Routes>
      <ToastContainer
        style={{ maxWidth: "400px" }}
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="colored"
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {history?.length < 6 && WatchLater?.length < 6 && liked?.length < 6 && (
        <Footer />
      )}
    </div>
  );
}

export default App;
