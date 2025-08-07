import { Link } from "react-router";
import { assets } from "../../constants/assets";
import { useAppProvider } from "~/context/AppContext";

const NavbarOwner = () => {

  const { user } = useAppProvider();

  return (
    <div
      className="flex items-center justify-between px-6 md:px-10
    py-4 text-gray-500 border-b relative transition-all"
    >
      <Link to="/">
        <img src={assets.logo} alt="logo" className="h-7" />
      </Link>
      <p>Welcome, {user?.name || "Owner"}</p>
    </div>
  );
};

export default NavbarOwner;
