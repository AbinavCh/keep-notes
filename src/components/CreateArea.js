import React, { useState } from 'react';
import firebase from './firebase'

var db = firebase.firestore();

function CreateArea(props) { 

    const [ note, setNote ] = useState({
        title: "",
        content: ""
    });

    function newNote(event) {
        const { name, value } = event.target;
        setNote((previous) => {
          if (name === "title") {
            return {
              title: value,
              content: previous.content
            };
          } else if (name === "content") {
            return {
              title: previous.title,
              content: value
            };
          }
        });
      }
    
    function upDate(e) {
        e.preventDefault();
        if(note.title === "" && note.content === "")
            alert("Empty note will be discarded");
        else {
            // props.onAdd(note);
            db.collection('Note').add({
                noteTitle: note.title,
                noteContent: note.content
            })
            .then(() => {
                alert("Saved the note in firebase")
            })
            .catch((error) => {
                alert(error.message);
            })
        }   
        
        setNote({
            title: "",
            content: ""
        });
        
    }

    return (
        <div>
        <form onSubmit={upDate}>
            <input type='text' onChange={newNote} name="title" value={note.title} placeholder='Title'></input>
            <textarea onChange={newNote} name="content" value={note.content} placeholder='Take a note...'></textarea>
            <button>Add</button>
        </form>
        </div>
    );
}

export default CreateArea;