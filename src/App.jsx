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
import { API_URL } from "./utilities";

function App() {
  const { auth } = useAuthContext();
  const { history, liked, dispatch } = useVideosContext();
  const { ToastContainer } = useToastContext();

  const fetchVideos = async () => {
    try {
      const response = await axios.get(`${API_URL}videos`);
      dispatch({ type: "UPLOAD-VIDEOS", payload: response?.data?.videos });
    } catch (err) {
      console.log({ err });
    }
  };

  const fetchUserData = async (params, actionType, isResponseDataArray) => {
    console.log("APP", `${API_URL}${params}`);
    try {
      const response = await axios.get(`${API_URL}${params}`, {
        headers: { authorization: auth },
      });
      console.log({ response });
      console.log({
        params,
        response,
        check: isResponseDataArray
          ? response?.data[0][params]
            ? response?.data[0][params]
            : []
          : response?.data[params],
      });
      dispatch({
        type: actionType,
        payload: isResponseDataArray
          ? response?.data[0][params]
            ? response?.data[0][params]
            : []
          : response?.data[params],
      });
      // console.log({ response });
    } catch (err) {
      console.log({ err });
    }
  };

  useEffect(() => {
    fetchVideos();
    if (auth) {
      fetchUserData("watchLater", "UPLOAD-WATCH-LATER", false);
      fetchUserData("playlist", "UPLOAD-PLAYLIST", true);
      fetchUserData("history", "UPLOAD-HISTORY", true);
      fetchUserData("likedVideos", "UPLOAD-LIKED-VIDEOS", false);

      // (async function () {
      //   try {
      //     const response = await axios.get(`${API_URL}watchLater`, {
      //       headers: { authorization: auth },
      //     });
      //     dispatch({
      //       type: "UPLOAD-WATCH-LATER",
      //       payload: response?.data?.watchLater,
      //     });
      //     // console.log({ response });
      //   } catch (err) {
      //     console.log({ err });
      //   }
      // })();

      // (async function () {
      //   try {
      //     const response = await axios.get(`${API_URL}playlist`, {
      //       headers: { authorization: auth },
      //     });
      //     if (response) {
      //       dispatch({
      //         type: "UPLOAD-PLAYLIST",
      //         payload: response?.data[0]?.playlist
      //           ? response.data[0].playlist
      //           : [],
      //       });
      //       // console.log(response);
      //     }
      //   } catch (err) {
      //     console.log({ err });
      //   }
      // })();
      // (async function () {
      //   try {
      //     const response = await axios.get(`${API_URL}history`, {
      //       headers: { authorization: auth },
      //     });
      //     console.log("HISTORY", { response });
      //     if (response) {
      //       dispatch({
      //         type: "UPLOAD-HISTORY",
      //         payload: response?.data[0]?.history
      //           ? response?.data[0]?.history
      //           : [],
      //       });
      //     }
      //     // console.log({ response });
      //   } catch (err) {
      //     console.log({ err });
      //   }
      // })();
      // (async function () {
      //   try {
      //     const response = await axios.get(`${API_URL}likedVideos`, {
      //       headers: { authorization: auth },
      //     });
      //     console.log("APP", response);
      //     dispatch({
      //       type: "UPLOAD-LIKED-VIDEOS",
      //       payload: response?.data?.likedVideos,
      //     });
      //     // console.log(response);
      //   } catch (err) {
      //     console.log({ err });
      //   }
      // })();
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

        <Route
          path="/likedVideos"
          element={<PrivateRoute auth={auth} path="/likedVideos" />}
        >
          <Route path="/likedVideos" element={<LikedVideos />} />
        </Route>
        <Route
          path="/history"
          element={<PrivateRoute auth={auth} path="/history" />}
        >
          <Route path="/history" element={<History />} />
        </Route>
        <Route
          path="/playlist"
          element={<PrivateRoute auth={auth} path="/playlist" />}
        >
          <Route path="/playlist" element={<MainPlaylist />} />
        </Route>

        <Route
          path="/watchLater"
          element={<PrivateRoute auth={auth} path="/watchLater" />}
        >
          <Route path="/watchLater" element={<WatchLater />} />
        </Route>
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
