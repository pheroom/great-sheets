export function parse(value = '') {
    if(value.startsWith('=')){
        try {
            return value.slice(1)
        } catch (e){
            return value
        }
    }
    return value
}