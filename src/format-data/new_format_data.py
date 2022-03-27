import json
import psutil
from psutil import Process
from psutil import cpu_percent
from time import sleep
import subprocess
import re
import os
def sort_by_cpu(processes_list):
    ret_arr = [processes_list[0]]
    for i in range (1, len(processes_list)):
        inserted = False
        test_index = 0
        insert_val = processes_list[i]
        while inserted == False:
            if insert_val["cpu_percent"] >= ret_arr[test_index]["cpu_percent"]:
                ret_arr.insert(test_index, insert_val)
                inserted = True
            elif test_index <= len(ret_arr) -2 :
                test_index += 1
            else:
                inserted = True
                ret_arr.append(insert_val)


    return ret_arr
def byte_to_gb(val):
    return round(float(val/(10**8)),2)

class processes(Process,):
    def __init__(self, pid, cpu_percent):
        Process.__init__(super(),pid)
        self.process_id = pid
        self.cpu_usage = cpu_percent
    def should_keep(self):
        if self.cpu_usage < 0.1 and self.memory_percent() < 0.1:
            return False
        return True


    def to_dict(self):
        ret_dict = {}
        ret_dict["cpu_percent"] = self.cpu_usage
        ret_dict["pid"] = self.process_id
        ret_dict["command"] = self.name()
        ret_dict["time"] = self.cpu_times()[0]
        ret_dict["usr"] = self.username()
        ret_dict["memory_percent"] = self.memory_percent()
        ret_dict["RAM_usage"] = self.memory_info()[0]
        ret_dict["threads"] = self.num_threads()
        return ret_dict

    def __str__(self):
        return self.cpu_usage

def write_to_file(data):
    with open("check.txt", "w") as f:
        f.write(str(data))

if __name__ == "__main__":
    current_path = os.getcwd()
    full_path = os.path.join(current_path, 'src/format-data/get_info.sh')
    subprocess.run(full_path, shell=True)
    sleep(0.1)
    with open("info.txt") as f:
        file_contents = f.readlines()
    blank_counter = 0
    split_ind = 0
    for i in range(0, len(file_contents)):
      if file_contents[i] == "\n":
        blank_counter += 1
      if blank_counter == 2:
        split_ind = i
        break
    file_contents = file_contents[split_ind+1:]
    pid_cpu = {}
    counter = 0
    for line in file_contents[7:]:
        vals = line.strip().split(" ")
        vals = [val for val in vals if (val!= " " and len(val) > 0)]
        write_to_file(counter)
        counter += 1
        pid = int(vals[0])
        cpu = float(vals[8])
        pid_cpu[pid] = cpu


    final_dict = {}
    final_dict["total_cpu_percentage"] = float(re.search(r"([0-9\.]*) us", file_contents[2]).groups()[0])
    final_dict["user_cpu_time"] = psutil.cpu_times()[0]
    final_dict["system_cpu_time"] = psutil.cpu_times()[2]
    
    final_dict["memory_used"] = byte_to_gb(psutil.virtual_memory()[3])
    final_dict["memory_available"] = byte_to_gb(psutil.virtual_memory()[1])
    final_dict["memory_percent"] = byte_to_gb(psutil.virtual_memory()[2])
    try:
        final_dict["temperature"] = psutil.sensors_temperature(farenheit = True)
    except:
        final_dict["temperature"] = None
    additional_process_info = []
    for pid in psutil.pids():
        try:
            temp_process = processes(int(pid), pid_cpu[pid])
            if temp_process.should_keep():
                additional_process_info.append(temp_process.to_dict())
        except:
            continue

    final_dict["individual_application_info"] = sorted(additional_process_info, key=(lambda x : x["cpu_percent"]), reverse=True)
    final_json = json.dumps(final_dict)

    print(final_json)

    with open("../initial_task_info.json", "w") as f:
        f.write(final_json)
    

