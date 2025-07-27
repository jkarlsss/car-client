import { useState } from "react";
import { Outlet } from "react-router";
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

  return (
    <div>
      <Navbar setShowLogin={setShowLogin} />
      <Outlet />
      <Footer />
      {showLogin && <LoginForm setOpen={setShowLogin} />}
    </div>
  );
};

export default ProductsLayout;
