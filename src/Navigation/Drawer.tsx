import { cilSearch } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { Link } from "@tanstack/react-router";
import { Route } from "../routes";
import { useUserStore } from "../userForm/store";

interface RouteParams {
  profileId: string;
}

const Drawer = ({ username }: { username: string }) => {
  const { profileId } = Route.useParams<RouteParams>();

  const users = useUserStore((state) => state.users);
  const bookmarked = useUserStore((state) => state.bookmarked);
  const setBookmarked = useUserStore((state) => state.setBookmarked);
  const removeBookmarked = useUserStore((state) => state.removeBookmarked);
  const removeUser = useUserStore((state) => state.removeUser);
  const isBookmarked = useUserStore((state) => state.isBookmarked);
  const addUser = useUserStore((state) => state.addUser);

  const handleBookmarking = () => {
    setBookmarked(profileId);
    removeUser(profileId);
  };

  const handleRemovingBookamrk = () => {
    removeBookmarked();
    addUser(profileId);
  };

  const handleRemoveUser = (user: string) => {
    removeUser(user);
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center lg:relative">
        {username && (
          <nav
            id="Navbar"
            className="bg-off-white w-full h-[3.5rem] rounded-2xl shadow-3xl flex items-center p-2.5 justify-between lg:absolute lg:top-0 lg:w-11/12 lg:mt-5 z-30"
          >
            <label
              htmlFor="my-drawer-2"
              className="btn btn-ghost lg:hidden p-0"
            >
              <div
                id="menuIcon"
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-dark-text"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </div>
            </label>
            <div
              id="labelsContainer"
              className="flex justify-center items-center gap-2 text-dark-text text-lg"
            >
              <label className="font-semibold">Users</label>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.8}
                stroke="currentColor"
                className="w-4 h-4 text-lighter-text"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                />
              </svg>

              <label>{username}</label>
            </div>

            {/* bookmark */}
            <button
              id="bookmarkIcon"
              tabIndex={0}
              role="button"
              onClick={handleBookmarking}
              className={`btn btn-ghost btn-circle ${isBookmarked(profileId) ? "hidden" : ""} ${!isBookmarked(profileId) && bookmarked != "" ? "hidden" : ""} cursor-pointer`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className={`w-6 h-6 text-primary-blue`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                />
              </svg>
            </button>
            {/* solid bookmark */}
            <button
              id="bookmarkIconSolid"
              tabIndex={0}
              role="button"
              onClick={handleRemovingBookamrk}
              className={`btn btn-ghost btn-circle ${isBookmarked(profileId) ? "" : "hidden"} ${!isBookmarked(profileId) && bookmarked != "hidden" ? "" : ""} cursor-pointer`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-secondary-orange"
              >
                <path
                  fillRule="evenodd"
                  d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                  clipRule="evenodd"
                />
              </svg>{" "}
            </button>
            {/* closed bookmark */}
            <div
              id="bookmarkIconClosed"
              tabIndex={0}
              role="button"
              className={`btn btn-ghost btn-circle ${!isBookmarked(profileId) && bookmarked != "" ? "" : "hidden"} cursor-pointer`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5"
                />
              </svg>
            </div>
          </nav>
        )}
      </div>
      <div className="drawer-side z-30">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div
          id="sideDrawer"
          className="menu p-4 w-80 min-h-full bg-off-white text-slate-700 relative"
        >
          <ul>
            <li>
              <details open>
                <summary className="font-bold text-slate-800 text-xl">
                  Bookmarked
                </summary>
                <ul className="text-lg">
                  {bookmarked != "" ? (
                    <li className="cursor-pointer flex flex-row justify-between items-center gap-2">
                      <Link
                        to="/profile/$profileId"
                        params={{
                          profileId: bookmarked,
                        }}
                      >
                        {bookmarked}
                      </Link>
                      <div
                        id="bookmarkIcon"
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                            clipRule="evenodd"
                          />
                        </svg>{" "}
                      </div>
                    </li>
                  ) : (
                    <li className="text-xs text-lighter-text font-thin">
                      <span>No Bookmarked Users</span>
                    </li>
                  )}
                </ul>
              </details>
            </li>
            <li>
              <details open>
                <summary className="font-bold text-slate-800 text-xl">
                  Users
                </summary>
                <ul className="text-lg">
                  {users.map((user) => (
                    <li
                      key={user}
                      className="flex flex-row justify-between items-center gap-2"
                    >
                      <Link
                        to="/profile/$profileId"
                        params={{
                          profileId: user,
                        }}
                      >
                        {user}
                      </Link>
                      {/* close icon */}
                      <div onClick={() => handleRemoveUser(user)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={3.5}
                          stroke="currentColor"
                          className="w-4 h-4 hover:text-red-600"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          </ul>
          {username && (
            <Link
              to="/"
              className="w-16 h-16 bg-primary-blue/20 text-primary-blue rounded-full p-4 absolute bottom-4 right-4 hover:bg-secondary-orange hover:text-white cursor-pointer"
            >
              <CIcon icon={cilSearch} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
