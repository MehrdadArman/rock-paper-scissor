import { BetOptionT } from "@/typing/game";

export const userBalance: number = 5000;

export const minimumBetAmount: number = 500;

export const betMultiple: number = 500;

export const betOptionsList: BetOptionT[] = [
  {
    id: "rock",
    position: "rock",
    amount: 0,
    selected: false,
  },
  {
    id: "paper",
    position: "paper",
    amount: 0,
    selected: false,
  },
  {
    id: "scissors",
    position: "scissors",
    amount: 0,
    selected: false,
  },
];

export const betMultipliersRuels = {
  oneBet: 14, // 14x for one bet
  twoBet: 3, // 3x for two bets
};
