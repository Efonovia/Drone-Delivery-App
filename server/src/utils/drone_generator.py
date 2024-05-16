import os
import json

sizes = ["small", "medium", "large"]

drones = [
    {
        "type": sizes[i%3],
        "isAvailable": True
    } for i in range(0, 12)
]

drones_json = json.dumps(drones, indent=4)
script_dir = os.path.dirname(os.path.abspath(__file__))
data_file_path = os.path.join(script_dir, "drones_data.json")
with open(data_file_path, "w") as jsx_file:
    jsx_file.write(drones_json)