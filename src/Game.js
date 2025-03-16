import { useState } from "react";

export default function Game({defaultSize = 3}){

    const [size, setSize] = useState(defaultSize);   

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
                return {player: theBoard[first], line: combination};
            }
        }
        return null;
    }

    const handleClick = (index)=>{
        if(board[index] || winner) {
            return;
        }
        const newBoard = [...board];

        newBoard[index] = xTurn ? 'X' : 'O';
        
        const gameWinner = checkWinner(newBoard);

        if(gameWinner){
            setWinner(gameWinner.player);
            setWinningLine(gameWinner.line);
        } else if(newBoard.every(cell=>cell!==null)){
            setWinner("Draw");
        }
        
        
        

        setBoard(newBoard);

        setXTurn(!xTurn);

    };

    const handleSizeChange = (event)=>{
        const newSize = parseInt(event.target.value, 10);

        if(newSize>=3 && newSize<=10){
            setSize(newSize);
            setBoard(Array(newSize*newSize).fill(null));
            setXTurn(true);
            setWinner(null);
            setWinningLine([]);
        }
    }

    return(
        <>
        <label>
            Board Size: 
            <input type="number" min={3} max={10} value={size}
            onChange={(event)=>handleSizeChange(event)}/>
        </label>
        <br/><br/>
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
        {/* Display Game Status */}
        {
            winner ? (winner==='Draw'?
                (<p className="draw">Game is a Draw! 🤝</p>)
                :
                (<p className="winner">Winner: {winner} 🎉</p>)
            ) :
            (<p>Next Player: {xTurn ? 'X' : 'O'}</p>)
        }

        {/* Restart Button */}

        <button className="reset-button"
        onClick={()=>{
                    setBoard(Array(size*size).fill(null));
                    setXTurn(true);
                    setWinner(null);
                    setWinningLine([]);
                }}
        >
            Restart Game 🔄
        </button>
        <br/>
        
        </>
    );
}