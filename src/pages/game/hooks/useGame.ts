import { gameSelector, gameSlice } from "@/redux/game/slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { BetOptionT } from "@/typing/game";

export const useGame = () => {
  const dispatch = useAppDispatch();

  // ** selector and actions
  const gameStates = useAppSelector(gameSelector);

  const gameActions = gameSlice.actions;

  const playerBetsList = gameStates.playerBetsList;
  const totalPlayerBetAmount = gameStates.totalPlayerBetAmount;
  const userBalance = gameStates.userBalance;
  const gameResult = gameStates.gameResult;

  const startGame = () => {
    dispatch(gameActions.setGameResult());
  };

  const handleSetPlayerBetsList = (betOption: BetOptionT) => {
    dispatch(gameActions.setPlayerBetsList(betOption));
  };

  return {
    startGame,
    playerBetsList,
    userBalance,
    handleSetPlayerBetsList,
    gameResult,
    totalPlayerBetAmount,
  };
};
