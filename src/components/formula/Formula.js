import { ExcelComponent } from "@core/ExcelComponent";
import {$} from "@core/dom";
import formulaImg from '../../assets/icons/formula.png'

export class Formula extends ExcelComponent{
    static className = 'formula'

    constructor($root, options){
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText'],
            ...options
        })
    }

    toHTML(){
        return `
            <div class="formula__info">
                <img class="formula__icon" src=${formulaImg} alt="formula">
            </div>
            <div id="formula" class="formula__input" contenteditable spellcheck="false"></div>
        `
    }

    init(){
        super.init()

        this.$formula = this.$root.find('#formula')

        this.$on('table:select', $cell => {
            this.$formula.text($cell.data.value || '')
        })
    }

    storeChanged(changes) {
        this.$formula.text(changes.currentText)
    }

    onInput(event){
        this.$emit('formula:input', $(event.target).text())
    }

    onKeydown(event){
        const keys = ['Enter', 'Tab']
        if(keys.includes(event.key)){
            event.preventDefault()
            this.$emit('formula:done')
        }
    }
}