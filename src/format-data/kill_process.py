import sys
from psutil import Process
import os
if __name__ == "__main__":
  pid = int(sys.argv[1])
  if pid == os.getpid():
    print(0)
  elif Process(pid).username() != os.getlogin():
    print(0)
  else:
    p = Process(pid)
    kill_arr = []
    kill_arr+= p.children(recursive=True)
    kill_arr.append(p)
    for process in kill_arr:
      process.terminate()
    print(1)
  
