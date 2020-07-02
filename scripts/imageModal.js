//Script that enables closing function of the modal
const Modal = document.getElementById('myModal')
const closeBtn = Modal.children[0]

function closeModal() {
    Modal.children[1].style.display = 'block'
    Modal.children[2].style.display = 'block'
    Modal.style.display = 'none'
    document.body.style.overflowY = 'auto'
}

//When close button on modal is clicked (event is fired) executes closeModal()
closeBtn.addEventListener('click', closeModal)