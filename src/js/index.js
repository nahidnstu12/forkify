import {Search} from './models/Search.model'
import {Recipe} from './models/Recipe.model'
import List from './models/List.model'
import Likes from './models/Likes.model'
import * as searchView from './views/search.views'
import * as recipeView from './views/recipe.views'
import * as listView from './views/list.views'
import * as likeView from './views/likes.views'
import {elements,renderSpinner,clearSpinner} from './views/base'


const state = {}
window.s = state
/**
 * Search Controller
 */
const ctrlSearch = async ()=>{
    const query = searchView.getInput()
    
    if(query){

        state.search = new Search(query)

        searchView.clearField()
        searchView.clearSearchResult()
        renderSpinner(elements.searchRes)
        
        try{
        await state.search.getResult()
        clearSpinner()
        searchView.renderResult(state.search.recipes)

        }catch(e){
            alert('Something wrong')
        }
    }
}

// submit search
elements.searchForm.addEventListener('submit',e =>{
    e.preventDefault()
    ctrlSearch()
})

// pagination
elements.searchPages.addEventListener('click',e =>{
    const btn = e.target.closest('.btn-inline')
    if(btn){
        const goto = parseInt(btn.dataset.goto)
        searchView.clearSearchResult()
        searchView.renderResult(state.search.recipes,goto)
    }
})

/**
 * Recipe Controller
 */
 
 const ctrlRecipe = async() =>{
    const id =window.location.hash.replace('#','')

    if(id){
        
        renderSpinner(elements.recipe)
        recipeView.clearRecipe()
        if(state.search){
            searchView.highlighted(id)
        }
        state.recipe = new Recipe(id)

        try{
        await state.recipe.getRecipe()
        state.recipe.calcTime()
        state.recipe.calcServing()
        state.recipe.parseIngredients()
        
        clearSpinner()
        recipeView.renderRecipe(state.recipe,state.likes.isLiked(id))
        // console.log(state.recipe)

        }catch(e){
            // alert('Error processing recipe')
            alert(e)
        }
    }
 }

//  recipe control
['hashchange','load'].forEach(e =>window.addEventListener(e,ctrlRecipe))

/**
 * List Controller
 */

 const ctrlList = () =>{
    if(!state.lists) {
         state.lists = new List()
        }
    state.recipe.ingredients.forEach(el =>{
       const itm = state.lists.addItem(el.count,el.unit,el.ingredient)
       listView.renderItem(itm)
    })
    listView.toggleListMenu(state.lists.getNumList())
 }

//  handle shopping list
 elements.shopping.addEventListener('click',e =>{
    const id = e.target.closest('.shopping__item').dataset.itemid

    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        state.lists.deleteItem(id)
        listView.deleteItem(id)
    }else if(e.target.matches('.shopping__count-value, .shopping__value *')){
        const val = parseFloat(e.target.value,10)
        if(val>0){
       state.lists.updateItem(id,val)}
      
   }
})
function clearList() {
     
    while (elements.shopping.firstChild) {
        elements.shopping.removeChild(elements.shopping.firstChild)          
    }
    state.lists.clearStorage()
    state.lists = new List()
    listView.toggleListMenu(state.lists.getNumList())
}
 elements.clearList.addEventListener('click',clearList)


 /**
 * Likes Controller
 */

 const ctrlLike = () =>{
    if(!state.likes){ state.likes = new Likes()}

    const currentId = state.recipe.Id
    if(!state.likes.isLiked(currentId)){

        const newLike = state.likes.addItem(
            currentId,
            state.recipe.title,
            state.recipe.author,
            state.recipe.image)

        //toggle btn
        likeView.toggleLikeBtn(true)
        // set ui
        likeView.renderLike(newLike)
       
    }else{
        state.likes.deleteItem(currentId)
         //toggle btn
         likeView.toggleLikeBtn(false)
        // set ui
        likeView.deleteLike(currentId)
       

    }
    likeView.toggleLikeMenu(state.likes.getNumLike())
 }

 function clearLike() {
     
    while (elements.likeBtn.firstChild) {
        elements.likeBtn.removeChild(elements.likeBtn.firstChild)          
    }
    state.likes.clearStorage()
    state.likes = new Likes()
    likeView.toggleLikeBtn(false)
    likeView.toggleLikeMenu(state.likes.getNumLike())
}
 elements.clearBtn.addEventListener('click',clearLike)

//  recipe serving, controlList, ControlLike handling
 elements.recipe.addEventListener('click',e =>{   
    if(e.target.matches('.btn-dec, .btn-dec *')){
        if(state.recipe.serving >1){
        state.recipe.updateServing('dec')
        recipeView.updateServingsIngredients(state.recipe)
        }
    }else if(e.target.matches('.btn-inc, .btn-inc *')){
        state.recipe.updateServing('inc')
        recipeView.updateServingsIngredients(state.recipe)
    }else if(e.target.matches('.recipe__btn-add, .recipe__btn-add *')){
        ctrlList()
    }else if(e.target.matches('.recipe__love, .recipe__love *')){
        ctrlLike()
    }
})

// Local Storage
window.addEventListener('load',()=>{
    state.likes = new Likes()
    state.likes.readStorage()
    likeView.toggleLikeMenu(state.likes.getNumLike())
    state.likes.likes.forEach(like => likeView.renderLike(like))

    state.lists = new List()
    state.lists.readStorage()
    listView.toggleListMenu(state.lists.getNumList())
    state.lists.items.forEach(list => listView.renderItem(list))
})

 