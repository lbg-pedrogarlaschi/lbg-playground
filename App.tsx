import React from 'react';

import styled from 'styled-components/native';

import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';

import { ActionButton , ButtonType , CompactButton , IconButton } from './src';


//import themeLloyds from './src/style-tokens/re-imaginedhalifax.json'
import themeLloyds from './src/style-tokens/re-imaginedlloyds.json'
//import themeLloyds from './src/style-tokens/re-imaginedscottish widows.json'

const Wrapper = styled.View`
  flex:1;
  justify-content: center;
  align-items: center;
`

const App = ()=> {
  return (
    <Wrapper>
      <ThemeProvider theme={themeLloyds}>
        <StatusBar style="auto" />
        <ActionButton type={ButtonType.Tertiary} brandAccent={true} icon={true} disabled={false}>Button</ActionButton>
      </ThemeProvider>
    </Wrapper>
  );
}

export default App;