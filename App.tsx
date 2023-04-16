import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { View, StatusBar } from 'react-native'
import { Routes } from './src/layout/Routes'
import { styles } from './styles/globalStyles.js'

export default function App() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <NavigationContainer>
        <View style={styles.layoutContainer}>
          <Routes /> {/* Telas */}
        </View>
      </NavigationContainer>
    </>
  )
}
