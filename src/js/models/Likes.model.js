export default class Likes{
    constructor(){
        this.likes = []
    }
    addItem(id,title,author,img){
        const itm = {id,title,author,img}
        this.likes.push(itm)
        this.persistData()
        return itm
    }
    deleteItem(id){
        const index = this.likes.findIndex(el => el.id===id)
        this.persistData()
        return this.likes.splice(index,1)
    }
    isLiked(id){
        return this.likes.findIndex(el => el.id===id) !== -1
    }
    getNumLike(){
        return this.likes.length
    }
    persistData(){
        localStorage.setItem('likes',JSON.stringify(this.likes))
    }
    readStorage(){
       const storage = JSON.parse(localStorage.getItem('likes'))
       if(storage){
            this.likes = storage
       }
    }
    clearStorage(){
        localStorage.removeItem('likes')
    }
    
}