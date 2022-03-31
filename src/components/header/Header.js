import { ExcelComponent } from "../../core/ExcelComponent";

export class Header extends ExcelComponent{
  static className = 'header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: [],
      ...options
    })
  }

  toHTML(){
    return `
    <input type="text" class="header__input" value="New table"/>
    <div>
      <div class="header__button">
        <i class="material-icons">
          exit_to_app
        </i>
        <i class="material-icons">
          delete
        </i>
      </div>
    </div>    
    `
  }
}