#!/usr/bin/python3
import matplotlib.pyplot as plt
import subprocess
import numpy as np
import sys
import os
def make_arr (string):
    string = string[1:]
    string = string [:-1]
    string = list(string)
    ret_arr = []
    temp_str = ""
    for char in string:
      if char != ",":
        temp_str+= char
      elif char == "," and len(temp_str) > 0:
        ret_arr.append(temp_str)
        temp_str = ""
        continue
    
    ret_arr.append(temp_str)
    return ret_arr
    
if __name__ == "__main__":
  if len(sys.argv[1]) == 0:
    y_axis = []
  else:
    y_axis = list(map(float,str(sys.argv[1]).split(',')))
   
  x_axis= [i for i in range (1,len(y_axis)+1)]
  x = np.arange(len(x_axis))
  fig = plt.figure(figsize=(2.4,3))
  fig.patch.set_facecolor("#3c3d3c")
  plt.rcParams['axes.facecolor'] = "#3c3d3c"
  plt.rcParams["text.color"] = "04d66d"
  ax = fig.add_subplot()
  ax.spines['left'].set_color('silver')
  ax.spines['right'].set_color('silver')
  ax.spines['top'].set_color('silver')
  ax.spines['bottom'].set_color('silver')
  
  plt.plot(x_axis,y_axis, color="#04d66d")
  plt.xticks([])
  plt.yticks([i*10 for i in range (0,11)], [str(i*10) for i in range (0,11)], color = "#04d66d")
  plt.title('CPU percentage')
  plt.grid(True)
  plt.savefig("src/images/cpu_graph.jpeg", dpi = 500)
  
