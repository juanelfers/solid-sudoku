class SudokuBoard {
    #playable;

    constructor() {
        this.size = 9;
        this.levels = {
            easy: 3,
            medium: 5,
            hard: 6
        };

        this.board = this.#generateBoard();
        this.makePlayable();
    }

    #generateBoard() {
        const board = Array.from({ length: this.size }, () => Array(this.size).fill(0));
        this.#fillBoard(board);

        return board;
    }

    getPlayableNumbers(grid, cell) {
        // const row = [this.#playable]
        console.log({grid, cell})
        return [...Array(this.size)].map((_, i) => i + 1).filter(n => !this.#playable[grid].includes(n))
    }

    makePlayable(level = 'easy') {
        this.#playable = this.board.map((row) => {
            const map = this.#getMap(level);
            return row.map((cell, colIndex) => (map[colIndex] ? cell : ''));
        });

        return this.getPlayable();
    }

    getPlayable() {
        return JSON.parse(JSON.stringify(this.#playable))
    }

    play(number, x, y) {
        this.#playable[x][y] = number;

        return this.getPlayable();
    }

    #getMap(level) {
        const map = Array(this.size).fill(true);
        let count = this.levels[level];
        while (count !== 0) {
            const index = Math.floor(Math.random() * this.size);
            if (map[index]) {
                map[index] = false;
                count--;
            }
        }
        return map;
    }

    #fillBoard(board) {
        const size = board.length;
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= size; num++) {
                        if (this.#isValidNumber(board, row, col, num)) {
                            board[row][col] = num;
                            if (this.#fillBoard(board)) {
                                return true;
                            }
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    #isValidNumber(board, row, col, num) {
        const size = board.length;
        for (let i = 0; i < size; i++) {
            if (board[row][i] === num || board[i][col] === num) {
                return false;
            }
        }

        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (board[i][j] === num) {
                    return false;
                }
            }
        }

        return true;
    }
}

export default SudokuBoard;
