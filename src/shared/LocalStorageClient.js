import {storage} from "@core/utils";

export function storageName(param){
    return `excel:${param}`
}

export class LocalStorageClient{
    constructor(name) {
        this.name = storageName(name)
    }

    save(state, name){
        storage(name ? storageName(name) : this.name, state)
        return Promise.resolve()
    }

    get(){
        return Promise.resolve(storage(this.name))
    }

    getAll(){
        const data = {}
        for (let i = 0; i < localStorage.length; i++){
            const key = localStorage.key(i)
            if(!key.includes('excel')) continue
            const value = storage(key)
            data[key] = {openedDate: value.openedDate, title: value.title}
        }
        return Promise.resolve(data)
    }
}