//Script that enables closing function of the modal
const Modal = document.getElementById('myModal')
const closeBtn = modal.children[0]

function closeModal() {
    modal.children[1].style.display = 'block'
    modal.children[2].style.display = 'block'
    Modal.style.display = 'none'
    document.body.style.overflowY = 'auto'
}

//When close button on modal is clicked (event is fired) executes closeModal()
closeBtn.addEventListener('click', closeModal)