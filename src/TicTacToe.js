import { useState } from "react";

export default function TicTacToe({size=3}){
    const [board, setBord] = useState(Array( size * size).fill(null));

    const handleClick = (index) => {
        const newBoard = [...board];
        newBoard[index] = newBoard[index] ? null : 'X';
        setBord(newBoard);

    }

    return (
        <>
        {
            Array.from({length:size}).map((_, rowIndex) => (
                <div className="board-row" key={rowIndex}>
                    {
                        board.slice(size*rowIndex, size*rowIndex+size)
                        .map((val, idx)=>
                            {
                                const cIndex = rowIndex * size + idx;
                                return (
                                    <button className="square" key={cIndex}
                                    onClick={()=>handleClick(cIndex)}>
                                        {val}
                                    </button>
                                );
                            }
                        )
                    }

                </div>
            ))
        }
        </>
    );
}