const mongoose = require("mongoose");

let databaseConnection = "Waiting for database response..."

const startMongo = () => {
    mongoose.connect("mongodb://mongodb:27017/rochambeau")
        .then(() => console.log('connected'))
        .catch(e => console.log(e));
    
    mongoose.connection.on("error", error => {
        console.log("Database connection error:", error);
        databaseConnection = "Error connecting to Database";
    })
    
    mongoose.connection.once("open", () => {
        console.log("Connected to database!");
        databaseConnection = "Connected to database";
    })
}

module.exports = {startMongo, databaseConnection};
