import {DarkTheme as PanelDarkTheme, QuecTheme} from '@quec/panel-components-kit'
import {QuecImageSystem} from './types'

export const DarkTheme: QuecTheme<QuecImageSystem> = {
  ...PanelDarkTheme,
  image: {
    // arrowRight: require('../../assets/image/ic_back_dark.png'),
  },
}
