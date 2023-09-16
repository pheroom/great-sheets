import {matrix} from "@/components/table/table.functions";

export class TableSelection{
    static className = 'table__row-data-cell--selected'
    static classLeft = 'table__row-data-cell--selected-left'
    static classRight = 'table__row-data-cell--selected-right'
    static classTop = 'table__row-data-cell--selected-top'
    static classBottom = 'table__row-data-cell--selected-bottom'
    static classFill = 'table__row-data-cell--selected-fill'

    constructor(){
        this.group = []
        this.current = null
    }

    select($el){
        this.clear()
        this.group.push($el)
        this.current = $el
        $el.focus(0).addClass(TableSelection.className)
    }

    clear(skipOne = false){
        this.group.forEach($el => {
            skipOne || $el.removeClass(TableSelection.className)
            $el.removeClass(TableSelection.classTop)
            $el.removeClass(TableSelection.classBottom)
            $el.removeClass(TableSelection.classLeft)
            $el.removeClass(TableSelection.classRight)
            $el.removeClass(TableSelection.classFill)
        })
        this.group = []
    }

    get selectedIds(){
        return this.group.map($el => $el.id())
    }

    selectGroup($group = [[]]){
        this.clear(true)
        const n = $group.length
        const m = $group[0].length
        $group[0].forEach(($el, i) => {
            if(i === 0) $el.addClass(TableSelection.classLeft)
            if(i === m - 1) $el.addClass(TableSelection.classRight)
            //
            $el.addClass(TableSelection.classTop)
        })
        $group[n-1].forEach(($el, i) => {
            //
            if(i === 0) $el.addClass(TableSelection.classLeft)

            if(i === m - 1) $el.addClass(TableSelection.classRight)
            $el.addClass(TableSelection.classBottom)
        })
        for (let i = 1; i < n - 1; i++) {
            //
            $group[i][0].addClass(TableSelection.classLeft)

            $group[i][m-1].addClass(TableSelection.classRight)
        }
        this.group = $group.reduce((prev, cur) => {
            return [...cur, ...prev]
        }, [])
        this.group.forEach($el => $el.addClass(TableSelection.classFill))
        this.current.focus()
    }

    applyStyle(style){
        this.group.forEach($el => $el.css(style))
    }
}