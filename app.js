const app = {
    init(selectors){
        this.dinos = []
        this.max = 0
        this.list = document
            .querySelector(selectors.listSelector)
        this.template = document
            .querySelector(selectors.templateSelector)
        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', this.addDinoFromForm.bind(this))           
        this.load()
    },

    load() {
        const dinoJSON = localStorage.getItem('dinos')
        const dinoArray = JSON.parse(dinoJSON)
        if (dinoArray){
            dinoArray.reverse().map(this.addDino.bind(this))
        }  
    },

    save() {
        localStorage.setItem('dinos', JSON.stringify(this.dinos))
    },

    markFavorite(event){
        if (event.target.value === 'Unfavorite'){
            event.target.value = 'Favorite'
            event.target.id = 'favoriteButton'            
        }
        else {
            event.target.value = 'Unfavorite'
           event.target.id = 'favoriteButtonClicked'            
        }  
    },

    deleteEntry(event) {
        const listItem = event.target.closest('.dino')
        listItem.remove()

        for (let i = 0; i < this.dinos.length; i++){
            const currentId = this.dinos[i].id.toString()
            if (listItem.dataset.id === currentId) {
                this.dinos.splice(i, 1)
                break;
            }
        }

        this.save()
    },

    moveUp(event){
        let listItem = event.target.parentNode
        if (listItem.previousSibling){
            listItem.parentNode.insertBefore(listItem, listItem.previousSibling)
        }  
    },

    moveDown(event){
        let listItem = event.target.parentNode
        if (listItem.nextSibling){
            listItem.parentNode.insertBefore(listItem, listItem.nextSibling.nextSibling)
        } 
    },
    
    addDino(dino) {
        const listItem = this.renderListItem(dino)
        this.list.insertBefore(listItem, this.list.firstChild)

        this.dinos.unshift(dino)
        this.save()

        ++ this.max
    },

    addDinoFromForm(event) {
        event.preventDefault()
        const dino = {
            id: this.max + 1,
            name: event.target.dinoName.value,
        }
           
        this.addDino(dino)

        event.target.reset()
    },

    renderListItem(dino) {     
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = dino.id
        item.querySelector('.dino-name').textContent = dino.name
        item.querySelector('button.remove').addEventListener('click', this.deleteEntry.bind(this))
        //item.querySelector('button.favorite').addEventListener('click', this.markFavorite)

        return item
    },

}

app.init({
    formSelector: '#dino-form',
    listSelector: '#dino-list',
    templateSelector: '.dino.template',
})