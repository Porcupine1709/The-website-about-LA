//This script is responsible for displaying pictures fro gallery section on modal
const gallery = document.getElementsByClassName('gallery-section')[0]
const galleryItems = Array.from(gallery.children)
const _modal = document.getElementById('myModal')
const _modalImg = _modal.getElementsByTagName('img')[0]
const prevImage = _modal.getElementsByClassName('prev-picture')[0]
const nextImage = _modal.getElementsByClassName('next-picture')[0]
const images = Array.from(gallery.getElementsByTagName('img'))
//The index of the current image displayed on modal
let imageIndex

//function opens modal and displays picture on which user clicked
function openModal(event) {
    _modal.style.display = 'block'
    _modal.style.marginLeft = '0'
    document.body.style.overflowY = 'hidden'
    _modalImg.src = this.children[0].src
    imageIndex = images.indexOf(images.find(image => image.src === _modalImg.src))
}

//Displays next picture from gallery section when user clicked on left arrow
function showPrevImage() {
    switch (imageIndex) {
       case 0: 
          _modalImg.src = images[images.length-1].src
          imageIndex = images.length-1
          break
       default:
          _modalImg.src = images[imageIndex - 1].src
          imageIndex--
          break  
    }
}

//Displays previous picture from gallery section when user clicked on right arrow
function showNextImage() {
    switch (imageIndex) {
        case images.length-1: 
           _modalImg.src = images[0].src
           imageIndex = 0
           break
        default:
           _modalImg.src = images[imageIndex + 1].src
           imageIndex++
           break  
     }
}

//attaching event listener to pictures and arrows on modals
galleryItems.forEach(item => item.addEventListener('click', openModal))
prevImage.addEventListener('click', showPrevImage)
nextImage.addEventListener('click', showNextImage)