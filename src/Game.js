import { useState } from "react";

export default function Game({size = 3}){
    const [board, setBoard] = useState(Array(size*size).fill(null));

    const [xTurn, setXTurn] = useState(true);

    const [winner, setWinner] = useState(null);

    const [winningLine, setWinningLine] = useState([]);

    const generateWiningCombinations = ()=>{
        let combinations = [];

        for(let i=0; i< size; i++){
            //row
            combinations.push([...Array(size)].map((_,idx)=>i*size+idx));
            
            //column
            combinations.push([...Array(size)].map((_,idx)=>idx*size+i));

            
        }
        
        //diagonal
        combinations.push([...Array(size)].map((_, idx)=> idx * size +idx));

        // reverse diagonal
        combinations.push([...Array(size)].map((_,idx)=>idx*size+size-1-idx));

        return combinations;
    }

    //console.log(generateWiningCombinations());

    const winningCombinations = generateWiningCombinations();

    const checkWinner = (theBoard)=>{
        for(let combination of winningCombinations){
            const[first, ...rest] = combination;
            if(theBoard[first] && rest.every(index=>theBoard[index]===theBoard[first])){
                setWinningLine(combination);
                return theBoard[first];
            }
        }
        return null;
    }

    const handleClick = (index)=>{
        if(board[index] || winner) {
            return;
        }
        const newBoard = [...board];
        
        const gameWinner = checkWinner(newBoard);

        setWinner(gameWinner);
        newBoard[index] = xTurn ? 'X' : 'O';
        setBoard(newBoard);
        
        setXTurn(!xTurn);

        if(!gameWinner && newBoard.every(cell=>cell!==null)){
            setWinner("Draw");
        }

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
                                    <button className={`square ${winningLine.includes(cIndex)? "winner-highlight" : ""}`} key={cIndex}
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