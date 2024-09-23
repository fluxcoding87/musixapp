import { useContext, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";
import { UserContext } from "../store/UserContext";
import { FastAverageColor } from "fast-average-color";
import { LightenDarkenColor } from "../helperFunctions";
import PlaylistSongView from "../components/PlaylistSongView";

const spotifyApi = new SpotifyWebApi({
  clientId: "4d18e3d9aba346ca9c1c6bf836e56a55",
});
const fac = new FastAverageColor();

export default function UserPlaylistPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const img = useRef();
  const [activeColors, setActiveColors] = useState({});

  const { accessToken, activePlaylist, setActivePlaylistTracks } =
    useContext(UserContext);
  useEffect(() => {
    if (!accessToken.accessToken) return;
    spotifyApi.setAccessToken(accessToken.accessToken);
  }, [accessToken.accessToken]);

  useEffect(() => {
    if (!id) return;
    spotifyApi.getPlaylistTracks(id).then((res) => {
      setActivePlaylistTracks(
        res.body.items.map((item) => {
          const smallestImg = item.track.album.images.reduce(
            (smallest, image) => {
              if (image.height > smallest.height) return smallest;
              return image;
            },
            item.track.album.images[0]
          );

          return {
            name: item.track.name,
            explicit: item.track.explicit,
            artists: item.track.artists,
            albumName: item.track.album.name,
            duration: item.track.duration_ms,
            trackImgUrl: smallestImg.url,
            uri: item.track.uri,
            id: item.track.id,
          };
        })
      );
    });
  }, [id, setActivePlaylistTracks, activePlaylist]);

  useEffect(() => {
    fac.getColorAsync(activePlaylist.imageUrl).then((res) => {
      setActiveColors(() => {
        const secondColor = LightenDarkenColor(res.hex, 5);
        return {
          activeColor: res.hex,
          secondColor,
        };
      });
    });
  }, [activePlaylist.imageUrl]);

  return (
    <div className="text-gray-100 w-[75%] overflow-y-auto">
      <div
        className="flex items-center px-4 py-4 gap-4 rounded-t-md"
        style={{
          background: `linear-gradient(0deg, ${activeColors.secondColor}, ${activeColors.activeColor}) no-repeat`,
        }}
      >
        <img
          ref={img}
          src={activePlaylist.imageUrl}
          alt=""
          className="h-[15rem] w-[15rem] rounded-md shadow-[0_0px_40px_12px_rgba(0,0,0,0.4)]"
        />
        <div className="flex flex-col justify-end gap-3">
          <div>
            <p className="font-medium">Playlist</p>
            <p
              className="font-extrabold text-7xl"
              style={{
                fontSize: activePlaylist.name.length > 30 ? "2rem" : "4.5rem",
              }}
            >
              {activePlaylist.name}
            </p>
          </div>
          <p className="font-semibold text-sm text-gray-200">
            {activePlaylist.description}
          </p>
          <div className="flex items-center gap-1">
            <p className="text-white font-bold">{activePlaylist.owner}</p>
            <span className="h-[0.25rem] w-[0.25rem] rounded-full bg-white mt-1"></span>
            <p className="text-white font-medium">
              {activePlaylist.total} Songs
            </p>
          </div>
        </div>
      </div>
      <div>
        <PlaylistSongView />
      </div>
    </div>
  );
}
