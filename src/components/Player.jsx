/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import SpotifyWebPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(true);
  }, [trackUri]);
  if (!accessToken) return null;
  return (
    <div className="h-fit">
      <SpotifyWebPlayer
        token={accessToken}
        uris={trackUri ? [trackUri] : []}
        showSaveIcon
        callback={(state) => {
          if (!state.isPlaying) setPlay(false);
        }}
        play={play}
        magnifySliderOnHover={true}
        styles={{
          bgColor: "#000",
          color: "#EEEEEE",
          trackNameColor: "#fff",
          trackArtistColor: "#B3B3B3",
          sliderTrackColor: "#4D4D4D",
          sliderColor: "#1DB954",
          sliderHandleColor: "#EEEEEE",
        }}
      />
    </div>
  );
}
