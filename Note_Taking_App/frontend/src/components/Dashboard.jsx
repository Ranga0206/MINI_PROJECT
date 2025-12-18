import React, { useEffect, useState } from 'react'
import axios from "axios";
const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState("");
    const [note, setNote] = useState("");
    const [editNoteId, setEditNoteId] = useState(null);


    const handleEdit = (note) => {
        setEditNoteId(note.note_id);
        setNote(note.note);
    }

    const handleDelete = async (id) => {
        try {
            if (confirm("Are sure delete the note ?")) {
                await axios.delete(`http://localhost:8000/api/notes/${id}`, { withCredentials: true })
                fetchNotes();
            }

        }
        catch (err) {
            setError(err);
        }
    }

    const handleCreateorUpdate = async () => {
        try {
            if (editNoteId) {
                //Update
                await axios.put(`http://localhost:8000/api/notes/${editNoteId}`, { note }, { withCredentials: true });
                setEditNoteId(null);

            }
            else {
                //Create
                await axios.post("http://localhost:8000/api/notes", { note }, { withCredentials: true })
            }
            setNote("");
            fetchNotes();
        } catch (error) {
            setError(err);

        }

    }

    const fetchNotes = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/notes", { withCredentials: true })
            setNotes(res.data);
        }
        catch (err) {
            setError(err);
        }
    }

    if (!notes && !error) {
        return <div>Loading....</div>
    }

    useEffect(() => {
        fetchNotes();
    }, [])
    return (
        <div className='dashboard-container'>
            <h2 className='dashboard-title'>My Notes</h2>
            {error && <p className='error'>{error}</p>}
            <div className='note-input-container'>
                <textarea value={note} onChange={(e) => setNote(e.target.value)} rows="4" className='note-textarea'></textarea>
                <button className='form-button btn' onClick={handleCreateorUpdate}>{editNoteId ? "update Note" : "Create Note"}</button>
            </div>
            <div className='notes-grid'>
                {notes.map((note) => (
                    <div className='note-card' key={note.note_id}>
                        <p className='note-text'>{note.note}</p>
                        <p className='note-date'>{note.date}</p>
                        <div className='note-actions'>
                            <button className='edit-button' onClick={() => handleEdit(note)}>Edit</button>
                            <button className='delete-button' onClick={() => handleDelete(note.note_id)}>Delete</button>
                        </div>
                    </div>
                ))}

            </div>
        </div >
    )
}

export default Dashboard