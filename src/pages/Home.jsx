import { Link } from "react-router-dom";
const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=4d18e3d9aba346ca9c1c6bf836e56a55&response_type=code&redirect_uri=https://musixapp.onrender.com/user&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read%20playlist-read-private%20playlist-read-collaborative";

export default function HomePage() {
  return (
    <>
      <div className="min-h-dvh flex flex-col justify-center items-center bg-gradient-to-b from-neutral-700 to-neutral-950 text-center">
        <div className="mb-36">
          <h1 className="text-9xl text-gray-200 font-bold ">
            Welcome to MusiX.
          </h1>
          <h3 className="text-xl text-gray-300 mt-14">
            To Continue, you will be redirected to spotify for login. If you
            have premium subscription than you can listen songs otherwise you
            can always find lyrics!
          </h3>
        </div>
        <Link
          className="px-16 py-5 rounded-md text-gray-100 bg-lime-600 font-semibold text-2xl w-fit"
          to={AUTH_URL}
        >
          Login with Spotify
        </Link>
      </div>
    </>
  );
}
