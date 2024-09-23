import { useContext, useEffect } from "react";
import { UserContext } from "../store/UserContext.jsx";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import SpotifyWebApi from "spotify-web-api-node";
import UserDisplay from "../components/UserDisplay.jsx";

/* eslint-disable no-unused-vars */
const spotifyApi = new SpotifyWebApi({
  clientId: "4d18e3d9aba346ca9c1c6bf836e56a55",
});
export default function UserHome() {
  const code = useLoaderData();
  const fetchedAccessToken = useAuth(code);
  const {
    setAccessToken,
    accessToken,
    userDetails,
    userPlaylists,
    setUserPlaylists,
    topArtists,
    topTracks,
    setUserDetails,
    setTopArtists,
    setTopTracks,
  } = useContext(UserContext);

  const navigate = useNavigate();
  useEffect(() => {
    setAccessToken(fetchedAccessToken);
  }, [fetchedAccessToken, setAccessToken]);

  useEffect(() => {
    if (!accessToken.accessToken) return;
    spotifyApi.setAccessToken(accessToken.accessToken);
  }, [accessToken.accessToken]);

  useEffect(() => {
    if (!accessToken.accessToken) return;
    spotifyApi
      .getMe()
      .then((res) => {
        const largestImage = res.body.images.reduce((largest, image) => {
          if (image.height < largest.height) return largest;
          return image;
        }, res.body.images[0]);
        setUserDetails({
          country: res.body.country,
          displayName: res.body.display_name,
          email: res.body.email,
          followers: res.body.followers.total,
          isPremium: res.body.product === "premium",
          profileIconUrl: largestImage.url,
        });
      })
      .catch((error) => setUserDetails({}));
  }, [accessToken, setUserDetails]);

  // useEffect(() => {
  //   if (!userDetails.displayName) return;
  //   spotifyApi.getMySavedTracks().then((res) => console.log("hello"));
  // }, [userDetails]);

  useEffect(() => {
    if (!accessToken.accessToken) return;
    spotifyApi.getMyTopArtists().then((res) => {
      setTopArtists(
        res.body.items.map((item) => {
          const smallestArtistImage = item.images.reduce((smallest, image) => {
            if (image.height > smallest.height) return smallest;
            return image;
          }, item.images[0]);
          return {
            name: item.name,
            type: item.type,
            artistImageUrl: smallestArtistImage.url,
          };
        })
      );
    });
    spotifyApi.getMyTopTracks().then((res) => {
      setTopTracks(
        res.body.items.map((item, index) => {
          const smallestImg = item.album.images.reduce((smallest, image) => {
            if (image.height > smallest.height) return smallest;
            return image;
          }, item.album.images[0]);

          return {
            name: item.name,
            explicit: item.explicit,
            artists: item.artists,
            albumName: item.album.name,
            duration: item.duration_ms,
            trackImgUrl: smallestImg.url,
            uri: item.uri,
          };
        })
      );
    });

    spotifyApi.getUserPlaylists().then((res) => {
      setUserPlaylists(
        res.body.items.map((playlist) => {
          const smallestImg = playlist.images.reduce((smallest, image) => {
            if (image.height > smallest.height) return smallest;
            return image;
          }, playlist.images[0]);

          const largestImg = playlist.images.reduce((largest, image) => {
            if (image.height > largest.height) return image;
            return largest;
          }, playlist.images[0]);
          return {
            playlistId: playlist.id,
            imageUrl: smallestImg.url,
            largeImgUrl: largestImg.url,
            name: playlist.name,
            owner: playlist.owner.display_name,
            description: playlist.description,
            totalSongs: playlist.tracks.total,
          };
        })
      );
    });
  }, [accessToken, setTopArtists, setTopTracks, setUserPlaylists]);

  return (
    <>
      <UserDisplay
        imageUrl={userDetails.profileIconUrl}
        displayName={userDetails.displayName}
        totalFollowers={userDetails.followers}
        topArtists={topArtists}
        topTracks={topTracks}
      />
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ request, params }) {
  const code = new URL(request.url).searchParams.get("code");
  if (code) {
    window.history.pushState({}, null, "/");
    return code;
  } else {
    return redirect("/user/home");
  }
}
