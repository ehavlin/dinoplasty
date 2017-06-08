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
            .addEventListener('submit', this.addDino.bind(this))
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
       // this.dinos.splice(, 1)
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

    addDino(event) {
        event.preventDefault()
        const dino = {
            id: this.max + 1,
            name: event.target.dinoName.value,
        }
            const listItem = this.renderListItem(dino)
            this.list.insertBefore(listItem, this.list.firstChild)

            this.dinos.unshift(dino)

            ++ this.max

            event.target.reset()
    },

    renderListItem(dino) {     
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = dino.id
        item.querySelector('.dino-name').textContent = dino.name
        item.querySelector('button.remove').addEventListener('click', this.deleteEntry.bind(this))

        return item
    },

}

app.init({
    formSelector: '#dino-form',
    listSelector: '#dino-list',
    templateSelector: '.dino.template',
})