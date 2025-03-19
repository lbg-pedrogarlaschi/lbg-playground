const axios = require('axios');
const path = require('path');
import { saveJsonToFile } from './utils';

import dotenv from 'dotenv';
dotenv.config();


const FIGMA_TOKEN = process.env.FIGMA_TOKEN;

console.log('FIGMA_TOKEN: ' , FIGMA_TOKEN);

interface TokenVariable {
  id: string;
  name: string;
  varName: string;
  key: string;
  variableCollectionId: string;
  resolvedType: string;
  description: string;
  valuesByMode: any;
}

/**
 * Get figma file variables and collestions
 * @param documentId figma document id
 * @returns 
 */
const getFigmaVariables = (documentId: string) => {
  const config = {
    headers: {
      'X-FIGMA-TOKEN': FIGMA_TOKEN
    }
  };

  const url = `https://api.figma.com/v1/files/${documentId}/variables/local`;

  return axios.get(url, config)
    .then((response: any) => response.data)
    .catch((error: any) => {
      console.error('Error fetching data');
      throw error;
    });
};

/**
 * Get figma file variables and collestions
 * @param documentId figma document id
 * @returns 
 */
const getFigmaPublishedVariables = (documentId: string) => {
  const config = {
    headers: {
      'X-FIGMA-TOKEN': FIGMA_TOKEN
    }
  };

  const url = `https://api.figma.com/v1/files/${documentId}/variables/published`;

  return axios.get(url, config)
    .then((response: any) => response.data)
    .catch((error: any) => {
      console.error('Error fetching data');
      throw error;
    });
};




/**
 * Remove Characters from a string
 * @param inputString input stringf
 * @returns 
 */
const removeCharacters = (inputString: string): string => {
  return inputString.replace(/[\s\-\/]/g, '');
};


const resolveVariableAliases = (variables) => {


  function findVariableById(varId) {
    return variables.find(varDef => varDef.id === varId);
  }

  function resolveValue(value, level = 0, varName = '') {

    if (level > 10) {
      return null;
    }
    if (typeof value === 'object' && value !== null && value.type === "VARIABLE_ALIAS") {
      const aliasVarId = value.id;
      const aliasVar = findVariableById(aliasVarId);

      if (aliasVar) {
        return aliasVar.valuesByMode.map(item => ({ id: item.id, value: resolveValue(item.value, level + 1) })); // Maintain {id, value} structure
      } else {
        return null;
      }
    } else {
      return value; // Base case: not an alias
    }
  }

  return variables.map(varDef => {
    const newVar = { ...varDef };
    newVar.valuesByMode = newVar.valuesByMode.flatMap(modeValue => {



      const resolvedVal = resolveValue(modeValue.value, 0, newVar.varName);

      if (newVar.varName === '--TypesStyle4Max135FontSize') {
        console.log('----------')
        console.log('modeValue.id: ', modeValue.id);
        console.log('newVar: ', newVar.valuesByMode[0]);
      }
      //console.log(modeValue.id , ' : ' , resolvedVal)


      if (Array.isArray(resolvedVal)) {
        return resolvedVal;
      } else {
        return { id: modeValue.id, value: resolvedVal };
      }
    });
    return newVar;
  });

}

/**
 * Parse content comming from figma API
 * @param variables variables
 * @param variableCollections collections
 */
const parseContent = async (variables: any, variableCollections: any) => {

  let vars: TokenVariable[] = [];
  const modes = [];
  const themes = [];


  for (let varName in variables) {
    const v = variables[varName] as any;

    let varObj: TokenVariable = {
      id: v.id,
      varName: `--${removeCharacters(v.name)}`,
      name: v.name,
      key: v.name,
      variableCollectionId: v.variableCollectionId,
      resolvedType: v.resolvedType,
      valuesByMode: [],
      description: v.description
    };

    for (let valueByMode in v.valuesByMode) {
      const obj = v.valuesByMode[valueByMode];
      varObj.valuesByMode.push({ id: valueByMode, value: obj })
    }

    vars.push(varObj);
  }

  vars = resolveVariableAliases(vars);


  let collectionName: string;

  const themesObject = {}

  for (collectionName in variableCollections) {
    const c = variableCollections[collectionName];



    c.modes.forEach((mode: { modeId: string, name: string }) => {

      if (c.name === 'Theme')
        if (!themesObject[mode.modeId]) {
          themesObject[mode.modeId] = { id: mode.modeId, name: mode.name, variables: c.variableIds };
        }
        else {
          themesObject[mode.modeId].variables.push(...c.variableIds)
        }

    });

  }

  for (let t in themesObject) {
    const theme = themesObject[t];
    themes.push(theme);
  }

  const len = themes.length;
  for (let i = 0; i < len; i++) {
    themes[i].variables = themes[i].variables.map((id) => {
      const variable = vars.find((v) => {
        if (v.id === id)
          return v;
      })

      let varValue;
      variable.valuesByMode.forEach((v) => {

        if (v.id === themes[i].id)
          varValue = v;
      })

      return { id: variable.id, varName: variable.varName, name: variable.name, value: varValue, type: variable.resolvedType };
    });

  }

  saveJsonToFile('themes.json', path.join(__dirname, '../../../figma-tokens'), themes);
}


const getLocalVariables = (id: string): Promise<{ variables: any; variableCollections: any }> => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = await getFigmaVariables(id);
      const { meta } = query;
      const { variables, variableCollections } = meta;

      await saveJsonToFile(`variables_${id}.json`, path.join(__dirname, '../../../figma-tokens'), variables);
      await saveJsonToFile(`collections_${id}.json`, path.join(__dirname, '../../../figma-tokens'), variableCollections);

      resolve({ variables, variableCollections });
    } catch (error) {
      console.error('Error fetching variables:', error);
      reject(error);
    }
  });
};

//https://www.figma.com/design//Cancara-Native-OS-Component-Library?m=auto&node-id=370-3970

const init = async () => {
  const query01 = await getLocalVariables('aIBEXpt5eKOz3sR9gfys85');
  const query02 = await getLocalVariables('Stnmipdq978ngx28U9Qzox');

  //const docTokens = await getLocalVariables('Stnmipdq978ngx28U9Qzox');

  //'aIBEXpt5eKOz3sR9gfys85' Tokens
  //'Stnmipdq978ngx28U9Qzox' Doc

  const vars01 = query01.variables;
  const cols01 = query01.variableCollections;

  const vars02 = query02.variables;
  const cols02 = query02.variableCollections;

  
  let i = 0 ;
 

  for (let varName in vars01) {

    i++;
    if(!vars02[varName])
      vars02[varName] = vars01[varName]

  }

  for (let colName in cols01) {
    
    if(!cols02[colName])
      cols02[colName] = cols01[colName]

  }

  parseContent(vars02, cols02);

}
//https://www.figma.com/design/aIBEXpt5eKOz3sR9gfys85/Cancara-Native-OS-Tokens?m=auto&node-id=4053-2&vars=1
//https://www.figma.com/design/Stnmipdq978ngx28U9Qzox/Cancara-Native-OS-Component-Library?m=auto&node-id=2630-6820&vars=1

init();
