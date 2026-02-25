/**
 * @format
 */

import {AppRegistry} from 'react-native'
import {name as appName} from './.configs/app.json'
import App from './src/App'
import {patchTextStyle} from '@quec/panel-theme-kit'
patchTextStyle()
AppRegistry.registerComponent(appName, () => App)
