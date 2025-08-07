import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { assets, ownerMenuLinks } from "../../constants/assets";
import { useAppProvider } from "~/context/AppContext";
import { updateUserImage } from "~/api/userApi";
import toast from "react-hot-toast";

const Sidebar = () => {
  const [userImage, setUserImage] = useState<File | null>(null);
  const [isImageUpdateLoading, setIsImageUpdateLoading] = useState(false);
  const location = useLocation();
  const { user } = useAppProvider();

  const updateImage = async () => {
    if (user && userImage) {
      setIsImageUpdateLoading(true);
      user.image = URL.createObjectURL(userImage);
    try {
          const isImageUpdated = await updateUserImage(userImage);

          if (!isImageUpdated) {
            toast.error('request error');
            setUserImage(null);
            setIsImageUpdateLoading(false);
            return;
          }

          toast.success('Profile image successfuly updated');
        

        } catch (error) {
          toast.error('Server error');
          setUserImage(null);
          setIsImageUpdateLoading(false);
        } finally {
          setIsImageUpdateLoading(false);
          setUserImage(null);
        }

      
    }
    
    

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
                : user?.image ||
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
        disabled={isImageUpdateLoading}
          className="absolute top-0 right-0 flex p-2 gap-1 bg-gray-900
        cursor-pointer"
        >
          Save
          <img
            src={isImageUpdateLoading ? '/img/loading.svg' : assets.check_icon}
            alt="check icon"
            width={13}
            onClick={updateImage}
          />
        </button>
      )}
      <p className="mt-2 text-base max-md:hidden">{user?.name}</p>
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
