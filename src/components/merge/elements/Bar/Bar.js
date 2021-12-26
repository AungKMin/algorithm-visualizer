import React from 'react';
import './styles.css'

function Bar (props) { 

    return(
        <div class="bar" style = {{height: `${props.height*100}px`}}></div>
    );
}

export default Bar;