import { Outlet, useNavigate } from "react-router";
import NavbarOwner from "../../components/owner/NavbarOwner";
import Sidebar from "../../components/owner/Sidebar";
import type { Route } from "./+types/layout";
import { fetchUserData } from "~/api/userApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppProvider } from "~/context/AppContext";
import Loader from "~/components/owner/Loader";

// export async function loader() {
//   const user = await fetchUserData();

//   return user;
// }

const OwnerLayout = () => {
  const { user, isLoading } = useAppProvider();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (!user || user.role !== 'owner') {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) return (<div className="flex-center flex-1 h-[100vh]"><Loader /></div>);

  return (
    <div className="flex flex-col">
      <NavbarOwner />
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};


export default OwnerLayout;
