import {elements} from './base'
import {shortendTitle} from './search.views'

export const toggleLikeBtn = isLiked =>{
    // icons.svg#icon-heart
    const iconString = isLiked ? 'icon-heart':'icon-heart-outlined'

    document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#${iconString}`)
}
export const toggleLikeMenu = num =>{
    elements.likeMenu.style.visibility = num > 0 ? 'visible' :'hidden'

}
export const renderLike = like =>{
    const markup =`
    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="${shortendTitle(like.title)}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${shortendTitle(like.title)}</h4>
                <p class="likes__author">${like.author}</p>
            </div>
            <div class='remove cross'>X</div>
        </a>
    </li>
    `
    // `<div class = "item clearfix" id = "inc-%id%">  
    // <div class = "item__description">%description%</div> 
    // <div class = "right clearfix">  
    //     <div class = "item__value">%value%</div> 
    //     <div class = "item__delete"> 
    // <button class = "item__delete--btn"> x </button>
    //     </div>
    // </div> 
    // </div>`
    elements.likeBtn.insertAdjacentHTML('beforeend',markup)
}

export const deleteLike = id =>{
    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement
    if(el){
        el.parentElement.removeChild(el)
    }

}