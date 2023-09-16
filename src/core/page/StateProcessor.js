import {debounce} from "@core/utils";

export class StateProcessor{
    constructor(client, delay=300) {
        this.client = client
        this.listen = debounce(this.listen.bind(this), delay)
    }

    listen(state){
        this.client.save(state)
    }

    save(...args){
        return this.client.save(...args)
    }

    get(){
        return this.client.get()
    }

    getAll(){
        return this.client.getAll()
    }
}