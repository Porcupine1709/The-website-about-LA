async function requestingNYT(weekAgo, now) {
   
   let response = fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=los&angeles&facet_field=day_of_week&facet=true&begin_date=${weekAgo}&end_date=${now}&api-key=hHpSXf4LThosaDW9nPwBSWZELStt18hU`)

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
    console.log(extract[0].multimedia[0].url)
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
    console.log(articles)
} 

extractNYTData()

