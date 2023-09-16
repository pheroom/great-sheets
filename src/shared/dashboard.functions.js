import {storage} from "@core/utils";

function toHTML(id, model) {
    // const model = storage(key)
    // const id = key.split(':')[1]
    return `
        <li>
            <a class="db__record" href="#excel/${id}">
                <span>${model.title}</span>
                <srtong>${new Date(model.openedDate).toLocaleDateString()}</srtong>
            </a>
        </li>
    `
}

function getAllKeys() {
    const keys = []
    for (let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i)
        if(!key.includes('excel')) continue
        keys.push(key)
    }
    return keys
}

export function createRecordsTable(models){
    let sortedModels = Object.entries(models).sort((a,b) => b[1].openedDate - a[1].openedDate)

    if(!sortedModels.length){
        return `<p class="db__no-tables">Таблиц нет</p>`
    }

    return `
        <div class="db__list-header">
            <span>Название</span>
            <span>По дате просмотра</span>
        </div>
        <ul class="db__list">
            ${sortedModels.map(([key, model]) => toHTML(key.split(':')[1], model)).join('')}
        </ul>
    `
}