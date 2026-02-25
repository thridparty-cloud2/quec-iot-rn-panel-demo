import React from 'react'
import {View, ScrollView} from 'react-native'

import {useStyles} from './styles'
import QuecHeader from '../../components/quec-header'
import Hero from './components/hero'
import Sections from './components/sections'

function WelcomePage() {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <QuecHeader />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Hero />
        <Sections />
      </ScrollView>
    </View>
  )
}

export default WelcomePage
