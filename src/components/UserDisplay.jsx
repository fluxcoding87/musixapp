/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { MdPerson } from "react-icons/md";
import ArtistView from "./ArtistView";
import TopTrackView from "./TopTrackView";

export default function UserDisplay({
  imageUrl,
  displayName,
  totalFollowers,
  topArtists,
  topTracks,
}) {
  return (
    <div className="w-[75%] overflow-y-auto">
      <div className="h-[40%] px-8 pt-10 bg-gradient-to-b from-[#6B3C34] to-[#361E1A] flex items-center justify-start gap-4 rounded-t-lg">
        <img
          src={imageUrl}
          alt="user image"
          className="rounded-full h-[80%] shadow-[0_0px_40px_12px_rgba(0,0,0,0.3)]"
        />
        <div className="flex flex-col justify-center text-white gap-2">
          <p className="font-semibold text-[#F4FFFF]">Profile</p>
          <h2 className="text-8xl font-extrabold">{displayName}</h2>
          <p className="pt-5">{totalFollowers} Followers</p>
        </div>
      </div>
      <div className="px-8 pt-8 bg-gradient-to-b from-[#2B1815] to-black flex flex-col gap-16">
        <div>
          <h3 className="text-white font-bold text-2xl">
            Top artists this month
          </h3>
          <ul className="list-none flex gap-8 mt-8">
            {topArtists.map((artist, index) => {
              if (index > 4) return;
              return (
                <ArtistView
                  key={artist.name}
                  artistImageUrl={artist.artistImageUrl}
                  artistName={artist.name}
                  artistType={artist.type}
                />
              );
            })}
          </ul>
        </div>
        <div>
          <h3 className="text-white font-bold text-2xl">
            Top Tracks this month
          </h3>
          <ul className="mt-6">
            {topTracks.map((track, index) => {
              if (index > 9) return;
              return (
                <TopTrackView
                  key={index}
                  {...track}
                  track={track}
                  trackNumber={index + 1}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
