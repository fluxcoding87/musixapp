import axios from "axios";
import { useContext, useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult.jsx";
import { UserContext } from "../store/UserContext.jsx";
const spotifyApi = new SpotifyWebApi({
  clientId: "4d18e3d9aba346ca9c1c6bf836e56a55",
});

export default function UserSearch() {
  const { search, accessToken, setSearch, playingTrack, setPlayingTrack } =
    useContext(UserContext);
  const [searchResults, setSearchResults] = useState([]);
  const [lyrics, setLyrics] = useState("");
  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  }

  useEffect(() => {
    if (!playingTrack) return;

    axios
      .get("https://musixapp-api.onrender.com/lyrics", {
        params: {
          track: playingTrack.name,
          artist: playingTrack.artists[0],
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken.accessToken) return;
    spotifyApi.setAccessToken(accessToken.accessToken);
  }, [accessToken.accessToken]);
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken.accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          return {
            artists: track.artists,
            explicit: track.explicit,
            name: track.name,
            uri: track.uri,
            trackImgUrl: smallestAlbumImage.url,
          };
        })
      );
    });
    return () => (cancel = true);
  }, [search, accessToken.accessToken]);
  return (
    <div className="w-[75%] ml-auto mr-2 overflow-y-auto bg-black rounded-md px-4">
      {searchResults.map((track) => (
        <TrackSearchResult
          track={track}
          key={track.uri}
          chooseTrack={chooseTrack}
        />
      ))}
      {searchResults.length === 0 ? (
        <div className="text-center whitespace-pre text-white font-semibold">
          {lyrics ? lyrics : "Loading...."}
        </div>
      ) : (
        "Search Something"
      )}
    </div>
  );
}
