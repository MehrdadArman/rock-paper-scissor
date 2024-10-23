# Rock Paper Scissors

## **Introduction**

Create a React app, using Typescript with strict typing.
The app is a scissors, rock, paper game, with the ability to bet on the winning position.

## Features

## Specifications

- Player starts with a balance of 5000.
- Each bet should be 500 (player can place several bets on any position: 500, 1000,
  1500 etc)
- Player can not bet more than 2 positions per one game
- Winning rate for bet on 1 position is 14
- Winning rate for bet on 2 positions is 3

## Requirements

- There should be three betting positions, rock, paper, scissors.
- Player can bet on rock, paper, or scissors, but not on all three at the same time.
- The bet is reduced from the balance.
- When betting done button is clicked, the computer runs a random paper, scissors,
  rock match.
- Player choice should be compared to computers choice and only one bet can win –
  every tie counts as loss
- If player bets on one of them and wins, the return is 14 times the bet.
- If player bets on two of them and wins the return is 3 times the bet.
- Loss bets are not returned to player
- Bets with tie result are returned to player
- After round ends the return adds to the balance
- Player cannot bet if player has less balance than available for bet.

NB please keep in mind that Title ROCK vs PAPER on the second screen means “computer choice ROCK versus player choice PAPER” — not ROCK bet vs PAPER bet.

## Stack

- React
- Redux Toolkit: State Management
- Typescript: type-checking
- Styling: TailwindCss and ShadCn/UI
- Vitest , Vitest Ui , React testing library and MSW : testing and mocking API
- Json-server : fake REST API
- Faker : generating fake data
- Docker
- Vite

## Getting Started

1. Clone this repository.
2. Install dependencies with `npm install`
3. Start the development server with `npm run start`
4. Build the project with `npm run build`.
5. Navigate to `http://localhost:5173` in your browser.

## Deployment

1. Build the Docker image with `docker build -t game .`.
2. Run the Docker container with `docker run -p 3000:80 covid-project`.

---
