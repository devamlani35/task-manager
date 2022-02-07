import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import graph from "../images/cpu_graph.jpeg";
import './App.css';
import React from "react";
//import {PythonShell} from "python-shell";
const cpu_list = [];

const JSON_FILE = require("../initial_task_info.json");
const json_info = JSON.parse(JSON.stringify(JSON_FILE));
console.log(json_info.Num_processes);
let options = {
  mode:"text",
  scriptPath: "../format-data/"
};


//PythonShell.run("get_and_format_data.py",options);






const Hello = () => {
  return (
  <main>
  <div className="flex-grid">
    <div className="col1">
	  <div className="row1"></div>
	  <div className = "row2"></div>
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
