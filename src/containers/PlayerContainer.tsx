import { Player } from "@/components/Player";
import { useEffect, useState } from "react";

type PlayerContainerProps = {
  token: string;
};

export const PlayerContainer = ({ token }: PlayerContainerProps) => {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Spotify.Track | null>(null);
  const [volume, setVolume] = useState<number>(0.5);

  useEffect(() => {
    if (!token) return;
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Doquinha Player",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", ({ track_window, paused }) => {
        if (!track_window) return;

        setCurrentTrack(track_window.current_track);
        setIsPaused(paused);

        player.getCurrentState().then((state) => {
          setIsActive(!!state);
        });
      });

      player.connect();
    };
  }, []);

  useEffect(() => {
    if (player) {
      getVolume();
    }
  }, [player]);

  const getVolume = () => {
    if (!player) return;
    player.getVolume().then((volume) => {
      setVolume(volume);
      console.log(volume);
    });
  };

  const updateVolume = (newVolume: number) => {
    if (!player) return;
    const clampedVolume = Math.max(0.1, Math.min(0.9, newVolume));
    setVolume(clampedVolume);
    player.setVolume(clampedVolume);
    getVolume();
  };

  const increaseVolume = () => {
    if (!player) return;
    updateVolume(volume + 0.1);
  };

  const decreaseVolume = () => {
    if (!player) return;
    updateVolume(volume - 0.1);
  };

  const togglePlay = () => {
    if (!player) return;
    player.togglePlay();
  };

  const nextTrack = () => {
    if (!player) return;
    player.nextTrack();
  };

  const previousTrack = () => {
    if (!player) return;
    player.previousTrack();
  };

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
