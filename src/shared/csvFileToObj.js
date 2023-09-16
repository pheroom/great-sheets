export function csvFileToObj(file) {
    return new Promise(resolve => {
        let myReader = new FileReader();
        myReader.onload = function(e) {
            const data = {}
            let content = myReader.result;
            let lines = content.split("\n");
            for (let count = 0; count < lines.length; count++) {
                let rowContent = lines[count].split(",");
                for (let i = 0; i < rowContent.length; i++) {
                    let value = rowContent[i]
                    while(value.includes('"')){
                        value = value.replace('"', '')
                    }
                    value = value.trim()
                    if(value){
                        data[`${count}:${i}`] = value
                    }
                }
            }
            resolve(data)
        }
        myReader.readAsText(file);
    })
}