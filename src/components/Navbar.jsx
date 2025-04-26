import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { useState, useEffect } from "react";
import Avatar from "./Avatar";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const linkClass = ({ isActive }) => (isActive ? "text-white bg-gray-600 rounded-md px-3 py-2" : "text-white hover:bg-gray-700 rounded-md px-3 py-2");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  return (
    <nav className="bg-cyan-700 border-b border-cyan-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <NavLink to="/" className="flex flex-shrink-0 items-center mr-4">
            <img src={logo} alt="React Jobs" className="h-10 w-auto rounded-full" />
            <span className="hidden text-white text-2xl font-bold ml-2 sm:block">React Jobs</span>
          </NavLink>

          <div className={`hidden md:flex md:ml-auto ${isMenuOpen ? "block" : "hidden"}`}>
            <div className="flex space-x-2">
              <NavLink to="/" className={linkClass}>
                Home
              </NavLink>
              <NavLink to="/jobs" className={linkClass}>
                Jobs
              </NavLink>
              <NavLink to="/add-job" className={linkClass}>
                Add Job
              </NavLink>
            </div>
          </div>

          <div className="md:flex md:ml-auto">
            <div className="flex space-x-4 items-center text-sm">
              {user ? (
                <>
                  <span className="text-white">Name: {user.name}</span>
                  <button onClick={logout} className="bg-cyan-600 hover:bg-cyan-800 text-white font-medium py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-200">
                    Exit
                  </button>
                  <Avatar />
                </>
              ) : (
                <>
                  <NavLink to="/register" className="relative inline-block px-4 py-2 font-medium group">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-600 to-green-500 rounded-md blur-sm opacity-75 group-hover:opacity-100 group-hover:blur-none transition"></span>
                    <span className="relative text-white">Sign Up</span>
                  </NavLink>
                  <NavLink to="/login" className="bg-white/10 backdrop-blur-lg text-white border border-white/20 rounded-lg px-4 py-2 hover:bg-white/20 transition">
                    Sign In
                  </NavLink>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden z-20">
            <button onClick={toggleMenu} className="text-white focus:outline-none text-4xl">
              {isMenuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-10 bg-cyan-800 bg-opacity-90 flex flex-col items-center justify-center">
          <div className="flex flex-col space-y-4 text-center text-4xl">
            <NavLink to="/" className={linkClass} onClick={() => setIsMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/jobs" className={linkClass} onClick={() => setIsMenuOpen(false)}>
              Jobs
            </NavLink>
            <NavLink to="/add-job" className={linkClass} onClick={() => setIsMenuOpen(false)}>
              Add Job
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
