import {createToolbar} from "@/components/toolbar/toolbar.template";
import {$} from "@core/dom";
import {ExcelStateComponent} from "@core/ExcelStateComponent";
import {defaultStyles} from "@/constants";

export class Toolbar extends ExcelStateComponent{
    static className = 'toolbar'

    constructor($root, options){
        super($root, {
            name: 'Toolbar',
            listeners: ['click', 'change'],
            subscribe: ['currentStyles'],
            ...options
        })
    }

    prepare() {
        this.initState(defaultStyles)
    }

    get template(){
        return createToolbar(this.state)
    }

    toHTML(){
        return this.template
    }

    storeChanged(changes) {
        this.setState(changes.currentStyles)
    }

    onClick(event){
        const $target = $(event.target)
        if($target.data.type === 'button'){
            const value = JSON.parse($target.data.value)
            this.$emit('toolbar:applyStyle', value)
        }
    }

    onChange(event){
        const $target = $(event.target)
        if($target.data.type === 'color-input'){
            const value = event.target.value
            this.$emit('toolbar:applyStyle', {[$target.data.field]: value})
        }
    }
}
