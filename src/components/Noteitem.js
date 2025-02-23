import {useContext, React} from 'react'
import NoteContext  from '../context/notes/NoteContext';
export default function Noteitem(props) {
    const context  = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote} = props;
    return (
        <div className="col-md-3">
            <div className="card my-3" >

                <div className="card-body">
                    <div className="d-flex justify-content-center">
                    <h5 className="card-title">{note.title} </h5>
                    {/* <i className="fa-solid fa-pen-to-square mx-2"></i> */}
                    <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id); props.showALert("Deleted Successfully","Success")}}> </i> 
                    
                    <i className="far fa-edit" onClick={()=>{updateNote(note); }}> </i>
                    </div>
                    <p className="card-text">{note.description} <br/>
                        
                    </p>
                </div>
            </div>


        </div>
    )
}
