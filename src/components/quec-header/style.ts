import {StyleSheet} from '@quec/panel-components-kit'
import {secondTitleFontSize} from '../../style/dimens'

export const commonIconSize = 28
export const commonIconMargin = 8

export const useStyles = StyleSheet(theme => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15,
    backgroundColor: theme.colors.background.primary,
  },
  titleText: {
    flex: 1,
    paddingHorizontal: 8,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: secondTitleFontSize,
    color: theme.colors.text.primary,
  },
  rightIcon: {
    width: commonIconSize,
    height: commonIconSize,
    zIndex: 100,
    tintColor: theme.colors.text.primary,
  },
  leftIcon: {
    width: commonIconSize,
    height: commonIconSize,
    tintColor: theme.colors.text.primary,
  },
}))
