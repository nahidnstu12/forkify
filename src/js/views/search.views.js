import {elements} from './base'

export const getInput = ()=>elements.searchInp.value
export const clearField = () => elements.searchInp.value = ""
export const clearSearchResult = () => {
    elements.searchResults.innerHTML = ''
    elements.searchPages.innerHTML = ''
}
export const highlighted = id =>{
    const arr = Array.from(document.querySelectorAll('.results__link'))
    arr.forEach(el => {
        el.classList.remove('results__link--active')
    })
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active')
}
export const renderResult = (recipes,page=1,perPage=10) =>{
    const start = (page-1)*perPage
    const end = page*perPage
    // console.log(recipes)
    recipes.slice(start,end).forEach(searchedRecipe)

    renderBtn(page,recipes.length,perPage)
   
}

const searchedRecipe = recipe =>{
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${shortendTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
            `
    elements.searchResults.insertAdjacentHTML('beforeend',markup)
 
}

export const shortendTitle = (title,limit = 17) =>{
    const newTitle = []
    const titleArr = title.split(' ')
    
    if(title.length > limit){
        titleArr.reduce((acc,cur)=>{
        if(acc+cur.length<limit){
        //    console.log( newTitle.push(cur))
        newTitle.push(cur)
        }
        return acc+cur.length
            
        },0)
        return `${newTitle.join(' ')}...`
    }
    return title
}

 const renderBtn = (page,totalRecipe,perPage)=>{
    const pages = Math.ceil(totalRecipe/perPage)
    
    let btn
    if(page === 1 && pages >1){
        btn = createBtn('next',page)
    }else if(pages > page){
        btn = `${createBtn('prev',page)}  ${createBtn('next',page)} `
        
    }else if(pages === page && pages>1){
        btn = createBtn('prev',page)
    }
    elements.searchPages.insertAdjacentHTML('afterbegin',btn)
}
const createBtn =(type,page)=> `
            <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page-1 : page+1}>
            <span>Page ${type === 'prev' ? page-1 : page+1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
           
            </button>`

