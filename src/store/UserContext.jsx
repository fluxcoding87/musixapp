/* eslint-disable react/prop-types */
import { createContext, useCallback, useReducer, useState } from "react";

export const UserContext = createContext({
  accessToken: undefined,
  search: "",
  isCode: false,
  playingTrack: {},
  setPlayingTrack: () => {},
  setIsCode: () => {},
  setAccessToken: () => {},
  setSearch: () => {},
});

function codeReducer(state, action) {
  if (action.type === "SET") {
    return {
      ...state,
      accessToken: action.payload,
    };
  }
}
function searchReducer(state, action) {
  if (action.type === "SET_SEARCH") {
    return action.payload;
  }
}

export default function UserContextProvider({ children }) {
  const [accessToken, setAccessTokenDispatch] = useReducer(codeReducer, {
    accessToken: undefined,
  });
  const [search, setSearchDispatch] = useReducer(searchReducer, "");
  const [playingTrack, setPlayingTrack] = useState();
  const [userDetails, setUserDetails] = useState({});
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [activePlaylistTracks, setActivePlaylistTracks] = useState([]);
  const [activePlaylist, setActivePlaylist] = useState({});
  const setAccessToken = useCallback(function setAccessToken(accessToken) {
    setAccessTokenDispatch({ type: "SET", payload: accessToken });
  }, []);

  const setSearch = (value) => {
    setSearchDispatch({
      type: "SET_SEARCH",
      payload: value,
    });
  };

  const ctxValue = {
    accessToken,
    setAccessToken,
    playingTrack,
    search,
    userDetails,
    topArtists,
    topTracks,
    userPlaylists,
    activePlaylist,
    activePlaylistTracks,
    setActivePlaylistTracks,
    setActivePlaylist,
    setUserPlaylists,
    setUserDetails,
    setTopArtists,
    setTopTracks,
    setPlayingTrack,
    setSearch,
  };

  return (
    <UserContext.Provider value={ctxValue}>{children}</UserContext.Provider>
  );
}
