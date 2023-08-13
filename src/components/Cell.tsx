import { JSX, createSignal } from 'solid-js';
import Pad from "./Pad";

interface CellProps {
    number: number;
    play: Function;
    playableNumber: Function;
}

export default function Cell(props: CellProps): JSX.Element {
    const [active, setActive] = createSignal(false);

    const isEmpty = !props.number;

    const background = getBackground(props.number, isEmpty);
    const style = { background }

    const onClick = (event: any, number: Number) => {
        event.stopPropagation();
        setActive(false);
        props.play(number);
    };

    return (
        <div
            onClick={() => setActive(true)}
            class="cell"
            style={style}>
            {props.number}

            {!props.number && (
                <Pad
                    onClick={onClick}
                    active={active()}
                    playableNumber={props.playableNumber} />
            )}
        </div>
    )
}

const getBackground = (number: number, isEmpty: boolean) => {
    if (isEmpty) return 'transparent';

    const colors = [
        255 * (255 / number),
        100,
        255 * (number / 9),
    ];

    return `rgb(${colors.join()})`;
}
