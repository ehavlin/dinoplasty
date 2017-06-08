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
        this.list.appendChild(listItem)

        this.dinos.push(dino.name)

        const buttons = listItem.childNodes
        buttons[0].addEventListener('click', this.deleteEntry)
        buttons[1].addEventListener('click', this.deleteEntry)
        buttons[2].addEventListener('click', this.markFavorite)
        buttons[3].addEventListener('click', this.moveUp)
        buttons[4].addEventListener('click', this.moveDown)

        ++ this.max
    },

    renderListItem(dino) {
        const li = document.createElement('li')
        li.textContent = dino.name
        
        const delBtn = document.createElement('input')
        delBtn.type = 'button'
        delBtn.id = 'deleteButton'
        delBtn.value = 'Delete'
        li.appendChild(delBtn)

        const favBtn = document.createElement('input')
        favBtn.type = 'button'
        favBtn.id = 'favoriteButton'
        favBtn.value = 'Favorite'
        li.appendChild(favBtn)

        const upBtn = document.createElement('input')
        upBtn.type = 'button'
        upBtn.id = 'upButton' 
        upBtn. value = '^'
        li.appendChild(upBtn)

        const downBtn = document.createElement('input')
        downBtn.type = 'button'
        downBtn.id = 'downButton'
        downBtn. value = 'V'
        li.appendChild(downBtn)

        return li
    },
}

app.init({
    formSelector: '#dino-form',
    listSelector: '#dino-list',
})