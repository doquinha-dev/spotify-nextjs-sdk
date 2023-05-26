import { Player } from "@/components/Player";
import { useSpotifyPlayer } from "@/hooks/useSpotifyPlayer";

type PlayerContainerProps = {
  token: string;
};

export const PlayerContainer = ({ token }: PlayerContainerProps) => {
  const {
    isPaused,
    isActive,
    currentTrack,
    togglePlay,
    nextTrack,
    previousTrack,
  } = useSpotifyPlayer({ token });

  if (!isActive) {
    return (
      <span className="text-white font-semibold text-lg text-center">
        Para prosseguir, inicie o player em um dos aplicativos do Spotify.
      </span>
    );
  }
  return (
    <Player
      isPaused={isPaused}
      currentTrack={currentTrack}
      togglePlay={togglePlay}
      nextTrack={nextTrack}
      previousTrack={previousTrack}
    />
  );
};
