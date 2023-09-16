export function getHexFromRgb(str) {
    const arr = str.split('').map(ch => '0123456789,'.includes(ch) ? ch : '').join('').split(',').map(ch => +ch)

    return '#' + arr.map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
    }).join('')
}