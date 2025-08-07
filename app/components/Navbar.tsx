import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { assets, menuLinks } from "../constants/assets";
import { useAppProvider } from "~/context/AppContext";
import Loader from "./owner/Loader";
import { updateUserToOwner } from "~/api/userApi";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const Navbar = () => {

  const { setShowLogin, logOut, user, isLoading, setIsOwner, isOwner } = useAppProvider();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleChangeToOwner = async () => {
    
    try {
      if (await updateUserToOwner()) {
        setIsOwner(true);
        toast.success('user role has change to owner.')
      };
    } catch (error) {
      console.log(error);
      toast.error('something went wrong.');
    }
  }

  return (
    <motion.div
    initial={{y:-20, opacity: 0}}
    animate={{y: 0, opacity: 1}}
    transition={{duration: 0.2}}
      className={`flex items-center justify-between px-6 md:px-16
         lg:px-24 xl:px-32 py-4 text-gray-200 relative
         transition-all`}
    >
      <Link to="/">
        <motion.img whileHover={{scale: 1.05}} src={assets.logo} alt="logo" className="h-8" />
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
        border border-gray-700 px-3 rounded-full max-w-56"
        >
          <input
            type="text"
            className="p-1.5 w-full bg-transparent outline-none placeholder-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" className="cursor-pointer" onClick={() => navigate(`/cars?q=${search}`)} />
        </div>
        <div className="flex md:flex-row max-sm:flex-col items-center gap-4">
          
          {isLoading ? (
            <Loader />
          ): (
            <>
<button onClick={() => (isOwner ? navigate("/owner") : handleChangeToOwner())} className="cursor-pointer">
            {isOwner ? 'Dashboard' : 'List Cars'}
          </button>
            <button
            onClick={() => {user ? logOut() : setShowLogin(true)}}
            className="cursor-pointer px-6 py-2 border border-gray-700 rounded-md
            hover:bg-gray-800 transition duration-200"
            >
            { user ? 'logOut' : 'Login'}
            </button>
              </>
          )}
        </div>
      </div>
      <button
        className="sm:hidden cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <img src={open ? assets.close_icon : assets.menu_icon} alt="" />
      </button>
    </motion.div>
  );
};

export default Navbar;
