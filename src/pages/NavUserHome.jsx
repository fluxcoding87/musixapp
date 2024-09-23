import { useContext } from "react";
import UserDisplay from "../components/UserDisplay";
import { UserContext } from "../store/UserContext";

export default function NavUserHomePage() {
  const { userDetails, topArtists, topTracks } = useContext(UserContext);
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
