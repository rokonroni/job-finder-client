import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import defultAvatar from "../../assets/defult_Avatar.png"

const NavLinks = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? "bg-none"
              : isActive
              ? "text-[#FF444A] font-bold underline text-lg "
              : "font-bold underline text-lg hover:bg-transparent hover:text-[#FF444A] focus:bg-white focus:text-[#FF444A]"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allJobs"
          className={({ isActive, isPending }) =>
            isPending
              ? "bg-none"
              : isActive
              ? "text-[#FF444A] underline font-bold text-lg "
              : "font-bold text-lg underline hover:bg-transparent hover:text-[#FF444A] focus:bg-white focus:text-[#FF444A]"
          }
        >
          All Jobs
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/appliedJobs"
              className={({ isActive, isPending }) =>
                isPending
                  ? "bg-none"
                  : isActive
                  ? "text-[#FF444A] underline font-bold text-lg "
                  : "font-bold text-lg underline hover:bg-transparent hover:text-[#FF444A] focus:bg-white focus:text-[#FF444A]"
              }
            >
              Applied Jobs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myJobs"
              className={({ isActive, isPending }) =>
                isPending
                  ? "bg-none"
                  : isActive
                  ? "text-[#FF444A] underline font-bold text-lg "
                  : "font-bold text-lg underline hover:bg-transparent hover:text-[#FF444A] focus:bg-white focus:text-[#FF444A]"
              }
            >
              My Jobs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/addJob"
              className={({ isActive, isPending }) =>
                isPending
                  ? "bg-none"
                  : isActive
                  ? "text-[#FF444A] underline font-bold text-lg "
                  : "font-bold text-lg underline hover:bg-transparent hover:text-[#FF444A] focus:bg-white focus:text-[#FF444A]"
              }
            >
              Add A Job
            </NavLink>
          </li>
        </>
      )}

      <li>
        <NavLink
          to="/blogs"
          className={({ isActive, isPending }) =>
            isPending
              ? "bg-none"
              : isActive
              ? "text-[#FF444A] underline font-bold text-lg "
              : "font-bold text-lg underline hover:bg-transparent hover:text-[#FF444A] focus:bg-white focus:text-[#FF444A]"
          }
        >
          Blogs
        </NavLink>
      </li>
      <div>
        {user?.email ? (
          <>
            <div className="dropdown dropdown-end relative group">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL ? user?.photoURL : defultAvatar} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu font-bold menu-sm dropdown-content z-[1] p-2 shadow bg-base-100 rounded-xl w-52 absolute top-full right-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
              >
                <li>
                  <a className="justify-between">{user?.displayName }</a>
                </li>
                <li>
                  <NavLink onClick={logOut} className="mt-2">Logout</NavLink>
                </li>
              </ul>
            </div>
          </>
        ) : (
          (
            <ul>
              <li>
                <Link to="/login">
                <button className="btn btn-sm bg-transparent text-blue-600 border-blue-600 hover:bg-transparent hover:text-red-600 hover:font-bold hover:border-red-600 ">
                  Login
                </button>
              </Link>
              </li>
            </ul>
              
            )
        )}
      </div>
    </>
  );
};

export default NavLinks;
