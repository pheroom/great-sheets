import {storage} from "@core/utils";

function toHTML(key) {
  const model = storage(key)
  const id = key.split(':')[1]
  return `
  <li class="db__record">
    <a href="#excel/${id}">${model.title}</a>
    <srtong>${new Date(model.openedDate).toLocaleDateString()}</srtong>
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

export function createRecordsTable(){
  const keys = getAllKeys()

  if(!keys.length){
    return `<p>No table yet</p>`
  }

  return `
  <div class="db__list-header">
    <span>Name</span>
    <span>Opening date</span>
  </div>
  <ul class="db__list">
    ${keys.map(toHTML).join('')}
  </ul>
  `
}