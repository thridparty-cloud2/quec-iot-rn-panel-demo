import {LightTheme as PanelLightTheme, QuecTheme} from '@quec/panel-components-kit'
import {QuecImageSystem} from './types'

export const LightTheme: QuecTheme<QuecImageSystem> = {
  ...PanelLightTheme,
  image: {
    // arrowRight: require('../../assets/image/ic_back.png'),
  },
}
