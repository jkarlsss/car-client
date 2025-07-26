import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { assets, ownerMenuLinks } from "../../constants/assets";

const Sidebar = ({ name, email, image }: User) => {
  const [userImage, setUserImage] = useState<File | null>(null);
  const location = useLocation();

  const updateImage = () => {
    image = URL.createObjectURL(userImage!);
    setUserImage(null);
  };

  return (
    <div
      className="relative min-h-screen md:flex flex-col items-center
    pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-600 text-sm"
    >
      <div className="group relative">
        <label htmlFor="image">
          <img
            src={
              userImage
                ? URL.createObjectURL(userImage)
                : image ||
                  "https://unsplash.com/photos/woman-in-black-and-white-floral-shirt-2EdIX-O2lkI"
            }
            alt="image"
            className="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setUserImage(e.target.files![0])}
          />
          <div
            className="absolute hidden top-0 right-0 left-0 bottom-0
          bg-black/50 rounded-full group-hover:flex items-center justify-center
          cursor-pointer"
          >
            <img src={assets.edit_icon} alt="edit icon" />
          </div>
        </label>
      </div>
      {userImage && (
        <button
          className="absolute top-0 right-0 flex p-2 gap-1 bg-gray-900
        cursor-pointer"
        >
          Save
          <img
            src={assets.check_icon}
            alt="check icon"
            width={13}
            onClick={updateImage}
          />
        </button>
      )}
      <p className="mt-2 text-base max-md:hidden">{name}</p>
      <div className="w-full">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative flex items-center gap-2 w-full py-3 pl-4
              first:mt-6 ${
                link.path === location.pathname
                  ? "bg-gray-600 text-white"
                  : "text-gray-400"
              }`}
          >
            <img
              src={
                link.path === location.pathname ? link.coloredIcon : link.icon
              }
              alt="icon"
            />

            <span className="mx-md:hidden">{link.name}</span>
            <div
              className={`${link.path === location.pathname && "bg-gray-900"}
                w-1.5 h-8 rounded-l right-0 absolute`}
            ></div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
