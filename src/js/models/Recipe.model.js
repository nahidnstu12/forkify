const axios = require("axios");

export class Recipe {
    constructor(Id){
        this.Id = Id   
    }
    async getRecipe(){
   
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.Id}`)
            this.title = res.data.recipe.title
            this.author = res.data.recipe.publisher
            this.image = res.data.recipe.image_url
            this.url = res.data.recipe.source_url
            this.ingredients = res.data.recipe.ingredients        
        }catch(e){
            alert(e)
        }    
    }
    calcTime(){
        const numIng = this.ingredients.length
        const period = Math.ceil(numIng/3)
        this.time = period *15
    }
    calcServing (){
         this.serving = 4
     }
    parseIngredients (){
        const unitsLong = ['tablespoons','tablespoon','ounces','ounce','cups','pounds','teaspoons','teaspoon']
        const unitsShort = ['tbsp','tbsp','oz','oz','cup','pound','tsp','tsp']
        const units = [...unitsShort,'g','kg']

        const newIngredients = this.ingredients.map(el =>{
            let ingredient = el.toLowerCase()
            // converts unit short form
            unitsLong.forEach((unit,i)=>{
                ingredient = ingredient.replace(unit,units[i])              
            })
            // remove () from ingredients
            ingredient = ingredient.replace(/ *\([^)]*\) */g,' ')

            // tranform an object for all ingredients
            const arrIng = ingredient.split(' ')
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2))
           
            let objIng

            if(unitIndex > -1){
                // with unit & numbers
                let arrCount = arrIng.slice(0,unitIndex)
                let count 
                if(arrCount === 1){
                    count = eval(arrIng[0].replace('-','+'))
                }else{
                    count = eval(arrIng.slice(0,unitIndex).join('+'))
                }
                objIng ={
                    count,
                    unit:unitsShort[unitIndex],
                    ingredient:arrIng.slice(unitIndex+1).join(' ')
                }
            }else if(parseInt(arrIng[0],10)){
                // without unit but number
                objIng ={
                    count:parseInt(arrIng[0],10),
                    unit:'',
                    ingredient:arrIng.slice(1).join(' ')
                }               
            }else if(unitIndex === -1){
                // without unit or number
                objIng ={
                    count: 1,
                    unit:'',
                    ingredient
                }
            }
            return objIng
        })
        this.ingredients = newIngredients
    }
    updateServing(type){
        // serving
        const newServing = type === 'dec' ? this.serving -1 : this.serving +1

        // ingredients
        this.ingredients.forEach(ing =>{
            ing.count *=(newServing/this.serving) 
        })
        this.serving = newServing
    }     
}