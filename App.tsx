import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { View } from 'react-native'
import { Routes } from './src/layout/Routes'
import { styles } from './styles/globalStyles.js'

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.layoutContainer}>
        <View style={styles.screens}>
          <Routes /> {/* Telas */}
        </View>
      </View>
    </NavigationContainer>
  )
}
