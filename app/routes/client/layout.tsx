import { Outlet } from "react-router";
import Footer from "../../components/Footer";
import LoginForm from "../../components/LoginForm";
import Navbar from "../../components/Navbar";
import { useAppProvider } from "~/context/AppContext";

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

  const { isLoggedIn } = useAppProvider();

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      {isLoggedIn && <LoginForm />}
    </div>
  );
};

export default ProductsLayout;
