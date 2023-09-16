import {getHexFromRgb} from "@/shared/getHexFromRgb";

export function toButton(button) {
    // const meta = `data-type="button" data-value='${JSON.stringify(button.value)}'`

    return `
        <button ${button.meta} class="button-icon ${button.active ? 'button-icon--active ' : ''}" >
            <img 
                ${button.meta}
                class='button-icon__icon' 
                src=${button.img} 
                alt=${button.alt}/>
        </button>
    `
}

export function toInput(button) {
    // const meta = `data-type="button" data-value='${JSON.stringify(button.value)}'`

    return `
        <button ${button.meta} class="button-icon ${button.active ? 'button-icon--active ' : ''}" >
            <img 
                ${button.meta}
                class='button-icon__icon' 
                src=${button.img} 
                alt=${button.alt}/>
        </button>
    `
}

export function toColorInput(input){
    return `
        <label for="fill-color" class='color-input__label'>
            <img class='color-input__label-img' src=${input.img} alt=${input.alt}/>
        </label>
        <input 
            class='color-input__input'
            type="color"
            id="fill-color"
            data-field=${input.field}
            data-type="color-input"
            value=${input.value[0] === '#' ? input.value : getHexFromRgb(input.value)} />
    `
}

const colors = [`black`, `white`, `blue`, `yellow`, `green`, `grey`, `red`, `aqua`, `darkgoldenrod`, `deeppink`, `indigo`, `dodgerblue`]

function printColor(colors){
    return colors.map(color => {
        return `
      <div 
        class="select-modal__item" 
        data-type="selectItem" 
        data-value=${color}
        style="height: 15px; width: 15px; background: ${color}"
      ></div>`
    })
}

export function toSelect(button){
    const meta = `
    data-type="selectBtn"
    data-value='${JSON.stringify(button.value)}'
  `

    return `
    <div data-type="select" class="toolbar__select">
      <i 
        class="material-icons"
        ${meta}
      >${button.icon}</i>
      <div data-type="select-modal" class="select-modal select-modal--hidden">
      <div class="select-modal__inner">
        ${printColor(colors).join(' ')}
      </div>
      <div class="select-modal__button">
          <i data-type="toHide" class="material-icons">clear</i>
      </div>
      </div>
    </div>
    <div class="select-led" style="background: ${button.active}"></div>
  `
}