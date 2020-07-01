/*Script displays picture from main section on modal, and makes navigation arrows 
of modal invisible, because there is only one picture in the main section*/
let image = document.getElementsByClassName('section-grid-item')[0]
let modal = document.getElementById('myModal')
let modalImg = modal.getElementsByTagName('img')[0]

function openInModal() {
    modal.style.display = 'block'
    modal.children[1].style.display = 'none'
    modal.children[2].style.display = 'none'
    modal.style.marginLeft = '0'
    document.body.style.overflowY = 'hidden'
    let style = image.currentStyle || window.getComputedStyle(image, false)
    let source = style.backgroundImage.slice(4, -1).replace(/"/g, "");
    modalImg.src = source
}

image.addEventListener('click', openInModal)