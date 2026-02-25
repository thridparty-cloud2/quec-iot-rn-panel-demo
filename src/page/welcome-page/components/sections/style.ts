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
  // 卡片
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: theme.dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
  },
  cardPressed: {
    opacity: 0.7,
    transform: [{scale: 0.98}],
  },
  cardIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  cardIcon: {
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
