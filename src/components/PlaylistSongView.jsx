import { useContext } from "react";
import { UserContext } from "../store/UserContext";
import TopTrackView from "./TopTrackView";
export default function PlaylistSongView() {
  const { activePlaylistTracks } = useContext(UserContext);
  return (
    <ul className="px-4 py-2">
      {activePlaylistTracks.map((track, index) => (
        <TopTrackView
          key={`track.id` + index}
          {...track}
          track={track}
          trackNumber={index + 1}
        />
      ))}
    </ul>
  );
}
