import { ExcelComponent } from "../../core/ExcelComponent";
import {changeTitle} from "@/redux/actions";
import {defaultTitle} from "@/constants";
import {$} from "@core/dom";
import {ActiveRoute} from "@core/routes/ActiveRoute";

export class Header extends ExcelComponent{
  static className = 'header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
  }

  toHTML(){
    const title = this.store.getState().title || defaultTitle
    return `
    <input type="text" class="header__input" value="${title}"/>
    <div>
      <div class="header__button">
        <i class="material-icons" data-button="remove">
          delete
        </i>
        <i class="material-icons" data-button="exit">
          exit_to_app
        </i>
      </div>
    </div>    
    `
  }

  onClick(event){
    const $target = $(event.target)

    if($target.data.button === 'remove'){
      const decision = confirm('Do you really want to delete this table?')
      if(decision){
        localStorage.removeItem(`excel:${ActiveRoute.param}`)
        ActiveRoute.navigate('')
      }
    } else if($target.data.button === 'exit'){
      ActiveRoute.navigate('')
    }

  }

  onInput(event){
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }
}