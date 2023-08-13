import { For } from "solid-js";
import Cell from "./Cell";

interface BoardProps {
    board: any;
    play: Function;
    playableNumbers: Function;
}

export default function Board(props: BoardProps) {
    return (
        <For each={props.board}>
            {(grid: any, gridIndex: Function) => (
                <div class="block">
                    <For each={grid}>
                        {(cell: number, cellIndex: Function) => (
                            <Cell
                                number={cell}
                                playableNumber={(number: Number) => props.playableNumbers(gridIndex(), cellIndex()).includes(number)}
                                play={(number: Number) => props.play(number, gridIndex(), cellIndex())} />
                        )}
                    </For>
                </div>
            )}
        </For>
    )
}