

import { useState } from "react";

export default function Square({size=3}){
    //const squareArr = Array.from({length:size*size}).map((_, index)=>index+1);

    const[squares, setSquares] = useState(Array(size*size).fill(null));

    // function handleClick({index}){
    //     const newSquares = [...squares];
    //     newSquares[index] = 'X';
    //     setSquares(newSquares);
    // }
    // console.log(arr.slice(0,3));
    // console.log(arr.slice(3,6));
    // console.log(arr.slice(6,9));

    // const slicesArr = Array.from({length:size})
    //                     .map((_,index)=>arr.slice(index*size, index*size+size));

    // console.log(slicesArr);                    

    return (
        <>
        {
            Array.from({length:size}).map((_,index)=>(
                <div className="board-row"  key={index}>
                    {
                        squares.slice(index*size, index*size+size).map(
                            (num, i)=> {
                                 const rowIndex = index * size + i;
                                 return (
                                
                                    <button className="square"  key={rowIndex}>
                                        {num || rowIndex+1}
                                    </button>     
                            
                                ) 
                            }
                        )
                    }
                </div>
            ))
            
        }
        </>
            
        
    );
}