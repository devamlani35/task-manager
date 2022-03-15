import json
import psutil
from psutil import Process
from psutil import cpu_percent
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
                #ret_arr.append(insert_val)
                ret_arr.append(insert_val)
    

    return ret_arr
def byte_to_gb(val):
    return round(float(val/(10**8)),2)

class processes(Process):
    def __init__(self, pid):
        Process.__init__(super(),pid)
        self.process_id = pid
        self.cpu_usage = psutil.cpu_percent()
    def should_keep(self):
        if self.cpu_percent() < 0.1 and self.memory_percent() < 0.1:
            return False
        return True
        

    def to_dict(self):
        ret_dict = {}
        ret_dict["pid"] = self.process_id
        ret_dict["command"] = self.name()
        ret_dict["time"] = self.cpu_times()[0]
        ret_dict["usr"] = self.username()
        ret_dict["cpu_percent"] = self.cpu_usage
        ret_dict["memory_percent"] = self.memory_percent()
        ret_dict["RAM_usage"] = self.memory_info()[0]
        ret_dict["threads"] = self.num_threads()
        return ret_dict

    def __str__(self):
        return self.cpu_usage
    
if __name__ == "__main__":
    final_dict = {}
    final_dict["user_cpu_time"] = psutil.cpu_times()[0]
    final_dict["system_cpu_time"] = psutil.cpu_times()[2]
    final_dict["total_cpu_percent"] = psutil.cpu_percent()
    final_dict["memory_used"] = byte_to_gb(psutil.virtual_memory()[3])
    final_dict["memory_available"] = byte_to_gb(psutil.virtual_memory()[1])
    final_dict["memory_percent"] = byte_to_gb(psutil.virtual_memory()[2])
    try:
        final_dict["temperature"] = psutil.sensors_temperature(farenheit = True)
    except:
        final_dict["temperature"] = None
    additional_process_info = []
    
    for pid in psutil.pids():
        temp_process = processes(int(pid))
        if temp_process.should_keep():
            additional_process_info.append(temp_process.to_dict())
    
    print(len(additional_process_info))

    print("\n\n\n\n")
    print(sort_by_cpu(additional_process_info))
    """
    final_dict["individual_application_info"] = additional_process_info

    final_json = json.dumps(final_dict)
    print(final_json)"""
