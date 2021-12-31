document.addEventListener('DOMContentLoaded', () => {

    const monsterListContainer = document.querySelector('div#monster-container')
    const Monster_URL = `http://localhost:3000/monsters/?_limit=50&_page=`
    const backBtn = document.querySelector('#back')
    const forwardBtn = document.querySelector('#forward')
    let page = 1
    console.log(backBtn)
    console.log(forwardBtn)

    let monsterListFetch = fetch(Monster_URL + `${page}`).then(r => r.json())
    
    const newMonsterSubmit = () => {
        const createMonster = document.querySelector('div#create-monster')
        const createForm = document.createElement('form')
        const monsterForm = createMonster.appendChild(createForm)
        monsterForm.id = 'monster-form'

        const name = document.createElement('input')
        name.id = 'name'
        name.setAttribute('placeholder', 'name...')

        const age = document.createElement('input')
        age.id = 'age'
        age.setAttribute('placeholder', 'age...')

        const description = document.createElement('input')
        description.id = 'description'
        description.setAttribute('placeholder', 'description...')

        const btn = document.createElement('button')
        btn.innerText = 'Create' 

        monsterForm.appendChild(name)
        monsterForm.appendChild(age)
        monsterForm.appendChild(description)
        monsterForm.appendChild(btn)

        const sumbitCreate = () => {
            monsterForm.addEventListener('submit', (e) => {
                e.preventDefault()
                fetch(Monster_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    },
                    body: JSON.stringify(formValues())
                })
                .then(re => re.json())
                .then(monsterForm.reset())
            })
        }
        sumbitCreate()
    }

    const formValues = () => {
        const nameInput = document.querySelector('#name')
        const ageInput = document.querySelector('#age')
        const descriptionInput = document.querySelector('#description')
        return {"name": nameInput.value, "age": ageInput.value, "description": descriptionInput.value}

    }

    const populateMonsters = (Element) => {
        Element.then(obj => obj.forEach(monsterData))
    }

    const monsterData = (obj) => {
        const monster = document.createElement('div')
        const monsterContainer = monsterListContainer.appendChild(monster)

        const monsterName = document.createElement('h2')
            monsterName.innerText = obj.name
            monsterContainer.appendChild(monsterName)

        const monsterAge = document.createElement('h4')
            monsterAge.innerText = obj.age 
            monsterContainer.appendChild(monsterAge)

        const monsterBio = document.createElement('p')
            monsterBio.innerText = obj.description
            monsterContainer.appendChild(monsterBio)
    }

    const clearContainer = () => {
        monsterListContainer.innerHTML = ''
    }
    
    populateMonsters(monsterListFetch)
    newMonsterSubmit()
    formValues()

    backBtn.addEventListener('click', () => {
        if (page > 1) {
            clearContainer()
            --page
            let monsterListFetch = fetch(Monster_URL + `${page}`).then(r => r.json())
            populateMonsters(monsterListFetch)
            backBtn.hidden = true
        } 
    })

    forwardBtn.addEventListener('click', () => {
        clearContainer()
        ++page
        let monsterListFetch = fetch(Monster_URL + `${page}`).then(r => r.json())
        populateMonsters(monsterListFetch)
        backBtn.hidden = false
        
    })

})