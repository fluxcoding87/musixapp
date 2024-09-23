import { useContext } from "react";
import { MdLibraryMusic } from "react-icons/md";
import { UserContext } from "../store/UserContext";
import { Link } from "react-router-dom";
export default function SideNavigation() {
  const { userPlaylists, setActivePlaylist } = useContext(UserContext);

  function handleSetActivePlaylist(playlist) {
    setActivePlaylist({
      imageUrl: playlist.largeImgUrl,
      name: playlist.name,
      owner: playlist.owner,
      description: playlist.description,
      total: playlist.totalSongs,
    });
  }
  return (
    <div className="w-[25%] text-white px-8 py-4 overflow-y-auto flex flex-col gap-8">
      <div className="flex items-center gap-2 font-semibold text-[#b9b9b9] hover:text-white hover:cursor-pointer transition-all duration-500 text-lg">
        <MdLibraryMusic className="text-2xl" />
        <p>Your Playlists</p>
      </div>
      <div>
        <ul className="flex flex-col">
          {userPlaylists.map((playlist) => (
            <li
              key={playlist.playlistId}
              onClick={() => handleSetActivePlaylist(playlist)}
            >
              <Link
                to={`/user/playlist?id=${playlist.playlistId}`}
                className="flex gap-3 hover:bg-[#2A2A2A] hover:cursor-pointer rounded-md py-2"
              >
                <img
                  src={playlist.imageUrl}
                  alt="playlistImage"
                  className="h-[3.5rem] w-[3.5rem] rounded-md"
                />
                <div>
                  <p className="font-semibold text-[#dddddd]">
                    {playlist.name}
                  </p>
                  <p className="text-[#9a9a9a] font-medium">{playlist.owner}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
