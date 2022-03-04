import React from 'react';
import ReactDOM from 'react-dom';
class fukdev{
	constructor(pid, cpu, mem, name){
		this.pid=pid;
		this.cpu=cpu;
		this.mem=mem;
		this.name=name;
	}
}
function pidList(props){
	return <p>{props.pid}</p>;
}
function cpuList(props){
	return <p>{props.cpu}</p>;
}
function memList(props){
	return <p>{props.mem}</p>;
}
function nameList(props){
	return <p>{props.name}</p>;
}
function processInfo(){	
	const PID = { }
	const CPU = { }
	const MEM = { }
	const NAME = { }
	return (
		<>
			<pidList pid = {PID} />
			<cpuList cpu = {CPU} />
			<memList mem = {MEM} />
			<nameList name = {NAME} />
		</>
		);
	}
}

  *{
   box-sizing:border-box;
  }
  .column{
	float: left;
 	width: 25%;
 	passing: 10px;
 	height: 300px;
  }
  .row:after{
 	content: "";
	display: table;
	clear: both;
  }

ReactDOM.render(<processInfo />, document.getElementById('root'));
function processes(){
<html>
 <meta charset = "utf-8">
 <meta name = "viewport" content = "width=device-width">
 <style>
  	<link rel="stylesheet" href="taskmanagercol.css">
  </style>
  <title> Task Manager Info </title>
 </head>
 <body>
  <div class = "row">
 	<div class = "system">
 		<h2>System Processes</h2>
		<pidList pid="100" />
 	</div>
 	<div class = "cpu">
		<h2>CPU Percentage</h2>
		const CPU = new fukdev(import json here whore)

	</div>
 	<div class = "mem">
 		<h2>Memory Percentage</h2>
		const MEM = new fukdev(import json here whore)

 	</div>
 	<div class = "pid">
 		<h2>PID Percentage</h2>
		const PID = new fukdev(import json here whore)
 	</div>
  <div>
 </body>
</html>
}
