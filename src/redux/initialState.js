import {clone} from "@core/utils";
import {defaultStyles, defaultTitle} from "@/constants";

export const defaultState = {
    title: defaultTitle,
    rowState: {},
    rowsCount: 100,
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyles: defaultStyles,
    openedDate: new Date().toJSON()
}

const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
})


export function normalizeInitialState (state){
    return state ? normalize(state) : clone(defaultState)
}