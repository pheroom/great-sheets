import { ExcelComponent } from "@core/ExcelComponent";
import {addRowsForm, createTable, shouldAddRows, getAddRowsInputValue} from "./table.template";
import { resizeHandler } from './table.resize'
import { shouldResize, isCell, matrix, nextSelector } from "./table.functions";
import { TableSelection } from "./TableSelection";
import { $ } from '@core/dom'
import * as actions from "@/redux/actions";
import {defaultStyles} from "@/constants";
import {parse} from "@/parse";

export class Table extends ExcelComponent{
    static className = 'table'

    constructor($root, options){
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }

    toHTML(){
        return createTable(this.store.getState()) + addRowsForm()
    }

    prepare(){
        this.selection = new TableSelection()
    }

    init(){
        super.init()

        const $cell = this.$root.find('[data-id="0:0"]')
        this.selectCell($cell)

        this.$on('formula:input', text => {
            this.selection.current
                .attr('data-value', text)
                .text(parse(text))
            this.updateTextInStore(text)
        })

        this.$on('formula:done', () => {
            this.selection.current.focus(0)
        })

        this.$on('toolbar:applyStyle', value => {
            this.selection.applyStyle(value)
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selection.selectedIds
            }))
        })
    }

    selectCell($cell){
        this.selection.select($cell)
        this.$emit('table:select', $cell)
        const styles = $cell.getStyles(Object.keys(defaultStyles))
        this.$dispatch(actions.changeStyles(styles))
    }

    async resizeTable(event){
        const data = await resizeHandler(this.$root, event)
        this.$dispatch(actions.tableResize(data))
    }

    onMousedown(event){
        if(shouldAddRows(event)){
            const rowsCount = getAddRowsInputValue()
            this.$dispatch(actions.changeRowCount(rowsCount))
        } else if(shouldResize(event)){
            this.resizeTable(event)
        } else if(isCell(event)){
            const $target = $(event.target)
            this.$emit('table:select', $target)
            if(event.shiftKey) {
                event.preventDefault()
                const $cells = matrix($target, this.selection.current, true)
                    .map(row => row.map(id => this.$root.find(`[data-id="${id}"]`)))
                this.selection.selectGroup($cells)
            } else {
                this.selectCell($target)
            }
        }
    }

    onKeydown(event){
        const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp']
        const {key} = event
        if(key === 'Enter' && event.shiftKey) {
            event.preventDefault()
        } else if(keys.includes(key) && !event.shiftKey && !event.ctrlKey){
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, id, this.store.getState().rowsCount))
            this.selectCell($next)
        } else if(['ArrowLeft', 'ArrowRight'].includes(key) && event.ctrlKey){
            event.preventDefault()
            this.selection.current.focus(key === 'ArrowRight' ? 1 : -1)
        }
    }

    updateTextInStore(value){
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }))
    }

    onInput(event){
        const $target = $(event.target)
        if($target.data.type !== 'input-add-rows'){
            const value = $target.text()
            $target.data.value = value
            this.updateTextInStore(value)
        }
    }
}


