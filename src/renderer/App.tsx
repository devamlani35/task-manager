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
    console.log(json_obj.Num_processes)
  })
  
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
            <p>Processes running: {Data.Num_processes}</p>
            
          </div>
          
          <div className="row2">
            <table>
              <tr>
                <th>Process ID</th>
                <th>Command</th>
                <th>CPU Percent</th>
                <th>Memory Percent</th>
                <th>Time In Use</th>
              </tr>
              {Data.Individual_application_info.map((process) => {
                return <tr
                    onMouseEnter={() => showText(Number(process.pid))}
                    onMouseLeave={() => hideText(Number(process.pid))}>
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
          <div className="row1">
            <h1>CPU Graph</h1>
            <img className="graph" src={graph}></img>
          </div>
          <div className="row2">
            <img className="graph" alt="graph"></img>
          </div>
          <div className="row3">
            yellow box
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
