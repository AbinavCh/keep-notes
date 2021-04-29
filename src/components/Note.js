import React from 'react';

function Note(props) {

    function deleteClicked(id) {
        props.clicked(props.id);
    }

    return (
        <div className='note'>
            <h2>{props.title}</h2>
            <p>{props.content}</p>
            <button onClick={deleteClicked}>DELETE</button>
            
        </div>
    );
}

export default Note;