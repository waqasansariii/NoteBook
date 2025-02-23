import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"; 

    const [notes, setNotes] = useState([]);

    // ✅ GET ALL NOTES
    const getNotes = async () => {
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const json = await response.json();
            setNotes(json);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    // ✅ ADD A NOTE
    const addNote = async (title, description, tag) => {
        if (!title || !description || !tag) {
            console.error("All fields are required.");
            return;
        }

        try {
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                },
                body: JSON.stringify({ title, description, tag })
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`HTTP error! Status: ${response.status} - ${errorMessage}`);
            }

            const json = await response.json();
            setNotes(prevNotes => [...prevNotes, json]);
            console.log("Note added successfully:", json);
        } catch (error) {
            console.error("Error adding note:", error);
        }
    };

    // ✅ DELETE A NOTE
    const deleteNote = async (id) => {
        if (!id) {
            console.error("Invalid note ID for deletion.");
            return;
        }

        try {
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            console.log("Note deleted successfully:", id);
            setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    // ✅ UPDATE A NOTE
    const editNote = async (id, title, description, tag) => {
        if (!id || !title || !description || !tag) {
            console.error("Invalid data for updating note.");
            return;
        }

        try {
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                },
                body: JSON.stringify({ title, description, tag })
            });
            // const json = await  response.json();
            let newNotes = JSON.parse (JSON.stringify({ notes }));

            // Logic to edit in client
            for(let index=0; index<newNotes.length; index++){
                const element = newNotes[index];
                if(element._id === id){
                    newNotes[index].title = title;
                    newNotes[index].description = description;
                    newNotes[index].tag = tag;
    
            }
            break;
        }
        console.log(notes)
        setNotes(newNotes);
    
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`HTTP error! Status: ${response.status} - ${errorMessage}`);
            }

            const updatedNote = await response.json();
            setNotes(prevNotes =>
                prevNotes.map(note => (note._id === id ? updatedNote : note))
            );
            console.log("Note updated successfully:", updatedNote);
        } catch (error) {
            console.error("Error updating note:", error);
        }
    };

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, getNotes, editNote }}>
            {props.children}
        </NoteContext.Provider>
    );
};



export default NoteState;
