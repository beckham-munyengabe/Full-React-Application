const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const PORT = 5000;

app.use(cors());
app.use(express.json());

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'crud'
});
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    else {
        console.log('Connected to database');
    }
})

// Create
app.post('/register', (req, res) => {
    const { name,age} = req.body;
    const sql = 'INSERT INTO users (name, age) VALUES (?, ?)';
    db.query(sql, [name, age], (err) => {
        if (err) {
            console.error('Error inserting user:', err);
        }else{
            res.send('User added successfully' );
        }
    });
});
//select middleware

app.get('/users', (req, res) => {
    var select = "SELECT * FROM users";
    db.query(select, (err, result) => {
        if (err) {
            console.error('Error fetching users:', err);
        } else {
            res.json(result);
        }
    });
}
);

//Delete Middleware
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            console.error('Error deleting user:', err); 
        } else {
            res.send('User deleted successfully');
        }
    });
});

//Update Middleware
app.get('/users/:id', (req, res) => {
    var {id} = req.params;
    var select = "SELECT * FROM users WHERE id = ?";
    db.query(select, [id], (err, result) => {
        if (err) {
            console.error('Error fetching user:', err);
        } else {
            res.json(result);
        }
    });
});

app.put('/update-user/:id', (req, res) => {
    var {id} = req.params;
    var {name, age} = req.body;
    var sql = "UPDATE users SET name = ?, age = ? WHERE id = ?";
    db.query(sql, [name, age, id], (err) => {
        if (err) {
            console.error('Error updating user:', err);
        } else {
            res.send('User updated successfully');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 