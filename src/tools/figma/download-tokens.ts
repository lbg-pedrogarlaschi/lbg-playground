const axios = require('axios');
const path = require('path');
import { saveJsonToFile } from './utils';

import dotenv from 'dotenv';
dotenv.config();

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;

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
 * Remove Characters from a string
 * @param inputString input stringf
 * @returns 
 */
const removeCharacters = (inputString: string): string => {
  return inputString.replace(/[\s\-\/]/g, '');
};


const getAlias = (variables , varId)=>{


  const len = variables.length;

  for(let i = 0 ; i < len;i++){

    const regex = /:(.*?)(?=\/)/;
    const match = varId.match(regex);

    if(match)
    {
      if(variables[i].key === match[1])
      {
        let c = 0;
        for(let mode in variables[i].valuesByMode)
          if(c === 0)return variables[i].valuesByMode[mode];
      }
    }
    else if(variables[i].id === varId)
    {

      let c = 0;
      for(let mode in variables[i].valuesByMode)
        if(c === 0)return variables[i].valuesByMode[mode];
        
    }
  }
}

/**
 * Parse content comming from figma API
 * @param variables variables
 * @param variableCollections collections
 */
const parseContent = async (variablesObj: any, variableCollections: any) => {

  let vars: TokenVariable[] = [];

  const themes = [];
  const variables = [];

  for(let varName in variablesObj){

    const variable = variablesObj[varName];
    variables.push(variable);
  }

  for(let cId in variableCollections)//collection ID
  {
    const collection = variableCollections[cId];

    if(collection.name !== 'Theme')continue;
    if(collection.variableIds.length < 10)continue;

    collection.modes.forEach(mode => {
      themes.push({
        id:mode.modeId,
        name:mode.name,
        variables:[]
      })
      
    });
  }

  for(let i = 0; i < themes.length;i++){

    const theme = themes[i];
    const themeId = theme.id;

    variables.forEach(v  => {
      
      for(let mode in v.valuesByMode)
      {
        if(mode === themeId)
        {
          const variable = {
            id:v.id,
            name:v.name,
            varName:`--${removeCharacters(v.name)}`,
            type:v.resolvedType,
            value:null
          };

          if(v.valuesByMode[mode].type)
            variable.value = getAlias(variables , v.valuesByMode[mode].id);
          else
            variable.value = v.valuesByMode[mode];

          theme.variables.push(variable);
        }
      }
    });
  }  

  await saveJsonToFile(`themes.json`, path.join(__dirname, '../../../figma-tokens'), themes);
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

const init = async () => {
  const tokenQuery = await getLocalVariables('aIBEXpt5eKOz3sR9gfys85');
  const { variables, variableCollections } = tokenQuery;

  //'aIBEXpt5eKOz3sR9gfys85' Tokens

  parseContent(variables, variableCollections);

}

init();
