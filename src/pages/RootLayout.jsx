import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import Player from "../components/Player";
import { useContext } from "react";
import { UserContext } from "../store/UserContext";
import SideNavigation from "../components/SideNavigation";
export default function RootLayout() {
  const { accessToken, playingTrack } = useContext(UserContext);
  return (
    <>
      <main className="h-screen flex flex-col justify-between">
        <MainNavigation />
        <div className="flex justify-between h-[78%]">
          <SideNavigation />
          <Outlet />
        </div>
        <Player
          accessToken={accessToken.accessToken}
          trackUri={playingTrack?.uri}
        />
      </main>
    </>
  );
}
