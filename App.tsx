/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import "./ignoreWarnings";
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  LogBox 
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

import Routes from './src/routes/index'

const App = () => {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
  return (
    <Routes/>
  );
}


export default App;
