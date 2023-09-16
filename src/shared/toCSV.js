function arrayToCsv(data){
    return data.map(row =>
        row
            .map(String)
            .map(v => v.replaceAll('"', '""'))
            .map(v => `"${v}"`)
            .join(',')
    ).join('\r\n');
}

export function toCSV(state){
    const rows = Array(state.rowsCount).fill().map(() => Array(26).fill(''))
    Object.entries(state.dataState).forEach(([id, value]) => {
        const [row, col] = id.split(':').map(v => +v)
        rows[row][col] = value
    })

    let blob = new Blob([arrayToCsv(rows)], { type: 'text/csv;charset=utf-8;' });
    return URL.createObjectURL(blob);
}