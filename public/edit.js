const editForm = document.querySelector('#form_');
const titleInput = document.querySelector('#title_input');
const noteInput = document.querySelector('#note_input');

import he from 'he';


// GET NOTE'S ID FROM THE QUERY
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const noteId = urlParams.get('id');

// GET CURRENT NOTE
const getCurrentNote = async () => {
    const response = await fetch(`/note/${noteId}`);
    const result = await response.json();
    
    titleInput.value = he.decode(result.note[0][0].title);
    noteInput.value = he.decode(result.note[0][0].note);
};

getCurrentNote();

// EDIT NOTE 
editForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const updated = {};

    if (titleInput !== '') {
        updated.title = titleInput.value;
    }

    if (noteInput !== '') {
        updated.note = noteInput.value;
    }
    
    const response = await fetch(`/update/${noteId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updated)
    });

    const result = await response.json();
    window.alert('anotação editada com sucesso');
})
