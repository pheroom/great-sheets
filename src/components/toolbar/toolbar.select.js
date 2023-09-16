import {$} from "@core/dom";

export async function selectHandler($root, event) {
    return new Promise(resolve => {
        const $target = $(event.target)
        const valueBtn = Object.keys(JSON.parse($target.data.value))[0]
        const type = $target.data.type

        shiftClassInModal($root, true)

        document.onclick = e => {
            const $currentTarget = $(e.target)
            const currentType = $currentTarget.data.type

            if (currentType === type) {
                return
            }
            if (currentType === 'selectItem') {
                const value = $currentTarget.data.value
                resolve({
                    [valueBtn]: value
                })
                shiftClassInModal($root)
                selectDestroy()
                return
            }
            shiftClassInModal($root)
            selectDestroy()
        }

    })
}

function selectDestroy() {
    document.onclick = e => null
}

function shiftClassInModal($root, task = false) {
    const $modal = $root.find(`[data-type="select-modal"]`)
    const modalClassName = `${$modal.$el.classList[0]}--hidden`
    !task ? $modal.addClass(modalClassName) : $modal.removeClass(modalClassName)
}