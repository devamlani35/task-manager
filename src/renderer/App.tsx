import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React, {useState} from 'react';
import { onClick, script } from "react";
// import list_component from "../components/taskmanagercol.html";
import {remote} from "electron";
import graph from '../images/cpu_graph.jpeg';
import Data from '../initial_task_info.json';

var json_obj:any = null;
  window.api.onNewJSON((_event:any, value:any) => {
    json_obj = JSON.parse(JSON.stringify(value))
    console.log(json_obj.Individual_application_info[0].pid)
  })
  if (json_obj == null){
  json_obj = Data;
  }


let processID = "3";

type ProcessProps = {
  pid: string
}

const showText = (
  event: React.MouseEvent<HTMLTableRowElement>
) => {
  const tr: HTMLTableCellElement = event.currentTarget;
};

const hideText = (
  event: React.MouseEvent<HTMLTableRowElement>
) => {
  const tr: HTMLTableRowElement = event.currentTarget;
};

export const Process = ({ pid }: ProcessProps) => <aside>
  {json_obj.Individual_application_info.map((p) => {
    if (p.pid === pid) {
      return (
        <div>
          <p>Process ID: {p.pid}</p>
          <p>User: {p.usr}</p>
          <p>CPU Percent: {p.cpu_percent}</p>
          <p>Memory Percent: {p.mem_percent}</p>
          <p>Command: {p.command}</p>
          <p>Time in Use: {p.time}</p>
        </div>
      )
    }
  })}
</aside>

const Hello = () => {

  const [pid, setValue] = useState(0);


  return (
  <main>
  <div className="flex-grid">
    <div className="col1">
	  <div className="row1">
            <p>Processes running: {json_obj.Num_processes}</p>

          </div>
          <div className="row2">
            <table>
              <thead>
                <tr>
                  <th>Process ID</th>
                  <th>Command</th>
                  <th>CPU Percent</th>
                  <th>Memory Percent</th>
                </tr>
              </thead>

              <tbody>
                {json_obj.Individual_application_info.map((process) => {
                  return (
                    <tr onMouseOver={showText} onMouseOut={hideText}>
                      <td>{process.pid}</td>
                      <td>{process.command}</td>
                      <td>{process.cpu_percent}</td>
                      <td>{process.mem_percent}</td>
                    </tr>)
                })}
              </tbody>
            </table>
          </div>
    </div>
    <div className="col2">
      <img className="row1" src={graph}></img>
      <div className="spacer"></div>
      <div className="row2"></div>
        <div className="row3">
          <Process pid={processID} />
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
