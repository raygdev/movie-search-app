const submitButton = document.getElementById('searchButton')

/**
 * 
 * @param {string} el the element to be created
 * @returns the created element
 */

 export function el(el){
    return document.createElement(el)
}

/**
 * 
 * @param {object} movie a movie object
 * @param {string} property the property name of the movie object
 * @returns string value based on movie[property] value
 */

 export function handleNA(movie, property){
    let value = movie[property]
    switch(movie[property]){
        case 'N/A': value = 'No Description'
        break;
        case undefined: value = 'No Description'
        break;
        default: value
    }
    return value
}

export function setButtonContent(isDisable, text) {
    submitButton.disabled = isDisable
    submitButton.textContent = text
}

export function createRenderContent(moviesArray, content) {
    const movies = moviesArray.map( movie => {
        let div = el('div')
        div.setAttribute('class','card')
        let figCap = el('figcaption')
        figCap.setAttribute('class','fig')
        let caption = el('caption')
        let dateCaption = el('caption')
        caption.setAttribute('class','title')
        dateCaption.setAttribute('class', 'title')
        caption.textContent = movie.title
        dateCaption.textContent = movie.year
        let description = el('p')
        let image = el('img')
        description.textContent = movie.description
        image.src = (movie.image === 'N/A') ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png': movie.image
        image.alt= movie.title
        figCap.appendChild(caption)
        figCap.appendChild(image)
        figCap.appendChild(dateCaption)
        div.appendChild(figCap)
        div.appendChild(description)
        return div
    })
    content.append(...movies)
}