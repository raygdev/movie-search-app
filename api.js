import { createRenderContent, el, handleNA, setButtonContent } from './utils.js'

const key ="8351c96"
const url =`http://www.omdbapi.com/?apikey=${key}&`

const form = document.getElementById('form')
const content = document.getElementById('content')



form.addEventListener('submit', (e)=>{
    setButtonContent(true, '...Searching')
    e.preventDefault()
    let formData = new FormData(form)
    const searchValue = formData.get('search')
    if(!searchValue.length){
        setButtonContent(false,'Search')
        return content.innerHTML = `<p>You need to add something to the search!</p>`
    }
    getMovieTitles(searchValue).then(getMoviesData).then(renderContent)
})

/**
 * 
 * @param {string} searchValue from form input
 * @returns  a movies object
 */


async function getMovieTitles(searchValue){
    content.innerHTML = `<div class="loader"></div>
    <p>..loading</p>`
    let res = await fetch(url+`s=${searchValue}`)
    let movies = await res.json()
    return movies
}

/**
 * 
 * @param {object} movies an object with movie descriptors
 * @returns a fulfilled promise array or false if Response is False
 */

function getMoviesData(movies){
    if(movies.Response === 'False'){
        return false
    }
    const movieTitles = movies.Search.map(movie => movie.Title)
    const moviesArray = movieTitles.map(async title => {
        let res =  await fetch(url+`t=${title}`)
        let movie = await res.json()
        return({
            title:movie.Title,
            rating: movie.imdbRating,
            duration: movie.Runtime,
            year:movie.Year,
            category: movie.Genre,
            description: handleNA(movie,'Plot'),
            image: movie.Poster
        })
    })
    return Promise.all(moviesArray)
}



/**
 * 
 * @param {array} moviesArray an array of movie objects
 * @returns an error element if moviesArray is false or a dom node for each movie
 */


function renderContent(moviesArray){
     content.innerHTML = ''
     
     if(!moviesArray) {
        setButtonContent(false, 'Search')
        return content.innerHTML = `<p>Couldn't find any titles related to that search!</p>`
     } 

    createRenderContent(moviesArray, content)
     
    setButtonContent(false, 'Search')
}


