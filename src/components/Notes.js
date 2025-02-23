import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

export default function Notes(props) {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  let navigate = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      navigate('/login'); // Redirect if not logged in
    }
  }, [getNotes, navigate]);

  const modalRef = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" });

  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id || "",
      etitle: currentNote.title || "",
      edescription: currentNote.description || "",
      etag: currentNote.tag || "",
    });

    document.getElementById('exampleModal').classList.add('show');
    document.getElementById('exampleModal').style.display = 'block';
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("Updated Successfully", "success");

    document.getElementById('exampleModal').classList.remove('show');
    document.getElementById('exampleModal').style.display = 'none';
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <addNote showAlert={props.showAlert} />

      {/* Modal */}
      <div className="modal fade my-3" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group my-3">
                  <label htmlFor="etitle">Title</label>
                  <input type="text" className="form-control" id="etitle"
                    value={note.etitle} name="etitle" placeholder="Enter Title" onChange={onChange} minLength={5} required />
                </div>
                <div className="form-group">
                  <label htmlFor="edescription">Description</label>
                  <input type="text" className="form-control" id="edescription"
                    value={note.edescription} name="edescription" placeholder="Description" onChange={onChange} minLength={5} required />
                </div>
                <div className="form-group">
                  <label htmlFor="etag">Tag</label>
                  <input type="text" className="form-control" id="etag"
                    value={note.etag} name="etag" onChange={onChange} minLength={5} required />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => {
                document.getElementById('exampleModal').classList.remove('show');
                document.getElementById('exampleModal').style.display = 'none';
              }}>Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes List */}
      <div className="container my-3 row">
        <h2>Your Notes</h2>
        <div className="container">
          {notes.length === 0 && 'No notes to display'}
        </div>
        {notes.map((note) => (
          <Noteitem key={note._id} updateNote={updateNote} note={note} />
        ))}
      </div>
    </>
  );
}
