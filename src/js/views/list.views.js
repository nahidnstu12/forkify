import {elements} from './base'


export const toggleListMenu = num =>{
    elements.clearList.style.visibility = num > 0 ? 'visible' :'hidden'

}
export const renderItem = itm =>{
    const markup = `
    <li class="shopping__item" data-itemid=${itm.id}>
    <div class="shopping__count">
        <input type="number" value="${itm.count }" step="${itm.count}" class="shopping__count-value">
        <p>${itm.unit}</p>
    </div>
    <p class="shopping__description">${itm.ingredient}</p>
    <button class="shopping__delete btn-tiny">
        <svg>
            <use href="img/icons.svg#icon-circle-with-cross"></use>
        </svg>
    </button>
    </li>
    `
    elements.shopping.insertAdjacentHTML('beforeend',markup)
}

export const deleteItem = id =>{
    const itm = document.querySelector(`[data-itemid=${id}]`)
    itm.parentElement.removeChild(itm)
}
