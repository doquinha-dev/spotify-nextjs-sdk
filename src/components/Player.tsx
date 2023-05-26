import Image from "next/image";
import { ControlButtons } from "./ControlButtons";

type PlayerProps = {
  isPaused: boolean;
  currentTrack: Spotify.Track | null;
  togglePlay: () => void;
  previousTrack: () => void;
  nextTrack: () => void;
};

export const Player = ({
  isPaused,
  currentTrack,
  nextTrack,
  previousTrack,
  togglePlay,
}: PlayerProps) => {
  return (
    <section className="flex flex-col items-center justify-center gap-6">
      {currentTrack?.album.images[0]?.url && (
        <div className="flex h-full w-[350px] flex-col items-center justify-center border">
          <Image
            src={currentTrack.album.images[0].url}
            loader={() => currentTrack.album.images[0].url}
            alt={`capa do disco`}
            width={350}
            height={350}
            className="mx-auto"
          />
        </div>
      )}

      <div className="flex flex-col items-center text-white">
        <span className="font-semibold text-lg">{currentTrack?.name}</span>
        <span className="text-sm text-gray-400">
          {currentTrack?.artists[0]?.name}
        </span>
      </div>
      <ControlButtons
        isPaused={isPaused}
        togglePlay={togglePlay}
        nextTrack={nextTrack}
        previousTrack={previousTrack}
      />
    </section>
  );
};
