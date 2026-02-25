import React, {useContext} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {PreferencesContext} from '@quec/panel-components-kit'
import {useStyles} from './style'
import QuecHeader from '../../components/quec-header'

export default function ThemeConfigPage() {
  const styles = useStyles()

  const preference = useContext(PreferencesContext)

  return (
    <View style={styles.container}>
      <QuecHeader />
      <TouchableOpacity
        onPress={() => {
          preference?.toggleDarkMode()
        }}
      >
        <Text style={styles.text}>ThemeConfigPage</Text>
      </TouchableOpacity>
    </View>
  )
}
