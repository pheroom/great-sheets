import { ExcelComponent } from "../../core/ExcelComponent";
import {changeTitle} from "@/redux/actions";
import {defaultTitle} from "@/constants";
import {$} from "@core/dom";
import {ActiveRoute} from "@core/routes/ActiveRoute";
import logo from '../../logo.png'
import downloadImg from '../../assets/icons/download.png'
import removeImg from '../../assets/icons/remove.png'
import {toButton} from "@/components/UI/ui.template";
import {download} from "@/shared/download";
import {toCSV} from "@/shared/toCSV";

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
            ${toButton({
                meta: `data-button="exit"`,
                img: logo,
                alt: 'main'
            })}
            <input spellcheck="false" type="text" class="input header__input" value="${title}"/>
            <div class="header__actions">
                ${toButton({
                    meta: `data-button="export-csv"`,
                    img: downloadImg,
                    alt: 'download'
                })}
                ${toButton({
                    meta: `data-button="remove"`,
                    img: removeImg,
                    alt: 'remove'
                })}
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
        } else if($target.data.button === 'export-csv'){
            const state = this.store.getState()
            download(toCSV(state), `${state.title || defaultTitle}.csv`)
        }
    }

    onInput(event){
        const $target = $(event.target)
        this.$dispatch(changeTitle($target.text()))
    }
}