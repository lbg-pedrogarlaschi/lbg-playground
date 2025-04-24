import React from 'react';

import styled from 'styled-components/native';

import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';

import { ActionButton , ButtonType , CompactButton , IconButton } from './src';
import {Tile , TileLayout} from './src';

import Pictograms from './src/components/assets/Pictograms'


import themeLloyds from './src/style-tokens/re-imaginedhalifax.json'
//import themeLloyds from './src/style-tokens/re-imaginedlloyds.json'
//import themeLloyds from './src/style-tokens/re-imaginedscottish widows.json'

const Wrapper = styled.View`
  flex:1;
  justify-content: center;
  align-items: center;
  background-color: #F1F1F1;
`

const App = ()=> {
  return (
    <Wrapper>
      <ThemeProvider theme={themeLloyds}>
        <StatusBar style="auto" />
        <Tile
          icon={Pictograms.ComponentPictogramIconCanvasDefault}
          description='Description'
          link='Link'
          layout={TileLayout.Single}
        ></Tile>
      </ThemeProvider>
    </Wrapper>
  );
}

export default App;