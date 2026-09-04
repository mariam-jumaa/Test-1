function showMessage(text) {
    document.getElementById('message').textContent = text;
}
 
// ---------------- CREATE ----------------
async function addStudent() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const course = document.getElementById('course').value.trim();
 
    if (name === '' || email === '' || course === '') {
        showMessage('Please fill all fields');
        return;
    }
 
    try {
        const response = await fetch('/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, course })
        });
 
        const data = await response.json();
        showMessage(data.message);
 
        if (response.ok) {
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('course').value = '';
            loadStudents();
        }
    } catch {
        showMessage('Cannot connect to server.');
    }
}
 
// ---------------- READ ----------------
async function loadStudents() {
    try {
        const response = await fetch('/students');
        const students = await response.json();
        const list = document.getElementById('studentsList');
 
        list.innerHTML = '';
 
        if (students.length === 0) {
            list.innerHTML = '<p>No students found.</p>';
            return;
        }
 
        students.forEach(student => {
            const row = document.createElement('div');
 
            row.innerHTML = `
                <p>
                    ID: ${student.id} |
                    Name: ${student.name} |
                    Email: ${student.email} |
                    Course: ${student.course}
                    <button onclick="openUpdateBox(${student.id}, '${student.name}', '${student.email}', '${student.course}')">Update</button>
                    <button onclick="deleteStudent(${student.id})">Delete</button>
                </p>
            `;
 
            list.appendChild(row);
        });
 
    } catch {
        showMessage('Cannot connect to server.');
    }
}
 
// ---------------- OPEN UPDATE ----------------
function openUpdateBox(id, name, email, course) {
    document.getElementById('updateID').value = id;
    document.getElementById('updateName').value = name;
    document.getElementById('updateEmail').value = email;
    document.getElementById('updateCourse').value = course;
 
    document.getElementById('updateBox').style.display = 'block';
}
 
// ---------------- CLOSE UPDATE ----------------
function closeUpdateBox() {
    document.getElementById('updateBox').style.display = 'none';
}
 
// ---------------- UPDATE ----------------
async function saveUpdate() {
    const id = document.getElementById('updateID').value;
    const name = document.getElementById('updateName').value.trim();
    const email = document.getElementById('updateEmail').value.trim();
    const course = document.getElementById('updateCourse').value.trim();
 
    if (name === '' || email === '' || course === '') {
        showMessage('Please fill all fields');
        return;
    }
 
    try {
        const response = await fetch(`/students/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, course })
        });
 
        const data = await response.json();
        showMessage(data.message);
 
        if (response.ok) {
            closeUpdateBox();
            loadStudents();
        }
    } catch {
        showMessage('Cannot connect to server.');
    }
}
 
// ---------------- DELETE ----------------
async function deleteStudent(id) {
    try {
        const response = await fetch(`/students/${id}`, {
            method: 'DELETE'
        });
 
        const data = await response.json();
        showMessage(data.message);
 
        if (response.ok) {
            loadStudents();
        }
    } catch {
        showMessage('Cannot connect to server.');
    }
}
 
// Load students when page opens
loadStudents();
 
 