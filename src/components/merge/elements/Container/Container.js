import React, { useState } from 'react';
import './styles.css';

import Bar from '../Bar/Bar.js';
import { addToTrace, newTrace, nextState, previousState} from '../../../../helpers/Trace/Trace.js';

import COLORS from '../../../../helpers/constants/colors.js';

// performs merge sort and keeps trace of the steps
function mergeSort(trace, arr, colors, start, end) {
    if (start >= end) {
        return;
    }
    let middle = start + parseInt((end-start)/2);
    mergeSort(trace, arr, colors, start, middle);
    mergeSort(trace, arr, colors, middle + 1, end);
    merge(trace, arr, colors, start, middle, end);
}

// merge helper function for merge sort
function merge(trace, arr, colors, start, middle, end)
{
    let n1 = middle - start + 1;
    let n2 = end - middle;
  
    let L = new Array(n1); 
    let R = new Array(n2);
    let Lcolor = new Array(n1); 
    let Rcolor = new Array(n2);
  
    for (let i = 0; i < n1; i++)
        L[i] = arr[start + i];
    for (let j = 0; j < n2; j++)
        R[j] = arr[middle + 1 + j];

    // colors
    for (let i = 0; i < n1; ++i)
        Lcolor[i] = colors[start + i];
    for (let j = 0; j < n2; j++)
        Rcolor[j] = colors[middle + 1 + j];
  
  
    let i = 0;
  
    let j = 0;
  
    let k = start;
  
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            colors[k] = Lcolor[i];
            i++;
        }
        else {
            arr[k] = R[j];
            colors[k] = Rcolor[j]; 
            j++;
        }
        k++;
    }
    // addToTrace(trace, arr, colors); 
    
    while (i < n1) {
        arr[k] = L[i];
        colors[k] = Lcolor[i];
        i++;
        k++;
    }
    // addToTrace(trace, arr, colors); 
    
    while (j < n2) {
        arr[k] = R[j];
        colors[k] = Rcolor[j];
        j++;
        k++;
    }
    addToTrace(trace, arr, colors); 
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
        // add an initial step to trace
        addToTrace(newTraceObject, dataInput, colors);
        // make the trace with sort
        mergeSort(newTraceObject, dataInput, colors, 0, dataInput.length - 1);
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
