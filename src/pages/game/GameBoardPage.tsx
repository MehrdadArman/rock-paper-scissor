import GameResult from "./components/GameResult";
import GameSettings from "./components/GameSettings";

const GameBoardPage = () => {
  return (
    <>
      <div className="min-w-screen min-h-screen flex justify-center flex-col bg-gray-700">
        <div className="container py-8 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <GameSettings />
            </div>

            <div className="md:col-span-2">
              <GameResult />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameBoardPage;
