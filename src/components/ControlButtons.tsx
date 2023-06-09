import { BsFillPauseCircleFill, BsPlayCircleFill } from "react-icons/bs";
import { ImNext2, ImPrevious2 } from "react-icons/im";

type ControlButtonsProps = {
  isPaused: boolean;
  togglePlay: () => void;
  previousTrack: () => void;
  nextTrack: () => void;
};

export const ControlButtons = ({
  isPaused,
  togglePlay,
  nextTrack,
  previousTrack,
}: ControlButtonsProps) => {
  return (
    <div className="flex items-center justify-around gap-4 w-full bg-gray-400 py-3 px-4 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-25 ">
      <button
        onClick={() => previousTrack()}
        className="text-center text-4xl font-bold text-white hover:text-green-500"
      >
        <ImPrevious2 />
      </button>
      <button
        onClick={() => {
          togglePlay();
        }}
        className="text-center text-4xl font-bold  text-white"
      >
        {isPaused ? <BsPlayCircleFill /> : <BsFillPauseCircleFill />}
      </button>
      <button
        onClick={() => nextTrack()}
        className="text-center text-4xl font-bold text-white hover:text-green-500"
      >
        <ImNext2 />
      </button>
    </div>
  );
};
