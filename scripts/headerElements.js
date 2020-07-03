//Script for navbar on small screens
const mobileNavbar = document.getElementById('options')
const closeMobileNavbar = document.getElementById('closeNavbar')
//const subNavbar = document.getElementById('sub-navbar')

const curtainNavbar = document.getElementsByClassName('navbar-for-mobile')[0]
curtainNavbar.style.transition = 'left 2s'

//Attaching click event to open and close navbar
mobileNavbar.addEventListener('click', () =>  curtainNavbar.style.left = '0')
closeMobileNavbar.addEventListener('click', () => curtainNavbar.style.left = '-150%')
