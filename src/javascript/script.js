document.querySelectorAll('.kanban-card').forEach(card => {
    card.addEventListener('dragstart', e => {
        e.currentTarget.classList.add('dragging')
    })

    card.addEventListener('dragend', e => {
        e.currentTarget.classList.remove('dragging')
    })
})

document.querySelectorAll('.kanban-cards').forEach(column => {
    column.addEventListener('dragover', e => {
        e.preventDefault();
        e.currentTarget.classList.add('cards-hover');
    })

    column.addEventListener('dragleave', e => {
        e.currentTarget.classList.remove('cards-hover');
    })

    column.addEventListener('drop', e => {
        e.currentTarget.classList.remove('cards-hover');

        const dragCard = document.querySelector('.kanban-card.dragging');
        e.currentTarget.appendChild(dragCard);
    })
})

/*Fazendo modal para adicionar novos card*/

let currentButton = null;


const openButtons = document.querySelectorAll('.add-card');

openButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentButton = button; // <-- Aqui!
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.showModal();
    });
});


const closeButtons = document.querySelectorAll('.close-modal');

closeButtons.forEach(button => {
    button.addEventListener('click', () =>{
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.close();
    });
});

const modalForm = document.querySelector('#modal-1 form');

modalForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('card-title').value;
    const description = document.getElementById('card-description').value;
    const priority = document.getElementById('card-priority').value;

    if (!title || !description || !priority) return;

    const newCard = document.createElement('div');
    newCard.classList.add('kanban-card');
    newCard.setAttribute('draggable', 'true');

    const badgeText = {
        high: 'Alta Prioridade',
        medium: 'Média Prioridade',
        low: 'Baixa Prioridade'
    };

    newCard.innerHTML = `
        <div class="badge ${priority}">
            <span>${badgeText[priority]}</span>
        </div>
        <p class="card-title">${title}</p>
        <div class="card-infos">
            <div class="card-icons">
                <p><i class="fa-regular fa-comment"> 0 </i></p>
                <p><i class="fa-solid fa-paperclip"> 0 </i></p>
            </div>
            <div class="user">
                <img src="src/images/avatar.webp" alt="Avatar">
            </div>
        </div>
    `;

    newCard.addEventListener('dragstart', e => {
        e.currentTarget.classList.add('dragging');
    });

    newCard.addEventListener('dragend', e => {
        e.currentTarget.classList.remove('dragging');
    });

    // Usando o botão clicado para encontrar a coluna correta
    const column = currentButton.closest('.kanban-column').querySelector('.kanban-cards');
    column.appendChild(newCard);

    document.getElementById('modal-1').close();
    modalForm.reset();
});