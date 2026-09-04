// Import packages
const express = require('express');
// Create app
const app = express();
const PORT = 3000;
// Middleware
app.use(express.json());
app.use(express.static(__dirname));
// In-memory storage (NO DATABASE)
let students = [];
let currentId = 1;
// ---------------- CREATE ----------------
app.post('/students', (req, res) => {
    const { name, email, course } = req.body;
    if (!name || !email || !course) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }
    const newStudent = {
        id: currentId++,
        name,
        email,
        course
    };
    students.push(newStudent);
    res.json({ message: 'Student added successfully' });
});
// ---------------- READ ----------------
app.get('/students', (req, res) => {
    res.json(students);
});
// ---------------- UPDATE ----------------
app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, course } = req.body;
    if (!name || !email || !course) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }
    const student = students.find(s => s.id === id);
    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }
    student.name = name;
    student.email = email;
    student.course = course;
    res.json({ message: 'Student updated successfully' });
});
 
// ---------------- DELETE ----------------
app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Student ID not found.' });
    }
    students.splice(index, 1);
    res.json({ message: 'Student deleted successfully.' });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});