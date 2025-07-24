import { Outlet } from "react-router"


const AuthLayout = () => {
  return (
    <div className="bg-[url('/img/bg.jpg')] bg-cover">
      <Outlet />
    </div>
  )
}

export default AuthLayout