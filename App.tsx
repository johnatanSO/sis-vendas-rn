import React from 'react';
import { View } from 'react-native';
import Header from './src/layout/Header';
import { NavigationMenu } from './src/layout/NavigationMenu';
import {styles} from './styles/globalStyles.ts'

export default function App() {
  return (
    <View style={styles.layoutContainer}>
      <Header />
      {/* <Screens /> */}
      <NavigationMenu /> 
    </View>
  );
}