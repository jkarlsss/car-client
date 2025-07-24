import { Link } from "react-router";
import { assets } from "../../constants/assets";

export function meta() {
  return [
    { title: "Car Rental | Sign In" },
    {
      name: "description",
      content: "Sign in to your account",
    },
  ];
}

const SignIn = () => {
  return (
    <div className="flex-center w-full h-[100vh]">
      <div className="max-w-[400px] w-full rounded-2xl border border-gray-500 p-6 flex flex-col">
        <h2 className="text-2xl text-center font-semibold">SIGN IN</h2>
        <form className="flex flex-col gap-4 mt-4">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-500 p-2 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-500 p-2 rounded-md"
          />
          <button className="border border-gray-500 p-2 rounded-md hover:bg-gray-700 transition duration-100">
            Sign In
          </button>
        </form>
        <div className="flex-center mt-4">
          Don&apos;t have an account?&nbsp;
          <Link to="/sign-up" className="underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
