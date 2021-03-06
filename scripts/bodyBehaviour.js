/*This script is responsible for document body and some of its elements behaviour*/
const header = document.getElementsByClassName('header-container')[0]
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
let prevScrollpos = window.pageYOffset
document.body.style.transition = 'all 2s'

//this variable is used for dynamical change of the body's background image (linear-gradient)
let counter = 1

//here we set the interval that will change bodys background smoothly every second according to current time
window.setInterval(() => {
    const d = new Date()
    let x = true
    if (x && counter < 30) {
        counter++
    } else if (x && counter === 30) {
        counter--
        x = false
    } else if (!x && counter > 1) {
        counter--
    } else if (x && counter === 30) {
        counter++
        x = true
    }
    document.body.style.backgroundImage = `linear-gradient(to right, rgb(${counter + 200}, ${counter * 2 + 150}, 20) 0%, rgb(${counter + 50}, ${counter * 3 + 120}, ${100}) 100%)`
}, 1000)

//this method will asynchronously regulate navbar's and headers position according to webpage's settings
async function changeHeaderMargin() {
  if(window.innerWidth > 500) {
  
    let margin = parseInt(localStorage.getItem('margin'))
    var currentScrollPos = window.pageYOffset;
    switch (localStorage.getItem('insertHeader')) {
      case ('true') :
        switch (localStorage.getItem('navbarposition')) {
          case ('true') :
            if(currentScrollPos < window.innerHeight * 0.50) {
                header.style.position = 'static'
                mainSection.style.marginTop = '17vh'
            } else {
                header.style.position = 'fixed'
                if(window.innerWidth < 1000 && window.innerWidth > 600){
                    mainSection.style.marginTop = '34vh'
                } else if (window.innerWidth > 1000) {
                    mainSection.style.marginTop = '27vh'
                }
                header.style.top = '-1.23em'
                header.style.left = margin
            }
            break
          case ('false') :
            header.style.position = 'static'
            break
          }
        break
      case ('false') :
        switch (localStorage.getItem('navbarposition')) {
          case ('true') :
              header.style.position = 'fixed'
            if (prevScrollpos > currentScrollPos) {
              if(localStorage.getItem('gridGap')  === 'true') {
                header.style.top = "0" 
                header.style.left = margin
              } else {
                header.style.top = '-1.23em'
                header.style.left = margin
              }
              header.style.zIndex = '3'
              } else {
              header.style.top = "-15%"
            }
            break
      case ('false') :
        header.style.position = 'static'
        break
      }
    }
    prevScrollpos = currentScrollPos;
  } else {
    mobileNavbar.style.position === 'static'
  }
}

//this method is responsible for the occurence of the social media bar
async function moveSocialMedias() {
  let margin = parseInt(localStorage.getItem('margin'))
  var currentScrollPos = window.pageYOffset;
  let socialMedais = document.getElementsByClassName('socialmedia-buttons')[0]
  let socialMediahidePoint
  let bottomSMHidePoint
  window.localStorage.getItem('insertHeader') === 'true'?
    socialMediahidePoint = window.innerHeight * 0.50 :
    socialMediahidePoint = window.innerHeight * 0.05
  //sets value to bottomSMHidepoint 
   switch (location.pathname) {
     case ('/index.html'):
       bottomSMHidePoint = document.body.scrollHeight * 1
       break;
     case('/location.html'):
       bottomSMHidePoint = document.body.scrollHeight * 0.6
       break;
     case('/about.html'):
       bottomSMHidePoint = document.body.scrollHeight * 0.7
       break
     case('/places.html'):
       bottomSMHidePoint = document.body.scrollHeight * 1
       break
   }
  
  socialMedais.style.transition = 'left 0.5s'

  //Will be executed if documents width is more than 1000 px and side margin is more than 5%
  if(window.innerWidth > 1000 && margin > 5) {
    if(window.pageYOffset < socialMediahidePoint || currentScrollPos > bottomSMHidePoint * 0.6) {
      socialMedais.style.left = '-7%'
    } else {
      socialMedais.style.left = '0'
    }
  }
}

//Dynamical change of the footer section
async function footerSectionsBehaviour() {
  let footer = document.getElementsByClassName('footer-container')[0]
  footer.style.transition = 'all 2s'
  let config = { threshold: [0, 0.5, 1] }
  
  let changeFooterBackgroung = (entries) => {
    if(entries[0].isIntersecting) {
      if(entries[0].intersectionRatio  > 0 && entries[0].intersectionRatio  <  0.25) {
        entries[0].target.style.backgroundColor = '#11fd11'
      } else if (entries[0].intersectionRatio  > 0.25 && entries[0].intersectionRatio < 0.5) {
        entries[0].target.style.backgroundColor = 'rgba(0, 25, 253, 0.7)'
      } else if (entries[0].intersectionRatio  > 0.5 && entries[0].intersectionRatio < 0.75) {
        entries[0].target.style.backgroundColor = 'rgba(0, 0, 100, 0.6)'
      } else if (entries[0].intersectionRatio  > 0.75 && entries[0].intersectionRatio < 1) {
        entries[0].target.style.backgroundColor = '#222222'
      } 
    } else {
      entries[0].target.style.backgroundColor = 'black'
      console.log('green' + entries[0].target.style.backgroundColor)
    }
  }
 
  let observer = new IntersectionObserver(changeFooterBackgroung, config)

  observer.observe(footer)
}

//This method executes two methods above asynchronously 
async function bodyChildrenBehaviour() {
  await changeHeaderMargin()
  await moveSocialMedias()
  await footerSectionsBehaviour()
}

//Attaching bodyChildrenBehavior method to the window.onscroll event
window.addEventListener('scroll', bodyChildrenBehaviour)