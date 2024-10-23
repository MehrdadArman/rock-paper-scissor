import { BetPositionT } from "@/typing/game";

// Winning conditions for rock-paper-scissors logic

export const handleComputerChoice = (): BetPositionT => {
  const choices: BetPositionT[] = ["rock", "paper", "scissors"];

  return choices[Math.floor(Math.random() * choices.length)];
};

// Helper function to determine if player wins
const winningConditions = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

export const isWinGame = (
  playerChoice: BetPositionT,
  computerChoice: BetPositionT
): boolean => {
  return winningConditions[playerChoice] === computerChoice;
};
