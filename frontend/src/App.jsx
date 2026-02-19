import { useState, useEffect } from 'react';


function App(){
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingNote, setEditingNote] = useState(null);


  useEffect(() => { // runs when components loads
    fetch('http://localhost:3000/notes')
    .then(res => res.json())
    .then(data => setNotes(data))
  }, []) // [] --> dependency array, if we leave it empty, this useEffect will only run once when the component loads, if we put something in the array, it will run every time that thing changes, like [title] --> this useEffect will run every time the title changes

  const handleSubmit = async (e) => {
    e.preventDefault() // stops from refreshing the page when we submit 
    const response = await fetch('http://localhost:3000/notes', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ title, content })
    })
    const newNote = await response.json()
    setNotes([...notes, newNote]) // add the new note to the existing notes ---> by createing a new array that has everything already in notes plus the new note, in React you always crete a new value and pass it to the setter
    setTitle('') // clear the title input
    setContent('') // clear the content input
  }

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/notes/${id}`, {
      method: 'DELETE'
    })
    setNotes(notes.filter(note => note.id !== id)) // keep all the notes that don't match the id, delete the notes that do match, send new array of non deleted notes to setNotes --> React rerenders
    }

  const handleUpdate = async (id) => {
    await fetch(`http://localhost:3000/notes/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ title, content })
    })
    setNotes(notes.map(note => note.id === id ? { id, title, content } : note)) // if the note id matches the id we are updating, replace it with the updated note, otherwise keep it the same
    setEditingNote(null) // exit editing mode
    setTitle('') // clear the title input
    setContent('') // clear the content input
  }

  return (
    <div>
      <h1>Notes App</h1>

      <form onSubmit = {handleSubmit}>
        <input 
          type = "text"
          placeholder = "Title"
          value = {title}
          onChange = {e => setTitle(e.target.value)}
          />
        <textarea 
          placeholder = "Content"
          value = {content}
          onChange = {e => setContent(e.target.value)}
          />
        <button type = "submit">Save Note</button>
      </form>

      <ul>
        {notes.map(note => (
          <li key = {note.id}>
            {editingNote === note.id ? (
              <div>
                <input value={title} onChange={e => setTitle(e.target.value)} />
                <textarea value={content} onChange={e => setContent(e.target.value)} />
                <button onClick={() => handleUpdate(note.id)}>Update</button>
                <button onClick={() => setEditingNote(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <h2>{note.title}</h2>
                <p>{note.content}</p>
                <button onClick={() => setEditingNote(note.id)}>Edit</button>
                <button onClick={() => handleDelete(note.id)}> Delete </button>
              </div>
        )}
        </li>
        ))}
      </ul>

    </div>
  )
}

export default App;