interface PadProps {
    board: any; // Cambia "any" por el tipo adecuado para el "board"
    gridIndex: number;
    cellIndex: number;
    active: boolean;
    onClick: Function;
    playableNumber: Function;
}

export default function Pad(props: PadProps) {
    return (
        <div class="block pad" style={{ display: props.active ? 'grid' : 'none' }}>
            {[...Array(9)].map((_, i) => i + 1).map((n) => {
                const isPlayable = props.playableNumber(n)

                return (
                    <div
                        class={"cell " + (isPlayable ? '' : 'disabled')}
                        onClick={event => isPlayable && props.onClick(event, n)}>
                        {n}
                    </div>
                );
            })}
        </div>
    )
}