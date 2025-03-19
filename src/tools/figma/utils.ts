const fs = require('fs');
const path = require('path');

/**
 * 
 * @param filename Name of the file (with extention)
 * @param jsonData JSON data
 * @returns 
 */
const saveJsonToFile = (filename: string , dir:string, jsonData: any) => {

    return new Promise((resolve, reject) => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const filePath = path.join(dir, filename);


        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (error: Error) => {
            if (error) {
                console.error('Error writing file:', error);
                reject(error);
            } else {
                
                resolve(true);
            }
        });
    });
};

export {saveJsonToFile}