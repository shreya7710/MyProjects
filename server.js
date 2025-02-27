const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Temporary storage for submitted data
let students = [];

// Homepage route
app.get("/", (req, res) => {
    res.send("<h1>Welcome to the Student Registration API</h1><p>Use POST /submit-form to send data and GET /get-students to view all records.</p>");
});

// POST API to receive and store form data
app.post("/submit-form", (req, res) => {
    const { name, age, course, city, mobile } = req.body;

    if (!name || !age || !course || !city || !mobile) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    // Save data in memory
    const newStudent = { id: students.length + 1, name, age, course, city, mobile };
    students.push(newStudent);

    console.log("New Student Added:", newStudent);

    res.status(200).json({
        message: "Form submitted successfully!",
        data: newStudent
    });
});

// GET API to fetch all submitted data
app.get("/get-students", (req, res) => {
    res.status(200).json({
        message: "All Submitted Students",
        data: students
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
