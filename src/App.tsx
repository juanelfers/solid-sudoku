import { createStore } from "solid-js/store";
import './App.css'

import SudokuBoard from './lib/SudokuBoard';
import Board from "./components/Board";

const game = new SudokuBoard();

export default function App() {
  const [board, setBoard] = createStore(game.getPlayable(), { equals: false });

  return (
    <div class="container">
      <Board
        board={board}
        play={(number, x, y) => setBoard(game.play(number, x, y))}
        playableNumbers={game.getPlayableNumbers.bind(game)}
      />
    </div>
  )
}
