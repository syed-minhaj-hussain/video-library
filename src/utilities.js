export const reducerFunc = (state, action) => {
  switch (action.type) {
    case "UPLOAD-VIDEOS":
      return { ...state, videos: action.payload };
    case "UPLOAD-LIKED-VIDEOS":
      return { ...state, liked: action.payload };
    case "UPLOAD-WATCH-LATER":
      return { ...state, watchLater: action.payload };
    case "UPLOAD-HISTORY":
      return { ...state, history: action.payload };
    case "UPLOAD-PLAYLIST":
      return { ...state, playlist: action.payload };

    case "HISTORY":
      return { ...state, history: [action.payload, ...state.history] };

    case "CHANGE-HISTORY":
      return {
        ...state,
        history: [
          action.payload,
          ...state.history.filter((vid) => vid._id !== action.payload._id),
        ],
      };

    case "REMOVE-FROM-HISTORY":
      return {
        ...state,
        history: state.history.filter((vid) => vid._id !== action.payload),
      };

    case "CREATE-NEW-PLAYLIST":
      return { ...state, playlist: [action.payload, ...state.playlist] };

    case "LIKE":
      return { ...state, liked: [...state?.liked, action.payload] };

    case "WATCH-LATER":
      return { ...state, watchLater: [...state.watchLater, action.payload] };

    case "REMOVE-FROM-LIKED":
      return {
        ...state,
        liked: state?.liked?.filter((vid) => vid.name !== action.payload),
      };

    case "REMOVE-FROM-WATCH-LATER":
      return {
        ...state,
        watchLater: state?.watchLater?.filter(
          (vid) => vid.name !== action.payload
        ),
      };
    case "GET-LIST-BY-ID":
      return {
        ...state,
        playlist: state.playlist.map((pList) =>
          pList.id === action.payload.list.id
            ? {
                ...action.payload.list,
                videos: action.playload?.list?.videos.find(
                  (vid) => vid._id === action.payload.video._id
                )
                  ? [...action.payload.list.videos]
                  : [...action.payload.list.videos, action.payload.video],
              }
            : pList
        ),
      };
    case "REMOVE-FROM-PLAYLIST":
      return {
        ...state,
        playlist: state.playlist.map((list) =>
          list.name === action.payload.name
            ? {
                ...action.payload.list,
                videos: action.payload.list.videos.filter(
                  (vid) => vid._id !== action.payload._id
                ),
              }
            : list
        ),
      };
    case "DELETE-PLAYLIST":
      return {
        ...state,
        playlist: state.playlist?.filter(
          (list) => list.name !== action.payload
        ),
      };
    case "PLAYLIST-UPDATED":
      return { ...state, playlist: action.payload };

    case "LIKED-UPDATED":
      return { ...state, liked: action.payload };

    case "WATCH-LATER-UPDATED":
      return { ...state, watchLater: action.payload };

    case "HISTORY-UPDATED":
      return { ...state, history: action.payload };
    case "CHANGE-HISTORY-UPDATED":
      return { ...state, history: action.payload };

    default:
      return state;
  }
};
