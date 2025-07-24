import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { assets, menuLinks } from "../constants/assets";

const Navbar = ({
  setShowLogin,
}: {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav
      className={`flex items-center justify-between px-6 md:px-16
         lg:px-24 xl:px-32 py-4 text-gray-200 relative
         transition-all ${location.pathname === "/" && "bg-gray-900"}`}
    >
      <Link to="/">
        <img src={assets.logo} alt="logo" className="h-8" />
      </Link>
      <div
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t
      border-gray-400 right-0 flex flex-col sm:flex-row items-start sm:items-center
      gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 ${
        open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"
      }`}
      >
        {menuLinks.map((link) => (
          <Link
            className="transition-all hover:border-b"
            to={link.path}
            key={link.name}
          >
            {link.name}
          </Link>
        ))}
        <div
          className="hidden lg:flex items-center text-sm gap-2
        border border-gray-400 px-3 rounded-full max-w-56"
        >
          <input
            type="text"
            className="p-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" />
        </div>
        <div className="flex md:flex-row max-sm:flex-col items-center gap-4">
          <button onClick={() => navigate("/owner")} className="cursor-pointer">
            Dashboard
          </button>
          <button
            onClick={() => setShowLogin(true)}
            className="cursor-pointer px-6 py-2 border rounded-md
          hover:bg-gray-800 transition duration-200"
          >
            Login
          </button>
        </div>
      </div>
      <button
        className="sm:hidden cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <img src={open ? assets.close_icon : assets.menu_icon} alt="" />
      </button>
    </nav>
  );
};

export default Navbar;
