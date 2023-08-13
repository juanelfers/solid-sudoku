import { For } from "solid-js";
import Cell from "./Cell";

export default function Board(props) {
    return (
        <For each={props.board}>
            {(grid: any, gridIndex: Function) => (
                <div class="block" data-block={Math.random()}>
                    <For each={grid}>
                        {(cell: number, cellIndex: Function) => {
                            return (
                                <Cell
                                    number={cell}
                                    playableNumber={(number) => props.playableNumbers(gridIndex(), cellIndex()).includes(number)}
                                    play={(number) => props.play(number, gridIndex(), cellIndex())} />
                            )
                        }}
                    </For>
                </div>
            )}
        </For>
    )
}