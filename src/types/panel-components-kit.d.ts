import {ViewStyle, TextStyle, ImageStyle} from 'react-native'
import {QuecTheme} from '@quec/panel-components-kit/dist/src/core/types'

// FIXME: 在 @quec/panel-components-kit@0.2.0 及以后版本中可以移除此文件

type NameStyles = ViewStyle | TextStyle | ImageStyle
type NamedStyles<T> = {[P in keyof T]: NameStyles}

declare module '@quec/panel-components-kit' {
  interface StyleSheetOptions {
    adjustKeys?: string[]
    adjustOffset?: number
  }

  export function StyleSheet<T extends NamedStyles<T> | NamedStyles<any>>(
    stylesFn: (theme: QuecTheme) => T,
    options?: StyleSheetOptions,
  ): () => T
}
