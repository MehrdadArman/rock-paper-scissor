import { memo } from "react";
import { useGame } from "../hooks/useGame";
import { ResultT } from "@/typing/game";

const renderResultText: {
  [key in ResultT]: { text: string; color: string };
} = {
  win: {
    text: "You Win 🎉",
    color: "text-green-500",
  },
  lose: {
    text: "You Lose 😢",
    color: "text-red-500",
  },
  draw: {
    text: "You Lose 😢",
    color: "text-red-500",
  },
};

const GameResult = () => {
  const { gameResult, userBalance } = useGame();

  if (!gameResult) {
    return (
      <div className="w-full bg-white rounded h-full p-3">
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-xl font-semibold">
            Your game result will appear here
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded h-full p-3">
      <div className="grid grid-cols-6 gap-4 h-full">
        <div className="col-span-2 h-full">
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="text-5xl">🤓</h1>
            <p className="text-lg text-gray-500">You</p>
            <h1 className="text-4xl font-semibold capitalize">
              {gameResult.player.map((bet) => bet.position).join(", ")}
            </h1>
          </div>
        </div>
        <div className="col-span-2 h-full">
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="text-6xl text-red-500 font-semibold">VS</h1>
          </div>
        </div>
        <div className="col-span-2 h-full">
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="text-5xl">💻</h1>
            <p className="text-lg text-gray-500">Computer</p>
            <h1 className="text-4xl font-semibold capitalize">
              {gameResult.competitor}
            </h1>
          </div>
        </div>
        <div className="col-span-6">
          <div className="flex flex-col justify-center items-center h-full">
            <h1
              className={`text-4xl capitalize font-semibold  ${
                renderResultText[gameResult.result].color
              }`}
            >
              {renderResultText[gameResult.result].text}
            </h1>
            <p className={`text-lg text-gray-500`}>
              Your balance: ${userBalance}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(GameResult);
