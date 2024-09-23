/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { MdExplicit } from "react-icons/md";
import { UserContext } from "../store/UserContext";
function msToMinutesSeconds(ms) {
  let totalSeconds = Math.floor(ms / 1000);
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return minutes + ":" + seconds;
}

export default function TopTrackView({
  name,
  explicit,
  artists,
  albumName,
  duration,
  trackImgUrl,
  trackNumber,
  trackUri,
  track,
}) {
  const artistNames = artists.map((artist) => artist.name).join(", ");
  const { setPlayingTrack } = useContext(UserContext);
  function chooseTrack() {
    setPlayingTrack(track);
  }
  return (
    <li
      className="py-3 flex items-center justify-between rounded-md hover:bg-[#2A2A2A] hover:cursor-pointer"
      onClick={chooseTrack}
    >
      <p className="text-md font-normal text-[#B3B3B3] mr-4">{trackNumber}</p>
      <div className="text-white flex items-center gap-3 flex-grow">
        <img
          src={trackImgUrl}
          alt="trackImage"
          className="h-14 w-14 rounded-md"
        />
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm font-medium text-[#B3B3B3] flex items-center justify-start gap-[1px]">
            {explicit && (
              <span className="text-[1.15rem]">
                <MdExplicit />
              </span>
            )}
            {artistNames}
          </p>
        </div>
      </div>
      <div className="min-h-full w-[35%]">
        <p className="text-sm font-medium text-[#B3B3B3]">{albumName}</p>
      </div>
      <p className="text-sm font-medium text-[#B3B3B3] mr-8">
        {msToMinutesSeconds(duration)}
      </p>
    </li>
  );
}
