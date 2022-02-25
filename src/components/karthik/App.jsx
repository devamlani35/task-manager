import React from 'react';
import Data from '../../initial_task_info.json'

let jsonData = Data.Individual_application_info

function App() {
  return (
    <main>
      <table>
        <tr>
          <th>Process ID</th>
          <th>Command</th>
          <th>CPU Percent</th>
          <th>Memory Percent</th>
          <th>Time In Use</th>
        </tr>
      {jsonData.map((process) => {
        return <tr>
           <td>{process.pid}</td>
           <td>{process.command}</td>
           <td>{process.cpu_percent}</td>
           <td>{process.mem_percent}</td>
           <td>{process.time}</td>
        </tr>
      })}
      </table>
    </main>
  );
}

export default App;
