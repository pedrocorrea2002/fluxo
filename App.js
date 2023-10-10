import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View } from 'react-native';
import Navigator from './src/routes/navigator';
import { Extract } from './src/pages/Views/extract_geral';

export default function App() {
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar
        hideTransitionAnimation='fade'
        hidden
      />
      <Navigator/>
    </SafeAreaView>
  )
}