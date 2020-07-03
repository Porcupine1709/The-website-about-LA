/*This script is responsible for webpages layout settings which are available 
in the footer section on devices which screen width is greater than 100px*/
const gridgap = document.getElementById('gridgap')
const insertheader = document.getElementById('insertheader')
const setMargin = document.getElementById('setmargin')
const stickyNavbar = document.getElementById('navbarposition')

async function setMarginAndGridGap(margin, gridGap) {
  const divSections = Array.from(document.body.children).filter(item => item.tagName === 'DIV')
 
  //retrieving div elements which need to be modified on index.html page
  
  switch (location.pathname) {
    case('/index.html'):
      divSections.splice(8)
      divSections.splice(2, 2)
      divSections.shift()
      break
    case ('/location.html'):
      divSections.splice(2, 2)
      divSections.splice(divSections.length - 2, 2)
      divSections.shift()
      break
    case ('/about.html'):
      divSections.splice(2, 2)
      divSections.pop()
      divSections.shift()
      break
    case ('/places.html'):
      divSections.splice(2, 2)
      divSections.pop()
      divSections.pop()
      divSections.shift()
      console.log(divSections)
      break
  }

  //Setting the width for all of these elements and left margin in procents, setting mutual transition property 
  if (window.innerWidth > 500)
  divSections.forEach(element => {
    element.style.transition = 'all 1s'
    gridGap ?  element.style.gridGap = '2%' :  element.style.gridGap = '0'
    element.style.width =  `${100 - (margin * 2)}%`
    element.style.marginLeft = `${margin}%`
  })
}

//Modifiyng navbar and header sections
async function dealWithUpperSection(gridGap) {

  let insertHeader = localStorage.getItem('insertHeader') === 'true'
  let stickyNavbar = localStorage.getItem('navbarposition') === 'true'
  let firstHeader = document.getElementById('firstheader')
  let navbar = document.getElementsByClassName('header-container')[0]
  let mainSection
  switch(location.pathname) {
    case('/index.html'):
      mainSection = document.getElementsByClassName('content-container')[0]
      break
    case('/location.html'):
      mainSection = document.getElementById('location-headline')
      break
    case('/about.html'):
      mainSection = document.getElementById('about-section')
      break
    case('/places.html'):
      mainSection = document.getElementById('places-container')
      break
  }

  insertHeader ? firstHeader.style.display = 'block' : firstHeader.style.display = 'none'
  gridGap ? navbar.style.borderBottom = 'none' : navbar.style.borderBottom = 'solid black 3px'
  
  if(stickyNavbar) {
      navbar.style.position = 'fixed'
      mainSection.style.marginTop = '17vh'
  } else {
      navbar.style.position = 'static'
      mainSection.style.marginTop = '17vh'
  }
}

//Changes position for social media bar asynchronously
async function alignSMBar(margin){
  let socialMedias = document.getElementsByClassName('socialmedia-buttons')[0]
  let mediaIcons = Array.from(socialMedias.getElementsByTagName('a'))
  
  if(margin > 5 && window.innerWidth > 1000) {
    //setting style for social media bar if side margin of main elements is greater that 5%
    socialMedias.style.position = 'fixed'
    socialMedias.style.top = '10vh'
    socialMedias.style.left = '-15%'
    socialMedias.style.transition = 'left 0.5s'
    mediaIcons.forEach(icon => {
      icon.style.display = 'block'
      icon.style.borderRadius = 'none'
      icon.style.padding = '2vh'
      icon.style.fontSize = '3.5vh'
      icon.style.margin = '0'
      icon.style.borderRadius = '0'
    })
    mediaIcons[0].style.borderTopRightRadius = '10px'
    mediaIcons[mediaIcons.length - 1].style.borderBottomRightRadius = '10px'
  } else if (margin < 5) {
    //Setting style for social media bar if margin is below 5%
    socialMedias.style.position = 'static'
    socialMedias.style.textAlign = 'center'
    socialMedias.style.marginTop = '15vh'
    mediaIcons.forEach(icon => {
      icon.style.display = 'inline'
      icon.style.borderRadius = '2vh'
      icon.style.padding = '2vh 4vh'
      icon.style.margin = '1vh'
      icon.style.fontSize = '5vh'
      icon.style.boxShadow = '3px 3px 5px'
    })
  }
}

//calling all of the methods above 
async function changeLayoutAsync() {
    let margin = parseInt(localStorage.getItem('margin'))
    let gridGap = localStorage.getItem('gridGap')  === 'true'

    await setMarginAndGridGap(margin, gridGap)
    await dealWithUpperSection(gridGap)
    await alignSMBar(margin)
    
    //to get to the initial position
    window.scrollTo(0, document.body.scrollHeight);
}

/*adding events listeners to the checkboxes and rangebar, the values of whose will be 
stored in the localstorage and when the user will load his webpage, it will be rendered
as was set in settings previously*/

gridgap.onchange = async () => {
    localStorage.setItem('gridGap', gridgap.checked)
    await changeLayoutAsync()
}

insertheader.onchange = async () => {
    localStorage.setItem('insertHeader', insertheader.checked)
    await changeLayoutAsync()
}

setMargin.onchange = async () => {
    document.getElementById('marginpercentage').innerHTML = setMargin.value 
    localStorage.setItem('margin', setMargin.value)
    await changeLayoutAsync()
}

stickyNavbar.onchange = async () => {
    localStorage.setItem('navbarposition', stickyNavbar.checked)
    await changeLayoutAsync()
}

/*Note that all of these functions are async to provide better UX with no blocking 
the main thread i.e. no postponing user's activity when some kind of big operations 
are performed*/