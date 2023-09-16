import textCenterImg from './../../assets/icons/textCenter.png'
import textLeftImg from './../../assets/icons/textLeft.png'
import textRightImg from './../../assets/icons/textRight.png'
import textBoldImg from './../../assets/icons/textBold.png'
import textUnderlineImg from './../../assets/icons/textUnderline.png'
import textItalicImg from './../../assets/icons/textItalic.png'
import fillImg from './../../assets/icons/fill.png'
import strokeImg from './../../assets/icons/stroke.png'
import {toButton, toColorInput} from "@/components/UI/ui.template";

export function createToolbar(state) {
    const buttons = [
        {
            meta: `data-type="button" data-value='${JSON.stringify({textAlign: 'left'})}'`,
            icon: 'format_align_left',
            img: textLeftImg,
            alt: 'left',
            active: state['textAlign'] === 'left',
        },
        {
            meta: `data-type="button" data-value='${JSON.stringify({textAlign: 'center'})}'`,
            icon: 'format_align_center',
            img: textCenterImg,
            alt: 'center',
            active: state['textAlign'] === 'center',
        },
        {
            meta: `data-type="button" data-value='${JSON.stringify({textAlign: 'right'})}'`,
            icon: 'format_align_right',
            img: textRightImg,
            alt: 'right',
            active: state['textAlign'] === 'right',
        },
        {
            meta: `data-type="button" data-value='${JSON.stringify({fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold'})}'`,
            icon: 'format_bold',
            img: textBoldImg,
            alt: 'bold',
            active: state['fontWeight'] === 'bold',
        },
        {
            meta: `data-type="button" data-value='${JSON.stringify({textDecoration: state['textDecoration'] === 'underline' ? 'none' : 'underline'})}'`,
            icon: 'format_underlined',
            img: textUnderlineImg,
            alt: 'underline',
            active: state['textDecoration'] === 'underline',
        },
        {
            meta: `data-type="button" data-value='${JSON.stringify({fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic'})}'`,
            icon: 'format_italic',
            img: textItalicImg,
            alt: 'italic',
            active: state['fontStyle'] === 'italic',
        },
    ]

    const colorInputs = [
        {
            img: fillImg,
            alt: 'fill',
            field: 'background',
            value: state.background
        },
        {
            img: strokeImg,
            alt: 'stroke',
            field: 'color',
            value: state.color
        },
    ]



    return [].concat(buttons.map(toButton), colorInputs.map(toColorInput)).join('')
}