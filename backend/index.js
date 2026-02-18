const express = require('express')
const Database = require('better-sqlite3')
const db = new Database('notes.db')
const PORT = 3000
const app = express()
const cors = require('cors')

app.use(cors())

// Create the notes table if it doesn't exist
db.exec(` 
    CREATE TABLE IF NOT EXISTS  notes(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    `)


app.use(express.json())

// GET endpoint
app.get('/notes', (req, res) => {
    const notes = db.prepare('SELECT * FROM notes').all()
    res.json(notes) // send this data back as JSON
})

// POST endpoint
app.post('/notes', (req,res) =>{
    const { title, content } = req.body
    const result = db.prepare('INSERT INTO notes (title, content) VALUES (?, ?)').run(title, content)
    res.json({ id: result.lastInsertRowid, title, content }) // send back the new note with its ID
})

// PUT endpoint
app.put('/notes/:id', (req, res) => {
    const id = Number(req.params.id) // req.params.id is a string so we need to change it to a number
    const {title, content} = req.body
    db.prepare('UPDATE notes SET title = ?, content = ? WHERE id = ?').run(title, content, id)
    res.json({ id, title, content }) // send back the updated note
})

// DELETE endpoint
app.delete('/notes/:id', (req, res) => {
    const id = Number(req.params.id) // req.params.id is a string so we need to change it to a number
    db.prepare('DELETE FROM notes WHERE id = ?').run(id)
    res.json({ message: 'Note deleted successfully' }) // send back a success message
})




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})