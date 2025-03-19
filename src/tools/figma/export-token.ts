import * as fs from 'fs';
import {saveJsonToFile} from './utils';


const loadTheme = (themeId)=>{
    return new Promise<any>((resolve) =>{

        const path = `${__dirname}/../../../figma-tokens/themes.json`
        const themes = JSON.parse(fs.readFileSync(path, 'utf8'));
        const theme = {};
        themes.forEach(theme => {

                if(theme.id === themeId)
                    return resolve(theme);

        });
    })   
}

const fixColor = (value , factor)=>{

    const reult = (Math.round((factor * value) * 1000) / 1000);

    return reult;

}

const parseValue = (value : any , type) : any=>{

    switch(type)
    {
        case 'STRING':
            return value.replace(' ' , '-');
        case 'FLOAT':
            return value;
        case 'COLOR':
            return `rgba(${fixColor(value.r , 255)},${fixColor(value.g, 255)},${fixColor(value.b, 255)},${fixColor(value.a , 1)})`

    }
    
    return 0;
}



const saveTheme = async(theme)=>{


    return new Promise((resolve)=>{

        const obj = {};
        theme.variables.forEach(v => {
            
            if(!v.value || !v.value.value)return;


            obj[v.varName] = parseValue(v.value.value , v.type);
        });

        const dir = `${__dirname}/../../../src/style-tokens/`;
        saveJsonToFile(`${theme.name.toLowerCase().replace(' ','')}.json` , dir , obj);
        resolve(obj);

    })
}



const init = async()=>{

    console.log('init!')

    const themeId = process.argv[2];
    const themeJson = await loadTheme(themeId) ;
    await saveTheme(themeJson);
    
}

init();
