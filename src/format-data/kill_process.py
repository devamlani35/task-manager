import sys
from psutil import Process
import os
if __name__ == "__main__":
  pid = int(sys.argv[1])
  try:
    p = Process(pid)
  except psutil.NoSuchProcess:
    print(0)
  except FileNotFoundError:
    print(0)
  else:
    if pid == os.getpid():
      print(0)
    elif p.username() != os.getlogin():
      print(0)
    else:
        kill_arr = []
        kill_arr+= p.children(recursive=True)
        kill_arr.append(p)
        for process in kill_arr:
          process.terminate()
        print(1)
