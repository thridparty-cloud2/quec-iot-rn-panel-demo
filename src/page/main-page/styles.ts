import {StyleSheet} from '@quec/panel-components-kit'

export const useStyles = StyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  text: {
    color: theme.colors.text.primary,
    fontSize: theme.size.text.T3,
  },
}))
