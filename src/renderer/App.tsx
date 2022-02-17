import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import { onClick, script } from "react";
// import list_component from "../components/taskmanagercol.html";
import {remote} from "electron";
import graph from '../images/cpu_graph.jpeg';

const cpu_list = [];



const Hello = () => {


  function handleClick(){
      window.api.get_script();
      var JSON_FILE = require("../initial_task_info.json");
	  var json_info = JSON.parse(JSON.stringify(JSON_FILE));
      console.log(json_info.Num_processes)
  }
  return (
  <main>
  <div className="flex-grid">
    <div className="col1">
	  <div className="row1">
      <button id="hiclick" onClick = {handleClick}>Hi</button>
      </div>
	  <div className = "row2">

	  </div>
    </div>
    <div className="col2">
      <div className="row1">
        <h1>CPU Graph</h1>
	    <img className="graph" src={graph}></img>
      </div>
      <div className= "spacer"></div>
      <div className="row2"></div>
        <div className="row3">
          <h1>yellow box</h1>

        </div>
      </div>
    </div>
  </main>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
