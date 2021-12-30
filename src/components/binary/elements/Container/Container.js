import React, { useState } from 'react';
import './styles.css';

import Bar from '../Bar/Bar.js';
import { addToTrace, newTrace, nextState, previousState} from '../../../../helpers/Trace/Trace.js';

// performs binary search and keeps trace of the steps
function binarySearch(trace, arr, colors, value) {
    
    addToTrace(trace, arr, colors);

    let lowerIndex = 0;
    let upperIndex = arr.length - 1;

    while (lowerIndex <= upperIndex) { 
        let averageIndex = Math.floor((lowerIndex + upperIndex)/2);
        colors[averageIndex] = 'blue';
        addToTrace(trace, arr, colors);
        if (arr[averageIndex] === value) { 
            return;
        } else if (arr[averageIndex] < value) { 
            lowerIndex = averageIndex + 1;
            console.log(arr[averageIndex] + " " + value);
        } else { 
            upperIndex = averageIndex - 1; 
            console.log(arr[averageIndex] + " " + value);
        }
    }
}





function Container() {

    function nextStep() { 
        let temp = nextState(trace, currentStateNumber);
        if (temp) { 
            setCurrentState(temp); 
            setCurrentStateNumber(currentStateNumber + 1);
        }
    }
    
    function previousStep() { 
        let temp = previousState(trace, currentStateNumber);
        if (temp) { 
            setCurrentState(temp); 
            setCurrentStateNumber(currentStateNumber - 1);
        }
    }

    function dataSubmit(e) {
        e.preventDefault();
        
        // make new trace 
        let newTraceObject = newTrace();
        // get array to be sorted from input field
        let dataInput = e.target.data.value.split(',').map((c) => (Number(c)));
        // set value to search for
        // setValue(parseFloat(e.target.value.value));
        let colors = dataInput.map((c) => (''));
        // make the trace with search
        binarySearch(newTraceObject, dataInput, colors, parseFloat(e.target.value.value));
        // reset the state number
        setCurrentStateNumber(0);
        // set the length of the array to be sorted
        setDataLength(dataInput.length);
        // set the trace
        setTrace(newTraceObject);
        // set the current state to the first state in the new trace
        setCurrentState(nextState(newTraceObject, -1));
    }

    // index of the first state
    const [currentStateNumber, setCurrentStateNumber] = useState(0);

    // current state to be diplayed
    const [currentState, setCurrentState] = useState({heights: [], colors: []});

    // trace object
    const [trace, setTrace] = useState(newTrace());

    // length of the array to be sorted
    const [dataLength, setDataLength] = useState(0);

    // // value to search for
    // const [value, setValue] = useState(0);

    return (
        <div className="container">
            <div className="barsContainer">
                {[...Array(dataLength)].map((value, index) => (
                    <Bar height={currentState.heights[index]/Math.max(...currentState.heights)} color={currentState.colors[index]}/>
                ))}
            </div>
            <div className="buttonsContainer">
                <button onClick={previousStep} className="button">Previous</button>
                <h3>{currentStateNumber ? currentStateNumber : 0}</h3> 
                <button onClick={nextStep} className="button">Next</button>
            </div>
            <form className="controlsContainer" onSubmit={dataSubmit}> 
                <p> Array: </p>
                <input type="text" className="text" name="data"></input>
                <p> Value: </p>
                <input type="text" className="text" name="value"></input>
                <input type="submit" className="button" value="Submit"></input> 
            </form>
        </div>
    );
}

export default Container;
