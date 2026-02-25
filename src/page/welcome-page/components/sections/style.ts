import {StyleSheet} from '@quec/panel-components-kit'

export const useStyles = StyleSheet(theme => ({
  sectionTitle: {
    fontSize: theme.size.text.T2,
    fontWeight: '600',
    color: theme.colors.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 12,
    marginTop: 8,
    paddingHorizontal: 4,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.secondary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: theme.colors.border.dividerLight,
  },
  cardIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: theme.colors.brand.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  cardIcon: {
    color: theme.colors.text.primary,
    fontSize: theme.size.text.T7,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: theme.size.text.T4,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 3,
  },
  cardDesc: {
    fontSize: theme.size.text.T2,
    color: theme.colors.text.tertiary,
    lineHeight: 18,
  },
  cardArrow: {
    fontSize: theme.size.text.T5,
    color: theme.colors.text.tertiary,
    marginLeft: 8,
  },
}))
