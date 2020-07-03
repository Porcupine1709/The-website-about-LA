//Aligns items according to margin
const divSections = Array.from(document.body.children).filter(item => item.tagName === 'DIV')
let margin = parseInt(localStorage.getItem('margin'))

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
     break
 }


if (window.innerWidth > 500)
   divSections.forEach(element => {
     if (localStorage.getItem('gridGap')  !== 'true') {
         element.style.gridGap = '0'
     }
     element.style.width =  `${100 - (margin * 2)}%`
     element.style.marginLeft = `${margin}%`
   })