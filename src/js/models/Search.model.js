// Global app controller
const axios = require("axios");

export class Search {
    constructor(query){
        this.query = query
        
    }
    async getResult(){
   
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`)
            this.recipes = res.data.recipes
        }catch(e){
            alert(e)
        }
    
    }
}
