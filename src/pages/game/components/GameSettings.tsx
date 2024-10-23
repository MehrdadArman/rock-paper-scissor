import { memo } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { betMultiple } from "@/constants/game";
import BetOptionCard from "./BetOptionCard";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { useGame } from "../hooks/useGame";

const GameSettings = () => {
  const {
    startGame,
    handleSetPlayerBetsList,
    playerBetsList,
    userBalance,
    totalPlayerBetAmount,
  } = useGame();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rock Paper Scissor</CardTitle>
        <CardDescription>Settings for the game</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row justify-between items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              User Balance
            </label>
            <p className="text-lg font-semibold text-primary">${userBalance}</p>
          </div>
        </div>

        <Separator className="my-4" />

        <div className=" mt-5">
          <h4>Select your options</h4>
          <p className="text-xs text-gray-500">
            Win 14x your bet for a single option or 3x your bet if you choose
            two options and one wins!"
          </p>
          <div className="flex flex-row justify-between items-center mt-4 gap-4">
            {playerBetsList.map((option) => {
              const variant = option.selected ? "selected" : "default";
              return (
                <div
                  className=" w-full "
                  onClick={() =>
                    handleSetPlayerBetsList({
                      ...option,
                      amount: option.amount === 0 ? betMultiple : option.amount,
                      selected: !option.selected,
                    })
                  }
                  key={option.id}
                >
                  <BetOptionCard {...option} variant={variant} />
                </div>
              );
            })}
          </div>
        </div>
        {playerBetsList.map((option) => {
          if (option.selected)
            return (
              <div key={option.id}>
                <div className="mt-5">
                  <label className="block text-sm font-medium text-gray-700">
                    Bet Amount
                  </label>
                  <div className="mt-2">
                    <div className="mb-2">
                      <span className=" font-bold text-red-700">
                        ${option.amount} for {option.position}
                      </span>
                    </div>
                    <Slider
                      value={[option.amount]}
                      max={userBalance}
                      min={betMultiple}
                      step={betMultiple}
                      className={"w-[100%]"}
                      onValueChange={(value: number[]) => {
                        handleSetPlayerBetsList({
                          ...option,
                          amount: value[0],
                        });
                      }}
                    />
                  </div>
                </div>
                <Separator className="my-4" />
              </div>
            );
        })}

        <div className=" mt-5">
          <label className="block text-sm font-medium text-gray-700">
            Total Bet Amount
          </label>
          <p className="text-lg font-semibold text-primary">
            ${totalPlayerBetAmount}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => startGame()}
          size={"lg"}
          variant={"default"}
          className=" w-full rounded"
          disabled={
            playerBetsList.filter((option) => option.selected).length < 1
          }
        >
          Start Game
        </Button>
      </CardFooter>
    </Card>
  );
};

export default memo(GameSettings);
