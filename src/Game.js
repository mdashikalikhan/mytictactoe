import { useState } from "react";

export default function Game({size = 3}){
    const [board, setBoard] = useState(Array(size*size).fill(null));

    const [xTurn, setXTurn] = useState(true);

    const generateWiningCombinations = ()=>{
        let combinations = [];

        for(let i=0; i< size; i++){
            //row
            combinations.push([...Array(size)].map((_,idx)=>i*size+idx));
            
            //column
            combinations.push([...Array(size)].map((_,idx)=>idx*size+i));
        }
        

        return combinations;
    }

    console.log(generateWiningCombinations());

    const handleClick = (index)=>{
        const newBoard = [...board];
        newBoard[index] = xTurn ? 'X' : 'O';
        setBoard(newBoard);
        setXTurn(!xTurn);
    };

    return(
        <>
        {
            Array.from({length:size}).map((_, index)=>(
                <div className="board-row" key={index}>
                    {
                        board.slice(size*index, size*index+size).map(
                            (val, idx)=>{
                                const cIndex = index*size + idx;
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
        <p>Next Player: {xTurn ? 'X' : 'O'}</p>
        </>
    );
}