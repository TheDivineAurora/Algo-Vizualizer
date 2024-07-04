import React from 'react'
import { useState, useEffect } from 'react';
import './Body.css'



const initialBarLengths = [2, 7, 9, 11, 4, 7, 5, 7, 9, 9, 11, 4, 7, 5, 7, 9, 9, 11, 4, 7, 5, 7, 9, 9, 11, 20, 7, 5, 7, 9, 9, 11, 4, 7, 5, 7, 9, 9, 11, 4, 7, 5, 7, 9];


const Body = () => {
  const [barLengths, setBarLengths] = useState(initialBarLengths);

  useEffect(() => {
    const bubbleSort = async () => {
        let array = [...barLengths];
        for(let i = 0; i < array.length - 1; i++){
            for(let j = 0; j < array.length - 1 - i; j++){
                // performing the swap operation 
                if(array[j] > array[j + 1]){
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }

                // creating copy of the array and updating the state
                setBarLengths([...array]);

                // timeout to slow down the processs and make the swappings visilble to us
                await new Promise(resolve => setTimeout(resolve, 20));
            }
        }
    }

    // bubbleSort();
  },[])
  return (
    <div id = "bodyContainer"> 
    {/* based on the element count, we have to provide lengths , margins, and later the colourings to point the swappings will be showed */}
        {barLengths.map((length, index) => {
           return <div class = "bar" style = {{ height : `${length * 25}px`}} key = {index}></div>
        })}
    </div>
  )
}

export default Body