/* eslint-disable react/prop-types */
export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track);
  }
  const artistNames = track.artists.map((artist) => artist.name).join(", ");
  return (
    <div
      className="flex my-4 mx-2 items-center cursor-pointer hover:bg-[#2A2A2A]"
      onClick={handlePlay}
    >
      <img
        src={track.trackImgUrl}
        alt=""
        style={{ height: "64px", width: "64px" }}
        className="rounded-md"
      />
      <div className="ml-3">
        <div className="text-white font-semibold">{track.name}</div>
        <div className="text-[#B3B3B3] font-medium">{artistNames}</div>
      </div>
    </div>
  );
}
