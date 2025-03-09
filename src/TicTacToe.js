import { useState } from "react";

export default function TicTacToe({size=3}){
    const [board, setBord] = useState(Array( size * size).fill(null));

    const handleClick = (index) => {
        const newBoard = [...board];
        newBoard[index] = 'X';
        setBord(newBoard);

    }
}