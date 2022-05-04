import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React, {MouseEventHandler, useState} from 'react';
import graph from '../images/cpu_graph.jpeg';
import Data from '../initial_task_info.json';
import { systemPreferences } from 'electron';

var json_obj = Data;
let processID = 1;
/*if (isNaN(processID)) {
  processID = 242;
  for (let i = 0; i < 15; i++) {
    console.log('WAGA WAGA');
    console.log('WOGA WOGA');
  }
}*/

console.log(json_obj.individual_application_info[0])
if (json_obj == null){
  json_obj = Data;
}

type ProcessProps = {
  pid: number
}
/*
function showText(e:MouseEventHandler<HTMLTableRowElement>) {
  processID = e.target.cells[0].innerText;
}
*/

function showText() {
  processID++;
  console.log(processID);
}

function hideText() {
  processID--;
}

export const Process = ({ pid }: ProcessProps) => <aside>
  {json_obj.individual_application_info.map((p) => {
    if (p.pid === pid) {
      return (
        <div>
          <p>Process ID: {p.pid}</p>
          <p>User: {p.usr}</p>
          <p>Command: {p.command}</p>
          <p>Time in Use: {p.time}</p>
          <p>CPU Percent: {p.cpu_percent}</p>
          <p>Memory Percent: {p.memory_percent}</p>
          <p>RAM Usage: {p.RAM_usage}</p>
          <p>Threads: {p.threads}</p>
        </div>
      )
    }
  })}
</aside>
async function handleTerminateClick(){
    var kill_pid = json_obj.individual_application_info[0].pid
    const terminate_bool = await window.api.terminateProcess(kill_pid)
    console.log(terminate_bool)
    if (terminate_bool == 0){
      alert("ERROR")
      
    }
  }
const Hello = () => {

  const [pid, setValue] = useState(0);
  return (
  <main>
  <div className="flex-grid">
    <div className="col1">
	  <div className="row1">
            <p>Processes running: {json_obj.total_processes}</p>
            <p>Process ID: {processID}</p>
            <button onClick={handleTerminateClick}>Click to kill Process</button>
          </div>
          <div className="row2">
            <table>
              <thead>
                <tr>
                  <th>Command</th>
                  <th>PID</th>
                  <th>CPU Percent</th>
                  <th>Memory Percent</th>
                </tr>
              </thead>

              <tbody>
                {json_obj.individual_application_info.map((p) => {
                  return (
                    <tr onMouseEnter={() => console.log(pid)}>
                      <td>{p.command}</td>
                      <td>{p.pid}</td>
                      <td>{p.cpu_percent}</td>
                      <td>{p.memory_percent}</td>
                    </tr>
                  )
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
