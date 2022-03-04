import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import { onClick, script } from "react";
// import list_component from "../components/taskmanagercol.html";
import {remote} from "electron";
import graph from '../images/cpu_graph.jpeg';





const Hello = () => {
var json_obj = null;
  window.api.onNewJSON((_event, value) => {
    json_obj = JSON.parse(JSON.stringify(value))
    console.log(json_obj.Individual_application_info[0].pid)
  })
 
  return (
  <main>
  <div className="flex-grid">
    <div className="col1">
	  <div className="row1">
     
      </div>
	  <div className = "row2">

	  </div>
    </div>
    <div className="col2">
	    <img className="row1" src={graph}></img>
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