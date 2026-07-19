const btnElement = document.getElementById("btn_");
const formElement = document.getElementById("form_");
const titleElement = document.getElementById("title_input");
const noteElement = document.getElementById("note_input");

const showMoreEl = document.querySelector('.show_more');
const hiddenTextEl = document.getElementsByClassName("hiddenText");

// CREATE A NEW NOTE
formElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = titleElement.value;

    try {
        const response = await fetch('/save', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ note: noteElement.value, title: titleElement.value })
        });

        if (!response) {
            throw new Error("Erro no envio");
        }

        const valueServ = await response.json();
        console.log(valueServ);

        titleElement.value = "";
        noteElement.value = "";

        window.alert('anotação criada com sucesso');

    } catch(err) {
        console.log(err.message);
    }
});