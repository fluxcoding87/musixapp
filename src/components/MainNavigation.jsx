import { Link, NavLink } from "react-router-dom";
import { MdHomeFilled } from "react-icons/md";
import { MdSearch, MdLogout } from "react-icons/md";
import { useContext } from "react";
import { UserContext } from "../store/UserContext";
export default function MainNavigation() {
  const { setSearch } = useContext(UserContext);

  return (
    <header className="flex justify-between py-2">
      <div className="h-[4rem] w-[7rem] ml-10">
        <Link to="/user">
          <img src="/logo.svg" alt="logo" className="object-cover" />
        </Link>
      </div>
      <nav className="flex">
        <ul className="flex items-center justify-center gap-4">
          <li className="h-11 w-11 text-neutral-300 bg-[#2A2A2A] flex items-center justify-center rounded-full">
            <NavLink to="/user/home">
              <MdHomeFilled className="h-8 w-8 text-neutral-300 bg-[#2A2A2A]" />
            </NavLink>
          </li>
          <li className="relative">
            <Link to="/user/search">
              <label htmlFor="search">
                <MdSearch className="text-neutral-300 absolute top-[4.5px] left-1 font-bold text-[2rem]" />
              </label>
              <input
                id="search"
                type="search"
                placeholder="What do you want to play?"
                className="py-2 px-14 w-[25rem] bg-[#2A2A2A] rounded-full text-white font-semibold"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Link>
          </li>
        </ul>
      </nav>
      <NavLink to="/" className="flex">
        <div className="flex items-center justify-center px-4 text-white gap-4 font-semibold">
          <MdLogout className="text-2xl" />
          <p>Logout</p>
        </div>
      </NavLink>
    </header>
  );
}
