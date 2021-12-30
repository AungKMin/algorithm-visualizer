import React, { useState } from 'react';
import './styles.css';

import Bar from '../Bar/Bar.js';
import { addToTrace, newTrace, nextState, previousState} from '../../../../helpers/Trace/Trace.js';


// performs selection sort and keeps trace of the steps
function selectionSort(trace, arr, colors) {
    
    addToTrace(trace, arr, colors);

    let i, j, minIndex;

    for (i = 0; i < arr.length-1; i++)
    {
        minIndex = i;
        for (j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j; 
            }
        }
        swap(arr,minIndex, i);
        addToTrace(trace, arr, colors);
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
        let colors = dataInput.map((c) => ('blue'));
        // make the trace with sort
        selectionSort(newTraceObject, dataInput, colors);
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
                    <Bar height={currentState.heights[index] / Math.max(...currentState.heights)} />
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
