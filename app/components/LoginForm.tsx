import { useState } from "react";
import { assets } from "../constants/assets";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppProvider } from "~/context/AppContext";
import { fetchUser } from "~/api/userApi";

const LoginForm = () => {
  const [islogin, setIslogin] = useState("login");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { setShowLogin, setUser, setIsOwner } = useAppProvider();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

      try {
        
      const {data} =  await axios.post(`/api/user/${islogin}`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password
        }
      )
      
      if (data.success) {
        toast.success(data.message);
        localStorage.setItem('token', data.token);
        const user = await fetchUser();
        setUser(user);
        setIsOwner(true);
        setShowLogin(false);
      } else {
        toast.error(data.message);
      }
      } catch (error: any) {
        toast.error(error);
      }
    // axios.post('/api/user/register', 

    // )

  };

  return (
    <div
      className="flex flex-col items-center justify-center fixed top-0 left-0 w-full h-screen bg-transparent z-50 transition duration-300
      "
    >
      <div className="bg-gray-950 border text-gray-600 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10 transition duration-300">
        <div className="flex justify-end">
          <button className="flex">
            <img
              onClick={() => setShowLogin(false)}
              src={assets.close_icon}
              alt="close"
              className="h-4 cursor-pointer"
            />
          </button>
        </div>
        <h2 className="flex text-2xl justify-center items-center font-semibold mb-6 text-center text-gray-300">
          Welcome back
        </h2>
        <form onSubmit={submitHandler} className="text-gray-200">
          {islogin === "register" && (
            <input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
              type="text"
              placeholder="Enter your name"
              required
            />
          )}
          <input
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full  bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="email"
            placeholder="Enter your email"
            required
          />
          <input
            id="password"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="password"
            placeholder="Enter your password"
            required
          />

          {islogin === "login" && (
            <div className="text-right py-4">
              <a className="text-blue-600 underline" href="#">
                Forgot Password
              </a>
            </div>
          )}
          <button
            type="submit"
            className={`w-full mb-3 transition duration-200 cursor-pointer bg-gray-900 hover:bg-gray-600 py-2.5 rounded-full text-white ${
              islogin === "register" && "mt-6"
            }`}
          >
            {islogin === "register" ? "Sign up" : "Log in"}
          </button>
        </form>
        {islogin === "login" ? (
          <p className="text-center text-gray-300 mt-4">
            Don’t have an account?{" "}
            <button
              onClick={() => setIslogin("register")}
              className="text-blue-600 underline cursor-pointer"
            >
              Signup
            </button>
          </p>
        ) : (
          <p className="text-center text-gray-300 mt-4">
            Already have an account?{" "}
            <button
              onClick={() => setIslogin("login")}
              className="text-blue-600 underline cursor-pointer"
            >
              Login
            </button>
          </p>
        )}
        {/* <button
          type="button"
          className="w-full border hover:bg-gray-700 transition duration-300 flex items-center gap-2 justify-center mt-5 bg-black py-2.5 rounded-full text-white"
        >
          <img
            className="h-4 w-4"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/appleLogo.png"
            alt="appleLogo"
          />
          Log in with Apple
        </button>
        <button
          type="button"
          className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800"
        >
          <img
            className="h-4 w-4"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
            alt="googleFavicon"
          />
          Log in with Apple
        </button> */}
      </div>
    </div>
  );
};

export default LoginForm;
