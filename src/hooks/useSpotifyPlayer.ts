import { useCallback, useEffect, useState } from "react";

type UseSpotifyPlayerProps = {
  token: string;
};

export const useSpotifyPlayer = ({ token }: UseSpotifyPlayerProps) => {
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
  }, [token]);

  useEffect(() => {
    if (player) {
      getVolume();
    }
  }, [player]);

  const getVolume = useCallback(() => {
    if (!player) return;
    player.getVolume().then((volume) => {
      setVolume(volume);
    });
  }, [player, setVolume]);
  
  const updateVolume = useCallback((newVolume: number) => {
    if (!player) return;
    const clampedVolume = Math.max(0.1, Math.min(0.9, newVolume));
    setVolume(clampedVolume);
    player.setVolume(clampedVolume);
    getVolume();
  }, [player, setVolume, getVolume]);
  
  const increaseVolume = useCallback(() => {
    if (!player) return;
    updateVolume(volume + 0.1);
  }, [player, updateVolume, volume]);
  
  const decreaseVolume = useCallback(() => {
    if (!player) return;
    updateVolume(volume - 0.1);
  }, [player, updateVolume, volume]);
  
  const togglePlay = useCallback(() => {
    if (!player) return;
    player.togglePlay();
  }, [player]);
  
  const nextTrack = useCallback(() => {
    if (!player) return;
    player.nextTrack();
  }, [player]);
  
  const previousTrack = useCallback(() => {
    if (!player) return;
    player.previousTrack();
  }, [player]);

  return {
    isPaused,
    isActive,
    currentTrack,
    volume,
    increaseVolume,
    decreaseVolume,
    togglePlay,
    nextTrack,
    previousTrack,
  };
};
