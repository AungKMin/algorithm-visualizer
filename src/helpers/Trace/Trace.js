
// helper functions for keeping track of state of elements

// create a new trace 
function newTrace () { 
    let trace = [];
    return trace;
}

// add a new state to the trace
function addToTrace(trace, heights, colors) { 
    trace.push({heights: heights.slice(), colors: colors.slice()});
}

// get next state
function nextState(trace, currentStateNumber) { 
    let newStateNumber = currentStateNumber + 1;
    if (newStateNumber >= 0 && newStateNumber < trace.length) { 
        return trace[newStateNumber]; 
    } else { 
        return null;
    }
}

// get previous State
function previousState(trace, currentStateNumber) { 
    let newStateNumber = currentStateNumber - 1;
    if (newStateNumber >= 0 && newStateNumber < trace.length) { 
        return trace[newStateNumber]; 
    } else { 
        return null;
    }
}



export {newTrace, addToTrace, nextState, previousState};