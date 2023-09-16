import {toInlineStyles} from "@core/utils";
import {defaultStyles} from "@/constants";
import {parse} from "@/parse";

const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function toCell(state, row) {
    return function(_, col) {
        const width = getWidth(state.colState, col)
        const id = `${row}:${col}`
        const currentValue = state.dataState[id]
        const styles = toInlineStyles({
            ...defaultStyles,
            ...state.stylesState[id]
        })

        return `
            <div 
                class="table__row-data-cell" 
                contenteditable 
                data-type="cell"
                data-id="${row}:${col}"
                data-col="${col}"
                data-value="${currentValue || ''}"
                style="${styles}; width: ${width}"
                spellcheck="false"
            >
                ${parse(currentValue) || ''}  
            </div>
        `
    }
}

function toColumn({col, index, width}) {
    return `
        <div 
            class="table__row-data-column" 
            data-type="resizable" 
            data-col="${index}"
            style="width: ${width}" 
        >
            ${col}
            <div class='table__col-resize' data-resize='col'></div>
        </div>
    `
}

function createRow(index, content, rowState) {
    const resize = index
        ? `<div class='table__row-resize' data-resize='row'></div>`
        : ''
    const height = getHeight(rowState, index)

    return `
        <div 
            class="table__row" 
            data-type="resizable" 
            data-row="${index}"
            style="height: ${height}"
        > 
            <div class="table__row-info">
                ${index}
                ${resize}
            </div>
            <div class="table__row-data">
                ${content}
            </div>
        </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

function withWidthFrom(state) {
    return function (col, index){
        return {
            col, index, width: getWidth(state.colState, index)
        }
    }
}

export function addRowsForm(){
    return `<div class="add-rows-form">
                <input data-type="input-add-rows" id="input-add-rows" class="input add-rows-form__input" type="number" value="10"/> 
                <button class="add-rows-form__button" data-type="button-add-rows">Добавить</button>
                <i class="add-rows-form__i">Изменения применятся после обновления страницы!</i>
           </div>`
}

export function shouldAddRows(event){
    return event.target.dataset.type === "button-add-rows"
}

export function getAddRowsInputValue(){
    const val = document.getElementById('input-add-rows').value
    return val > 0 ? val : 10
}

export function createTable(state) {
    const colsCount = CODES.Z - CODES.A + 1
    const rowsCount = state.rowsCount
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(withWidthFrom(state))
        .map(toColumn)
        .join('')

    rows.push(createRow('', cols, {}))

    for(let row = 0; row < rowsCount; row++){
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(state, row))
            .join('')
        rows.push(createRow(row+1, cells, state.rowState))
    }

    return rows.join('')
}