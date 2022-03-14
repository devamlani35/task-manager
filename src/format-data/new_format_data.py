import json
import psutil
from psutil import Process
def sort_by_cpu(processes):
    return 0

def process_to_dict(process):
    pass
def byte_to_gb(val):
    return val*(10**8)

class processes(Process):
    def __init__(self, pid):
        Process.__init__(super(),pid)
        self.process_id = pid
    def to_dict(self):
        ret_dict = {}
        ret_dict["pid"] = self.process_id
        ret_dict["command"] = self.name()
        ret_dict["time"] = self.cpu_times()[0]
        ret_dict["usr"] = self.username()
        ret_dict["cpu_percent"] = self.cpu_percent()
        ret_dict["memory_percent"] = self.memory_percent()
        ret_dict["RAM_usage"] = self.memory_info()[0]
        ret_dict["threads"] = self.num_threads()
        
        return ret_dict

    
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
        additional_process_info.append(temp_process.to_dict())
    final_dict["individual_application_info"] = additional_process_info

    final_json = json.dumps(final_dict)
    print(final_json)
