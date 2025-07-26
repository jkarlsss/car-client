import { Outlet } from "react-router";
import NavbarOwner from "../../components/owner/NavbarOwner";
import Sidebar from "../../components/owner/Sidebar";
import { dummyUserData } from "../../constants/assets";
import type { Route } from "./+types/layout";

export async function loader() {
  const user = dummyUserData;

  return user;
}

const OwnerLayout = ({ loaderData }: Route.ComponentProps) => {
  const user = loaderData as User;

  return (
    <div className="flex flex-col">
      <NavbarOwner {...user} />
      <div className="flex">
        <Sidebar {...user} />
        <Outlet />
      </div>
    </div>
  );
};

export default OwnerLayout;
