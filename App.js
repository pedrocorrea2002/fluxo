import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View } from 'react-native';
import Navigator from './src/routes/navigator';
import { MenuProvider } from 'react-native-popup-menu';
import { Extract } from './src/pages/Views/extract_geral';

export default function App() {
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar
        hideTransitionAnimation='fade'
        hidden
      />
      <MenuProvider>
        <Navigator/>
      </MenuProvider>
    </SafeAreaView>
  )
}