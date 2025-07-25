import { useState } from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../../components/Navbar";

const ProductsLayout = () => {
  const [showLogin, setShowLogin] = useState(false);
  const isOwnerPath = useLocation().pathname.startsWith("/owner");

  return (
    <div>
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}
      <Outlet />
    </div>
  );
};

export default ProductsLayout;
