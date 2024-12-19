
from flask import Flask
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/myDatabase"
db = PyMongo(app).db  # Create a Flask application

@app.route("/")  # Define a route for the root URL
def hello_world():
    try:
        # Insert a single document using insert_one
        db.inventory.insert_one({
            "Pickup Date": "2024-10-12",
            "Topwears": "Tshirt",
            "Bottomwears": "Lower",
            "Woolen Clothes": "trousers",
            "Others": "no",
            "Service Type": "Fast Service",
            "Contact Number": 9866745788,
            "Description": "no"
        })
        return "<p>Hello, World! Request submitted successfully.</p>"  # Return a success message
    except Exception as e:
        return f"<p>Error: {str(e)}</p>", 500  # Return an error message if any issue occurs

if __name__ == "__main__":  # Ensure the app runs only when executed directly
    app.run(debug=True, port=5001)  # Run the app with debug mode enabled
