import {StyleSheet} from '@quec/panel-components-kit'

export const useStyles = StyleSheet(theme => ({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: theme.colors.brand.primaryLight,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.brand.primary + '30',
    overflow: 'hidden',
  },
  touchable: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: theme.size.text.T2,
    fontWeight: '600',
    color: theme.colors.brand.primary,
    flex: 1,
  },
  arrow: {
    fontSize: 20,
    fontWeight: '300',
    color: theme.colors.brand.primary,
    opacity: 0.6,
  },
}))
