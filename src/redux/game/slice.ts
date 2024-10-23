import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { BetOptionT, GameResultT, ResultT } from "@/typing/game";
import {
  betMultipliersRuels,
  betOptionsList,
  userBalance,
} from "@/constants/game";
import { isWinGame, handleComputerChoice } from "@/lib/game";

export interface GameStateT {
  userBalance: number;
  totalPlayerBetAmount: number;
  playerBetsList: BetOptionT[];
  gameResult: GameResultT | null;
}

const initialState: GameStateT = {
  userBalance: userBalance,
  totalPlayerBetAmount: 0,
  playerBetsList: betOptionsList,
  gameResult: null,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setBalance: (state, action: PayloadAction<number>) => {
      state.userBalance = action.payload;
    },
    setPlayerBetsList: (state, action: PayloadAction<BetOptionT>) => {
      const { selected, amount, id } = action.payload;

      // Copy playerBetsList to avoid mutating state directly
      const playerBets = state.playerBetsList.map((bet) => ({ ...bet }));
      const index = playerBets.findIndex((option) => option.id === id);

      // If the item exists in the list
      if (index !== -1) {
        // Calculate how many items are already selected, excluding the current one
        const selectedItemsCount = playerBets.filter(
          (option) => option.selected && option.id !== id
        ).length;

        // Check if the user can select more items (up to 2)
        if (selected && selectedItemsCount < 2) {
          // Calculate the new potential total bet amount before applying the change
          const currentTotalBetAmount = playerBets.reduce(
            (acc, option) => acc + option.amount,
            0
          );

          const newTotalBetAmount =
            currentTotalBetAmount - playerBets[index].amount + amount;

          // Prevent update if new total bet amount exceeds user balance
          if (newTotalBetAmount <= state.userBalance) {
            playerBets[index] = {
              ...playerBets[index],
              amount: amount,
              selected: true, // Update with the new selection state
            };
          } else {
            // Optional: You could also add a message or error in the state to indicate the failure
            alert("You don't have enough balance to place this bet");
          }
        } else if (!selected) {
          // If item is being deselected, reset its amount to 0 and deselect it
          playerBets[index] = {
            ...playerBets[index],
            amount: 0,
            selected: false,
          };
        }
      }

      // Calculate the new total bet amount after changes
      const totalBetAmount = playerBets.reduce(
        (acc, option) => acc + option.amount,
        0
      );

      // Update the state with new values only if it's within balance
      if (totalBetAmount <= state.userBalance) {
        state.playerBetsList = playerBets;
        state.totalPlayerBetAmount = totalBetAmount;
      }
    },

    setGameResult: (state) => {
      // Variable to hold the multiplier and the result
      let result: ResultT = "lose";
      let multiplier: number = 0;

      const computerChoice = handleComputerChoice();

      // Get the player's selected bets
      const playerBets = state.playerBetsList.filter(
        (option) => option.selected
      );

      // If no bets were placed, set the result to a draw
      if (playerBets.length === 0) {
        state.gameResult = {
          result: "draw",
          player: playerBets,
          competitor: computerChoice,
          multiplier: 0,
        };
        return;
      }

      // Determine the result based on the number of bets placed
      if (playerBets.length === 1) {
        // Single bet logic
        const playerChoice = playerBets[0].position;

        if (playerChoice === computerChoice) {
          result = "draw";
        } else if (isWinGame(playerChoice, computerChoice)) {
          result = "win";
          multiplier = betMultipliersRuels["oneBet"]; // 14x for single bet win
        } else {
          result = "lose";
        }
      } else if (playerBets.length === 2) {
        // Two bets logic
        const [firstChoice, secondChoice] = playerBets.map(
          (bet) => bet.position
        );

        if (firstChoice === computerChoice && secondChoice === computerChoice) {
          result = "draw";
        } else if (
          isWinGame(firstChoice, computerChoice) ||
          isWinGame(secondChoice, computerChoice)
        ) {
          result = "win";
          multiplier = betMultipliersRuels["twoBet"]; // 3x for double bet win
        } else {
          result = "lose";
        }
      }

      // Update the game result
      state.gameResult = {
        result,
        player: playerBets,
        competitor: computerChoice,
        multiplier: multiplier,
      };

      // Calculate the total bet amount placed by the player
      const totalBetAmount = playerBets.reduce(
        (total, bet) => total + bet.amount,
        0
      );

      // Update user balance based on the result
      if (result === "win") {
        // Calculate winnings and update balance
        const winnings = totalBetAmount * multiplier;
        state.userBalance += winnings;
      } else if (result === "lose") {
        // Subtract the total bet from the balance if player loses
        state.userBalance -= totalBetAmount;
      }

      // Reset the player bets list and total bet amount
      state.playerBetsList = initialState.playerBetsList;
      state.totalPlayerBetAmount = initialState.totalPlayerBetAmount;
    },
  },
});

export const gameSelector = (state: RootState) => state.game;
export const gameActions = gameSlice.actions;

export default gameSlice.reducer;
