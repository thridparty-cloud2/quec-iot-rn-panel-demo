import {DeepPartial, QuecTheme, useTheme as useAppTheme} from '@quec/panel-components-kit'
import {QuecImageSystem} from './types'

export {LightTheme} from './light-theme'
export {DarkTheme} from './dark-theme'

export const useTheme = (overrides?: DeepPartial<QuecTheme<QuecImageSystem>>) => {
  const theme = useAppTheme(overrides) as QuecTheme<QuecImageSystem>
  return theme
}
