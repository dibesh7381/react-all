/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  // Check user logged-in or not
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center relative">

      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-600">MyApp</h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 text-lg">

        <Link to="/" className="hover:text-blue-600 transition">Home</Link>

        <Link to="/about" className="hover:text-blue-600 transition">About</Link>

        <Link to="/profile/dibesh" className="hover:text-blue-600 transition">Profile</Link>

        <Link to="/dashboard" className="hover:text-blue-600 transition">Dashboard</Link>

        {!loggedIn && (
          <>
            <Link to="/signup" className="hover:text-green-600 transition">Signup</Link>
            <Link to="/login" className="hover:text-green-600 transition">Login</Link>
          </>
        )}

        {loggedIn && (
          <button 
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800 transition"
          >
            Logout
          </button>
        )}
      </div>

      {/* Hamburger Menu Button */}
      <button 
        className="md:hidden text-2xl"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col gap-4 p-4 md:hidden">

          <Link onClick={() => setOpen(false)} to="/" className="hover:text-blue-600 transition">Home</Link>

          <Link onClick={() => setOpen(false)} to="/about" className="hover:text-blue-600 transition">About</Link>

          <Link onClick={() => setOpen(false)} to="/profile/dibesh" className="hover:text-blue-600 transition">Profile</Link>

          <Link onClick={() => setOpen(false)} to="/dashboard" className="hover:text-blue-600 transition">Dashboard</Link>

          {!loggedIn && (
            <>
              <Link onClick={() => setOpen(false)} to="/signup" className="hover:text-green-600 transition">
                Signup
              </Link>

              <Link onClick={() => setOpen(false)} to="/login" className="hover:text-green-600 transition">
                Login
              </Link>
            </>
          )}

          {loggedIn && (
            <button 
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="text-red-600 text-left hover:text-red-800 transition"
            >
              Logout
            </button>
          )}

        </div>
      )}

    </nav>
  );
};

export default Navbar;



