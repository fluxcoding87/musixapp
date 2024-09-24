import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout.jsx";
import HomePage from "./pages/Home.jsx";
// import UserSearch from "./components/UserSearch.jsx";
import UserHome, { loader as userCodeLoader } from "./pages/UserHome.jsx";
import UserContextProvider from "./store/UserContext.jsx";
// import NavUserHomePage from "./pages/NavUserHome.jsx";
// import UserPlaylistPage from "./pages/UserPlaylist.jsx";
import { lazy, Suspense } from "react";

const UserSearch = lazy(() => import("./components/UserSearch.jsx"));
const NavUserHomePage = lazy(() => import("./pages/NavUserHome.jsx"));
const UserPlaylistPage = lazy(() => import("./pages/UserPlaylist.jsx"));

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
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <UserSearch />
          </Suspense>
        ),
      },
      {
        path: "home",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <NavUserHomePage />
          </Suspense>
        ),
      },
      {
        path: "playlist",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <UserPlaylistPage />
          </Suspense>
        ),
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
