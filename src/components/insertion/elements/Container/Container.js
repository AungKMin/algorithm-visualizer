import React, { useState } from 'react';
import './styles.css';

import Bar from '../Bar/Bar.js';
import { addToTrace, newTrace, nextState, previousState} from '../../../../helpers/Trace/Trace.js';

import COLORS from '../../../../helpers/constants/colors.js';

// performs insertion sort and keeps trace of the steps
function insertionSort(trace, arr, colors) {
    
    addToTrace(trace, arr, colors);

    for (let k = 0; k < arr.length; ++k) {
        let value = arr[k];
        let i = 0;
        for (i = k; i > 0 && value < arr[i - 1]; --i) {
            swap(arr, i, i - 1);
            swap(colors, i, i - 1);
            addToTrace(trace, arr, colors);
        }
        // arr[i] = value;
        // addToTrace(trace, arr, colors);
    }

}


function swap(arr, i, j)
{
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
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
        let colors = dataInput.map((c, index) => (COLORS[index % COLORS.length]));
        // make the trace with sort
        insertionSort(newTraceObject, dataInput, colors);
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
                <input type="text" className="text" name="data"></input>
                <input type="submit" className="button" value="Submit"></input> 
            </form>
        </div>
    );
}

export default Container;
