import uniqid from 'uniqid'

export default class List {
    constructor(){
        this.items = []
    }

    addItem (count,unit,ingredient){
        const item = {
            id : uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item)
        this.persistData()
        return item
    }
    deleteItem (id){
        const index = this.items.findIndex(el => el.id===id)
        this.persistData()
        return this.items.splice(index,1)
    }
    updateItem(id,count){
        this.items.find(el => el.id === id).count = count
        this.persistData()

    }
    getNumList(){
        return this.items.length
    }
    persistData(){
        localStorage.setItem('lists',JSON.stringify(this.items))
    }
    readStorage(){
       const storage = JSON.parse(localStorage.getItem('lists'))
       if(storage){
            this.items = storage
       }
    }
    clearStorage(){
        localStorage.removeItem('lists')
    }
}