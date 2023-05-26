import Link from "next/link";
import { BsSpotify } from "react-icons/bs";

export const LoginButton = () => {
  return (
    <button className="group relative h-14 w-56 overflow-hidden rounded-lg bg-gray-100">
      <span className="absolute inset-0 w-3 bg-green-600 transition-all duration-[250ms] ease-out group-hover:w-full"/>
      <div className="relative text-black group-hover:text-white">
        <Link
          href="/api/auth/login"
          className="flex items-center justify-center gap-3 text-lg"
        >
          Login with Spotify <BsSpotify size={25} />
        </Link>
      </div>
    </button>
  );
};
