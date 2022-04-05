function toButton(button) {
  const meta = `
    data-type="button"
    data-value='${JSON.stringify(button.value)}'
  `
  return `
    <div class="toolbar__button">
      <i 
        class="material-icons ${button.active ? 'active' : ''}"
        ${meta}
      >${button.icon}</i>
    </div>
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

function toSelect(button){
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

export function createToolbar(state) {
  const buttons = [
    {
      icon: 'format_align_left',
      active: state['textAlign'] === 'left',
      value: {textAlign: 'left'}
    },
    {
      icon: 'format_align_center',
      active: state['textAlign'] === 'center',
      value: {textAlign: 'center'}
    },
    {
      icon: 'format_align_right',
      active: state['textAlign'] === 'right',
      value: {textAlign: 'right'}
    },
    {
      icon: 'format_bold',
      active: state['fontWeight'] === 'bold',
      value: {fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold'}
    },
    {
      icon: 'format_underlined',
      active: state['textDecoration'] === 'underline',
      value: {textDecoration: state['textDecoration'] === 'underline' ? 'none' : 'underline'}
    },
    {
      icon: 'format_italic',
      active: state['fontStyle'] === 'italic',
      value: {fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic'}
    },
  ]

  const select = [
    {
      icon: 'format_color_fill',
      active: state['background'],
      value: {background: '#fff'}
    },
    {
      icon: 'format_color_text',
      active: state['color'],
      value: {color: '#000'}
    },
  ]



  return buttons.map(toButton).concat(select.map(toSelect)).join('')
}