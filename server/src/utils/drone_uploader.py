import pymongo
import json
import os

# Get the full path to the script's directory
script_dir = os.path.dirname(os.path.abspath(__file__))

# Combine the script directory with the file name
file_path = os.path.join(script_dir, 'drones_data.json')

# MongoDB connection
client = pymongo.MongoClient("mongodb+srv://lordnovia:D0c6JGPFiswnJhF6@cluster0.jvuxjan.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0") #insert MONGO_URL
db = client['test']
collection = db['drones']

# Read the content of the file
with open(file_path, 'r', encoding='utf-8') as file:
    data = json.load(file)

# Insert data into the MongoDB collection in batches
print("starting")
collection.insert_many(data)

# Close the MongoDB connection
client.close()
