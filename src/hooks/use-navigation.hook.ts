import {useNavigation as useNativeNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../router/router'

export const useNavigation = () => {
  return useNativeNavigation<NativeStackNavigationProp<RootStackParamList>>()
}
