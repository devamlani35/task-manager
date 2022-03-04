import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import { onClick, script } from "react";
// import list_component from "../components/taskmanagercol.html";
import {remote} from "electron";
import graph from '../images/cpu_graph.jpeg';
import Data from '../initial_task_info.json'


const Hello = () => {
  var json_obj = null;

  window.api.onNewJSON((_event, value) => {
    json_obj = JSON.parse(JSON.stringify(value))
    console.log(json_obj.Individual_application_info[0].pid)
  })
  if (json_obj == null){
  json_obj = Data;
  }
  return (
  <main>
  <div className="flex-grid">
    <div className="col1">
	  <div className="row1">

      </div>
	  <div className = "row2">
    <table>
              <tr>
                <th>Process ID</th>
                <th>Command</th>
                <th>CPU Percent</th>
                <th>Memory Percent</th>
                <th>Time In Use</th>
              </tr>
              {json_obj.Individual_application_info.map((process) => {
                return <tr>
                  <td>{process.pid}</td>
                  <td>{process.command}</td>
                  <td>{process.cpu_percent}</td>
                <td>{process.mem_percent}</td>
                  <td>{process.time}</td>
                </tr>
              })}
            </table>

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
