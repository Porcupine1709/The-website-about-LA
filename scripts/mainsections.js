//Aligns items according to margin
const divSections = Array.from(document.body.children).filter(item => item.tagName === 'DIV')
let margin = parseInt(localStorage.getItem('margin'))

if (location.pathname === '/index.html') {
   divSections.splice(8)
   divSections.splice(2, 2)
   divSections.shift()
}

if (window.innerWidth > 500)
   divSections.forEach(element => {
     if (localStorage.getItem('gridGap')  !== 'true') {
         element.style.gridGap = '0'
     }
     element.style.width =  `${100 - (margin * 2)}%`
     element.style.marginLeft = `${margin}%`
   })