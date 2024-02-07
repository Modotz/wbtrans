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
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
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
  return (
    <Routes/>
  );
}


export default App;
