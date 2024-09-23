import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout.jsx";
import HomePage from "./pages/Home.jsx";
import UserSearch from "./components/UserSearch.jsx";
import UserHome, { loader as userCodeLoader } from "./pages/UserHome.jsx";
import UserContextProvider from "./store/UserContext.jsx";
import NavUserHomePage from "./pages/NavUserHome.jsx";
import UserPlaylistPage from "./pages/UserPlaylist.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/user",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <UserHome />,
        loader: userCodeLoader,
      },
      {
        path: "search",
        element: <UserSearch />,
      },
      {
        path: "home",
        element: <NavUserHomePage />,
      },
      {
        path: "playlist",
        element: <UserPlaylistPage />,
      },
    ],
  },
]);
export default function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}
