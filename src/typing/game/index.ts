export type BetPositionT = "rock" | "paper" | "scissors";

export type BetOptionT = {
  id: string;
  position: BetPositionT;
  amount: number;
  selected: boolean;
};

export type ResultT = "win" | "lose" | "draw";

export type GameResultT = {
  player: BetOptionT[];
  competitor: BetPositionT;
  result: ResultT;
  multiplier: number;
};
