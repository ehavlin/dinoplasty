class App {
    constructor(selectors){
        this.dinos = []
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)
        document.querySelector(selectors.formSelector).addEventListener('submit', this.addDinoFromForm.bind(this))
        this.category = document.querySelector(selectors.categorySelector)           
        this.load()
    }

    load() {
        const dinoJSON = localStorage.getItem('dinos')
        const dinoArray = JSON.parse(dinoJSON)
        if (dinoArray){
            dinoArray.reverse().map(this.addDino.bind(this))
        }  
    }

    save() {
        localStorage.setItem('dinos', JSON.stringify(this.dinos))
    }

    markFavorite(dino, event){
        const listItem = event.target.closest('.dino')
        const btn = event.target
        dino.favorite = !dino.favorite

        if (dino.favorite){
            listItem.classList.add('fav')
        }
        else {
            listItem.classList.remove('fav')
        }

        this.save()
    }

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
    }

    editEntry(dino, event) {
        const item = event.target.closest('.dino')
        const name = item.querySelector('.dino-name')
        const habit = item.querySelector('.dino-habit')

        const btn = item.querySelector('.edit.button')
        const icon = btn.querySelector('i.fa')
        
        if (name.isContentEditable){
            name.contentEditable = false
            habit.contentEditable = false
            
            icon.classList.remove('fa-check')
            icon.classList.add('fa-pencil')
            btn.classList.remove('success')

            dino.name = name.textContent
            dino.eatHabit = habit.textContent

            this.save()
        }
        else {
            name.contentEditable = true
            habit.contentEditable = true

            icon.classList.remove('fa-pencil')
            icon.classList.add('fa-check')
            btn.classList.add('success')

            
        }
    }

    moveUp(dino, event){
        const listItem = event.target.closest('.dino')

        const index = this.dinos.findIndex((currentDino, i) => {
            return currentDino.id === dino.id
        })

        if (index > 0){
            this.list.insertBefore(listItem, listItem.previousElementSibling)

            const previousDino = this.dinos[index - 1]
            this.dinos[index - 1] = dino
            this.dinos[index] = previousDino

            this.save()
        }
    }

    moveDown(dino, event){
        const listItem = event.target.closest('.dino')

        const index = this.dinos.findIndex((currentDino, i) => {
            return currentDino.id === dino.id
        })

        if (index < this.dinos.length - 1){
            this.list.insertBefore(listItem.nextElementSibling, listItem)

            const nextDino = this.dinos[index + 1]
            this.dinos[index + 1] = dino
            this.dinos[index] = nextDino

            this.save()
        }
    }

    saveOnEnter(dino, event){
        if (event.key === 'Enter'){
            this.editEntry(dino, event)
        }
    }
    
    addDino(dino) {
        const listItem = this.renderListItem(dino)
        this.list.insertBefore(listItem, this.list.firstChild)

        this.dinos.unshift(dino)

        this.save()

        if (dino.id > this.max)
            this.max = dino.id
    }

    addDinoFromForm(event) {
        event.preventDefault()
        const dino = {
            id: this.max + 1,
            name: event.target.dinoName.value,
            favorite: false,
            eatHabit: event.target.eatHabit.value,
        }
           
        this.addDino(dino)

        event.target.reset()
    }

    categorizeDino(dino){
        const categories = this.category

        if (dino.eatHabit === 'Carnivore'){
            const div = categories.querySelector('#dino-carnivore')
            const item = document.createElement('li')
            item.textContent = dino.name
            div.appendChild(item)
            // const carn = categories.querySelector('.dino.carnivore')
            // const item = document.createElement('span')
            // item.textContent = dino.name
            // carn.appendChild(item)
        }
        else if (dino.eatHabit === 'Herbivore') {
            const div = categories.querySelector('#dino-herbivore')
            const item = document.createElement('li')
            item.textContent = dino.name
            div.appendChild(item)
        }
        else if (dino.eatHabit === 'Omnivore') {
            const div = categories.querySelector('#dino-omnivore')
            const item = document.createElement('li')
            item.textContent = dino.name
            div.appendChild(item)
        }
    }

    renderListItem(dino) {     
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = dino.id

        if (dino.favorite){
            item.classList.add('fav')
        }

        if (dino.eatHabit) {
            item.querySelector('.dino-habit').textContent = dino.eatHabit
        }

        this.categorizeDino(dino)

        item.querySelector('.dino-name').textContent = dino.name
        item.querySelector('.dino-name').setAttribute('title', dino.name)
        item.querySelector('.dino-name').addEventListener('keypress', this.saveOnEnter.bind(this, dino))
        item.querySelector('.dino-habit').setAttribute('title', dino.eatHabit)
        item.querySelector('.dino-habit').addEventListener('keypress', this.saveOnEnter.bind(this, dino))
        item.querySelector('button.remove').addEventListener('click', this.deleteEntry.bind(this))
        item.querySelector('button.fav').addEventListener('click', this.markFavorite.bind(this, dino))
        item.querySelector('button.up').addEventListener('click', this.moveUp.bind(this, dino))
        item.querySelector('button.down').addEventListener('click', this.moveDown.bind(this, dino))
        item.querySelector('button.edit').addEventListener('click', this.editEntry.bind(this, dino))

        return item
    }
}

const app = new App({
    formSelector: '#dino-form',
    listSelector: '#dino-list',
    templateSelector: '.dino.template',
    categorySelector: '#dino-category',
})