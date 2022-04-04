import {createToolbar} from "@/components/toolbar/toolbar.template";
import {$} from "@core/dom";
import {ExcelStateComponent} from "@core/ExcelStateComponent";
import {defaultStyles} from "@/constants";
import {selectHandler} from "@/components/toolbar/toolbar.select";

export class Toolbar extends ExcelStateComponent{
  static className = 'toolbar'

  constructor($root, options){
    super($root, {
      name: 'Toolbar', 
      listeners: ['click'],
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

  async toolbarSelect(event){
    const value = await selectHandler(this.$root, event)
    this.$emit('toolbar:applyStyle', value)
  }

  onClick(event){
    const $target = $(event.target)
    if($target.data.type === 'button'){
      const value = JSON.parse($target.data.value)
      this.$emit('toolbar:applyStyle', value)
    } else if($target.data.type === 'selectBtn') {
      this.toolbarSelect(event)
    }
  }
}
