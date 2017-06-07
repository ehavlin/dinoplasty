const app = {
    init(selectors){
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', this.addDino.bind(this))
    },

    addDino(event) {
        event.preventDefault()
        const dino = {
            id: this.max + 1,
            name: event.target.dinoName.value,
        }

        const listItem = this.renderListItem(dino)
        this.list.appendChild(listItem)

        ++ this.max
    },

    renderListItem(dino) {
        const li = document.createElement('li')
        li.textContent = dino.name
        return li
    },
}

app.init({
    formSelector: '#dino-form',
    listSelector: '#dino-list',
})