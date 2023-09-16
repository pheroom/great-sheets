class Dom {
    constructor(selector){
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
    }

    html(html){
        if (typeof html === 'string'){
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }

    text(text){
        if(typeof text !== 'undefined'){
            this.$el.textContent = text
            return this
        }
        if(this.$el.tagName.toLowerCase() === 'input'){
            return this.$el.value.trim()
        }
        return this.$el.textContent.trim()
    }

    clear(){
        this.html('')
        return this
    }

    on(eventType, callback){
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback){
        this.$el.removeEventListener(eventType, callback)
    }

    find(selector){
        return $(this.$el.querySelector(selector))
    }

    append(node){
        if (node instanceof Dom){
            node = node.$el
        }
        if(Element.prototype.append){
            this.$el.append(node)
        } else{
            this.$el.appendChild(node)
        }
    }

    get data(){
        return this.$el.dataset
    }

    closest(selector){
        return $(this.$el.closest(selector))
    }

    getCoords(){
        return this.$el.getBoundingClientRect()
    }

    findAll(selector){
        return this.$el.querySelectorAll(selector)
    }

    id(parse){
        if(parse){
            const parsed = this.id().split(':')
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.data.id
    }

    focus(ind){
        if(typeof ind === 'undefined'){
            this.$el.firstChild.textContent = this.$el.firstChild.textContent.trim() || ' '
            this.$el.focus()
        } else if(!ind){
            let selection = window.getSelection()
            this.$el.firstChild.textContent = this.$el.firstChild.textContent.trim()
            selection.setPosition(this.$el.firstChild, this.$el.firstChild.textContent.length)
        } else if(!~ind) {
            const selection = window.getSelection()
            selection.setPosition(this.$el.firstChild, selection.focusOffset - 1 >= 0 ? selection.focusOffset - 1 : 0)
        } else if(ind === 1){
            const selection = window.getSelection();
            selection.setPosition(this.$el.firstChild, selection.focusOffset + 1 <= this.$el.firstChild.textContent.length ? selection.focusOffset + 1 : this.$el.firstChild.textContent.length)
        }
        return this
    }

    attr(name, value){
        if(value){
            this.$el.setAttribute(name, value)
            return this
        }
        return this.$el.getAttribute(name)
    }

    css(styles = {}){
        for(let key in styles){
            this.$el.style[key] = styles[key]
        }
    }

    getStyles(styles = []){
        return styles.reduce((res, s) => {
            res[s] = this.$el.style[s]
            return res
        }, {})
    }

    addClass(className){
        this.$el.classList.add(className)
        return this
    }

    removeClass(className){
        this.$el.classList.remove(className)
        return this
    }

    toggle(className){
        this.$el.classList.toggle(className)
        return this
    }
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if(classes){
        el.classList.add(classes)
    }
    return $(el)
}