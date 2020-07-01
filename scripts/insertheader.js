/*This scripts checks from the local storage whether main Header (the pic of LA)
should be rendered or not and inserts it accordingly*/
const firstHeader = document.getElementById('firstheader')


localStorage.getItem('insertHeader')  !== 'true'? firstHeader.style.display = 'none' : firstHeader.style.display = 'block'
document.body.insertBefore(firstHeader, document.getElementsByClassName('header-container')[0])