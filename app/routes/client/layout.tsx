import { useState } from "react";
import { Outlet, useLocation } from "react-router";
import Footer from "../../components/Footer";
import LoginForm from "../../components/LoginForm";
import Navbar from "../../components/Navbar";

export function links() {
  return [
    {
      rel: "icon",
      href: "/favicon.png",
      type: "image/png",
    },
  ];
}

const ProductsLayout = () => {
  const [showLogin, setShowLogin] = useState(false);
  const isOwnerPath = useLocation().pathname.startsWith("/owner");

  return (
    <div>
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}
      <Outlet />
      <Footer />
      <LoginForm open={showLogin} setOpen={setShowLogin} />
    </div>
  );
};

export default ProductsLayout;
