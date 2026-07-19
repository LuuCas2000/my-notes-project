// NOTE GALLERY
const noteGallery = document.querySelector('#note_gallery');


// GET NOTES
const getAllNotes = async () => {
    const response = await fetch('/notes');
    const result = await response.json();
    console.log(result.notes);

    noteGallery.innerHTML = result.notes.map(data => `
        <div id="note">
        <div id="note_title">
            <h2>${data.title}</h2>
        </div>
        <div id="note_text">
            <p>${data.note}</p>
        </div>
        <div id="note_btns">
            <button class="update_btn_page" id_note="${data.note_id}">editar</button>
            <button class="delete_btn" id_note="${data.note_id}">excluir</button>
        </div>
        </div>
    `).join('');
    
    return result.notes;
};

getAllNotes();

// DELETE NOTE
noteGallery.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete_btn')) {
        const noteId = e.target.getAttribute('id_note');

        const response = await fetch(`/delete/${noteId}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        getAllNotes();

        window.alert(result.msg);
    }
})

// UPDATE NOTE
noteGallery.addEventListener('click', (e) => { 
    if (e.target.classList.contains('update_btn_page')) {
        const noteId = e.target.getAttribute('id_note');
        window.location.href = `./edit.html?id=${noteId}`; // SEND USER TO THE EDIT PAGE WITH THE NOTE'S ID ATTACHED IN THE URL
    }
})


