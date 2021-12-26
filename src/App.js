// import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import InsertionContainer from './components/insertion/elements/Container/Container.js';
import SelectionContainer from './components/selection/elements/Container/Container.js';
import BubbleContainer from './components/bubble/elements/Container/Container.js';
import MergeContainer from './components/merge/elements/Container/Container.js';
import BinaryContainer from './components/binary/elements/Container/Container.js';
import Home from './components/Home/Home.js';
import Drawer from './components/Drawer/Drawer.js';

function App() {

  // const [bars, setBars] = useState([]); 

  return (
    <div className="master">
      <BrowserRouter>
        <Drawer/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/insertion_sort" element={<InsertionContainer/>}/>
          <Route exact path="/selection_sort" element={<SelectionContainer/>}/>
          <Route exact path="/bubble_sort" element={<BubbleContainer/>}/>
          <Route exact path="/merge_sort" element={<MergeContainer/>}/>
          <Route exact path="/binary_search" element={<BinaryContainer/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
