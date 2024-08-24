# Snail-Solve
A fast-paced, customizable math game built with React. Test your arithmetic skills and see how many problems you can solve before the timer runs out!

## Features

- Dynamic problem generation based on user-selected difficulty
- Customizable game settings (digit count, operation type, timer duration)
- Real-time score tracking
- End-game statistics including "Solves per Minute" and a graph showing solve times

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later recommended)
- npm (v6.0.0 or later recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/KrishLad/Snail-Solve
```

2. Navigate to the project directory:
```bash
cd Snail-Solve
```

3. Install depndencies:
This project has a single dependency that being recharts, the installation is as follows,
```bash
npm install recharts
```

4. Start the local server
```bash
npm start
```
5. Open your browser and visit `http://localhost:3000` to play the game.

## How to Play

1. Adjust the game settings to your preference:
- Select the number of digits for the math problems
- Choose the operation type (addition or multiplication)
- Set the game duration

2. Solve the first question to start playing

3. Solve as many math problems as you can before the timer runs out.

4. After the game ends, view your performance statistics and the graph showing your solve times for each problem.

## Technologies Used
- React
- TypeScript
- Recharts (for data visualization)

## Project Structure

- `Game.tsx`: Main game component
- `Problem.tsx`: Renders individual math problems
- `Timer.tsx`: Handles the game timer
- `Settings.tsx`: Manages game settings
- `EndGameDisplay.tsx`: Displays end-game statistics and graph

## Future Enhancements

- Add more operation types (subtraction, division)
- Implement difficulty levels
- Create a leaderboard system
- Add sound effects and animations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.