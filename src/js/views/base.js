export const elements = {
    searchForm : document.querySelector('.search'),
    searchInp : document.querySelector('.search__field'),
    searchResults: document.querySelector('.results__list'),
    searchRes: document.querySelector('.results'),
    searchPages:document.querySelector('.results__pages'),
    recipe : document.querySelector('.recipe'),
    shopping : document.querySelector('.shopping__list'),
    likeMenu : document.querySelector('.likes__field'),
    likeBtn : document.querySelector('.likes__list'),
    clearBtn : document.querySelector('#clear-cart'),
    clearList : document.querySelector('#clear-list'),

}
const elementString = {
    loader : 'loader',
}
export const renderSpinner =(parent)=>{
    const loader = `
    <div class='${elementString.loader}'>
    <svg>
    <use href='img/icons.svg#icon-cw'></use>
    </svg>
    </div>`

    parent.insertAdjacentHTML('afterbegin',loader)
}

export const clearSpinner = ()=>{
    const loader = document.querySelector(`.${elementString.loader}`)

    if(loader){
        loader.parentElement.removeChild(loader)
    }
}