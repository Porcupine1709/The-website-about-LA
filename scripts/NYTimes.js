async function requestingNYT(weekAgo, now) {
   
   let response = fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=los&angeles&facet_field=day_of_week&facet=true&begin_date=${weekAgo}&end_date=${now}&api-key=<key>`)

   let json = await response.then(data => data.json())
   return json
}

async function getDataFromNYT(){
  const days = 7
  let currentTime = new Date()
  let oneWeekAgo = new Date(currentTime.getTime() - (days * 24 * 60 * 60 * 1000))
  let now = currentTime.toLocaleDateString().split('/')
  let weekAgo = oneWeekAgo.toLocaleDateString().split('/')
  data = await requestingNYT(weekAgo[2] + weekAgo[1] + weekAgo[0], now[2] + now[1] + now[0])
  return(data.response.docs)
}

async function extractNYTData() {
    let extract = await getDataFromNYT()
    let articles  = []
    for(let i = 0; i < extract.length; i++){
        let article = {
            headline: '', 
            text: '', 
            url: '',
            image: 'http://www.nytimes.com/'
        }
        article.headline = extract[i].headline.print_headline
        article.text = extract[i].abstract
        article.url = extract[i].web_url
        try {
           article.image += extract[i].multimedia[0].url
        } catch (TypeError) {
           article.image = 'images/NYT.png'
        } 
        articles.push(article)
    }
    articles = articles.filter(article => article.headline !== null)
    return articles
} 

const freshData = extractNYTData()
freshData.then(data => renderNYTData(data))

let articleIndex = 0
document.getElementById('previous-article').addEventListener('click', showPrevArticle)
document.getElementById('next-article').addEventListener('click', showNextArticle)
const articleSection = document.getElementsByClassName('article')
let spinners = document.getElementsByClassName('fa-cog')


async function renderNYTData(freshData) {
    
    for(let i = 0; i < 2; i++) {
      spinners[i].style.display = 'none'
      articleSection[i].appendChild(createDiv(freshData[i]))
    }
}


function showPrevArticle(){
  articleIndex > 1? articleIndex-- : freshData.then(data => articleIndex = data.length - 1)
  console.log(articleIndex)
  for(let i = 0; i < articleSection.length; i++) {
    articleSection[i].removeChild(articleSection[i].children[1])
    let div
    freshData.then(data => {
        div = createDiv(data[articleIndex - i])
        articleSection[i].appendChild(div)
      })
  }
}

function showNextArticle() {
  freshData.then(data => articleIndex < data.length - 2? articleIndex++ : articleIndex = 0)
  console.log(articleIndex)
  for(let i = 0; i < articleSection.length; i++) {
    articleSection[i].removeChild(articleSection[i].children[1])
    let div
    freshData.then(data => {
        div = createDiv(data[articleIndex + i])
        articleSection[i].appendChild(div)
      })
  }
}



function createDiv(freshData){
  let container = document.createElement('div')
      let textContainer = document.createElement('div')
      let link = document.createElement('a')
      let article = document.createElement('div')
      let header = document.createElement('h3')

      header.innerHTML = freshData.headline

      let text = document.createElement('p')
      text.innerHTML = freshData.text
      article.appendChild(header)
      article.appendChild(text)
      textContainer.appendChild(article)
      textContainer.classList.add('text-article')
      container.style.backgroundImage = `url(${freshData.image})`
      container.classList.add('fresh-article')
      container.appendChild(textContainer)
      container.addEventListener('click', () => window.open(freshData.url))
      return container
}

