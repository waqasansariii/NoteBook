import React from 'react'
import NoteContext  from '../context/notes/NoteContext';
import { useContext,useState } from 'react';
import Notes from './Notes';

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const { addNote } = context || { notes: [] }
    const [note,setNote] = useState({title:"",description:"",tag:"default"})
    const handleClick = (e) => {
       e.preventDefault();
        addNote(note.title,note.description,note.tag);
        props.showAlert("Added Successfully","Success");


    }
    const onChange = (e) => {
        setNote({...note,[e.target.name]:e.target.value})
        
    }
  return (
    
         <div className="container mx-5 my-3">
            <h2>Add a Note</h2>
            <form>
              <div className="form-group my-3">
                <label htmlfor="title">Title</label>
                <input type="text" className="form-control" id="title" value={note.title} aria-describedby="titleHelp" name="title" placeholder="Enter Title" onChange={onChange}/>
              </div>
              <div className="form-group">
                <label htmlfor="description">Description</label>
                <input type="text" className="form-control" id="description"value={note.description} name="description" placeholder="description" onChange={onChange}/>
              </div>
              <div className="form-group">
              <label className="form-check-label" htmlfor="tag">Tag</label>
              <input type="text" className="form-control" id="tag" name="descripiton" onChange={onChange}/>
              </div>
              <button  type="submit" className="btn btn-primary" style={{margin:"10px"}} onClick={handleClick}>Add Note</button>
            </form>
            
          </div>
      
    
  )
}

export default AddNote
