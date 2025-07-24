import { Outlet } from "react-router"
import Navbar from "../../components/Navbar"

const ProductsLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default ProductsLayout