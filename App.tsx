import React from 'react';

import styled from 'styled-components/native';

import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';

import { ActionButton , ButtonType } from './src';

import themeLloyds from './src/style-tokens/re-imaginedlloyds.json'

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
        <ActionButton type={ButtonType.Secondary} brandAccent={false} icon={true} disabled={false}>Button 01</ActionButton>
      </ThemeProvider>
    </Wrapper>
  );
}

export default App;