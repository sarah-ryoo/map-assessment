const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const mysql = require('mysql');

app.use(cors);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blaisedb'
});
db.connect(err => {
    if (err) throw err;
    console.log("Connected to db!");
});

// Get all locations and their latitude and longitude from the db
app.get("/api/get", (req, res) => {
    const sqlInsert = "SELECT * FROM marker_locations;"
    db.query(sqlInsert, (err, result) => {
        if (err) throw err;
        res.send(result);
        console.log(result);
    });
});

// Insert the newly named location, latitude, and longitude into the db
app.post("/api/insert", (req, res) => {
    const namedLocation = req.body.namedLocation;
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;

    const sqlInsert = "INSERT INTO marker_locations (namedLocation, latitude, longitude) VALUES (?, ?, ?);"
    db.query(sqlInsert, (namedLocation, latitude, longitude), (err, result) => {
        if (err) throw err;
        console.log("1 record inserted");
        console.log(result);
    });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
