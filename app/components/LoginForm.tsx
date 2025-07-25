import { assets } from "../constants/assets";

const LoginForm = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center fixed top-0 left-0 w-full h-screen bg-transparent z-50 transition duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="bg-gray-950 border text-gray-600 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10 transition duration-300">
        <div className="grid grid-cols-3">
          <div></div>
          <h2 className="flex text-2xl items-center font-semibold mb-6 text-center text-gray-300">
            Welcome back
          </h2>
          <button className="flex justify-end">
            <img onClick={() => setOpen(false)} src={assets.close_icon} alt="close" className="h-4 cursor-pointer" />
          </button>
        </div>
        <form className="text-gray-200">
          <input
            id="email"
            className="w-full  bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="email"
            placeholder="Enter your email"
            required
          />
          <input
            id="password"
            className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="password"
            placeholder="Enter your password"
            required
          />
          <div className="text-right py-4">
            <a className="text-blue-600 underline" href="#">
              Forgot Password
            </a>
          </div>
          <button
            type="submit"
            className="w-full mb-3 bg-indigo-500 py-2.5 rounded-full text-white"
          >
            Log in
          </button>
        </form>
        <p className="text-center text-gray-300 mt-4">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-500 underline">
            Signup
          </a>
        </p>
        <button
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
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
