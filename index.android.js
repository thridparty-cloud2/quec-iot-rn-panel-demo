/**
 * @format
 */

import {AppRegistry} from 'react-native'
import App from './src/App'
import {name as appName} from './.configs/app.json'
import {patchTextStyle} from '@quec/panel-theme-kit'
patchTextStyle()
AppRegistry.registerComponent(appName, () => App)
