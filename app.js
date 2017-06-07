const app = {
    init(selectors){
        this.dinos = []
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
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
        const button = event.target.parentElement
        button.outerHTML = ''
    },

    addDino(event) {
        event.preventDefault()
        const dino = {
            id: this.max + 1,
            name: event.target.dinoName.value,
        }

        const listItem = this.renderListItem(dino)
        this.list.appendChild(listItem)

        this.dinos.push(dino.name)

        const buttons = listItem.childNodes
        buttons[1].addEventListener('click', this.deleteEntry)
        buttons[2].addEventListener('click', this.markFavorite)

        ++ this.max
    },

    renderListItem(dino) {
        const li = document.createElement('li')
        li.textContent = dino.name
        
        const delBtn = document.createElement('input')
        delBtn.type = 'button'
        delBtn.id = 'deleteButton'
        li.appendChild(delBtn)

        const favBtn = document.createElement('input')
        favBtn.type = 'button'
        favBtn.id = 'favoriteButton'
        li.appendChild(favBtn)

        return li
    },
}

app.init({
    formSelector: '#dino-form',
    listSelector: '#dino-list',
})