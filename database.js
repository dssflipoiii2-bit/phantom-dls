const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'users.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        
        // Create users table
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                uid INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                hwid TEXT NOT NULL,
                subscription_end TEXT,
                playtime TEXT
            )
        `, (err) => {
            if (err) {
                console.error('Error creating users table', err.message);
            }
        });
    }
});

module.exports = db;
