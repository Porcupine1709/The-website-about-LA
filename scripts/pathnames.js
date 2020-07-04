const returnDivSections = (pathname) => {
    let divSections = Array.from(document.body.children).filter(item => item.tagName === 'DIV')
    /*Actually I could write a method in other (module) script that defines divSections content and returns it,
    because same switch statement is used in scripts/mainsection.js script, but the reason why I didn't that 
    is because modules are not supported by all of the browsers*/
    switch (pathname) {
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
    return DivSections
}

export default returnDivSections