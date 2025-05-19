import { useState, useEffect } from 'react';

function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  // Load notes from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('notes');
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddOrEdit = () => {
    if (input.trim()) {
      if (editingIndex !== null) {
        // Edit mode
        const updated = [...notes];
        updated[editingIndex] = input;
        setNotes(updated);
        setEditingIndex(null);
      } else {
        // Add mode
        setNotes([...notes, input]);
      }
      setInput('');
    }
  };

  const handleEdit = (idx) => {
    setInput(notes[idx]);
    setEditingIndex(idx);
  };

  const handleDelete = (idx) => {
    setNotes(notes.filter((_, i) => i !== idx));
    // If deleting the note being edited, reset edit mode
    if (editingIndex === idx) {
      setInput('');
      setEditingIndex(null);
    }
  };

  return (
    <div style={{
      maxWidth: 500,
      margin: '3rem auto',
      padding: 24,
      border: '1px solid #ddd',
      borderRadius: 12,
      fontFamily: 'system-ui'
    }}>
      <h1 style={{textAlign: 'center'}}>📝 Notes App</h1>
      <div style={{display: 'flex', gap: 8, marginBottom: 16}}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your note..."
          style={{
            flex: 1,
            padding: 8,
            border: '1px solid #ccc',
            borderRadius: 6
          }}
          onKeyDown={e => { if (e.key === 'Enter') handleAddOrEdit(); }}
        />
        <button
          onClick={handleAddOrEdit}
          style={{
            padding: '8px 16px',
            border: 'none',
            borderRadius: 6,
            background: '#1976d2',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          {editingIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>
      <ul style={{listStyle: 'none', padding: 0}}>
        {notes.length === 0 && (
          <li style={{color: '#888', textAlign: 'center'}}>No notes yet.</li>
        )}
        {notes.map((note, idx) => (
          <li key={idx} style={{
            background: '#f9f9f9',
            marginBottom: 8,
            padding: 12,
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{flex: 1, marginRight: 10}}>{note}</span>
            <button
              onClick={() => handleEdit(idx)}
              style={{
                marginRight: 6,
                padding: '4px 10px',
                border: 'none',
                borderRadius: 4,
                background: '#ffc107',
                color: '#333',
                cursor: 'pointer'
              }}
            >Edit</button>
            <button
              onClick={() => handleDelete(idx)}
              style={{
                padding: '4px 10px',
                border: 'none',
                borderRadius: 4,
                background: '#e53935',
                color: 'white',
                cursor: 'pointer'
              }}
            >Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;