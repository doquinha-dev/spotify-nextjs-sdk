import spotifyLogo from "@/assets/spotify.png";
import Image from "next/image";
import { ControlButtons } from "./ControlButtons";

export const Player = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-6">
      <div className="flex h-full w-[350px] flex-col items-center justify-center border">
        <Image
          src={spotifyLogo}
          alt={`capa do disco`}
          width={350}
          height={350}
          className="mx-auto"
        />
      </div>

      <div className="flex flex-col items-center text-white">
        <span className="font-semibold text-lg">Music Name</span>
        <span className="text-sm text-gray-400">Artist Name</span>
      </div>
      <ControlButtons isPaused={true} />
    </section>
  );
};
