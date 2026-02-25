import {StyleSheet} from '@quec/panel-components-kit'

export const useStyles = StyleSheet(theme => ({
  card: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.border.dividerLight,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: theme.size.text.T4,
    fontWeight: '700',
    color: theme.colors.text.primary,
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 6,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: theme.colors.brand.primaryLight,
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: theme.colors.brand.primary,
  },
  readonlyBadge: {
    backgroundColor: theme.colors.status.warning + '20',
  },

  code: {
    fontSize: theme.size.text.T1,
    color: theme.colors.text.tertiary,
    fontFamily: 'monospace',
    marginBottom: 12,
  },

  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  value: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.brand.primary,
  },
  unit: {
    fontSize: theme.size.text.T3,
    fontWeight: '500',
  },
  range: {
    fontSize: theme.size.text.T2,
    color: theme.colors.text.tertiary,
  },

  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.brand.primaryLight,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.brand.primary,
  },

  footer: {
    flexDirection: 'row',
    gap: 16,
  },
  footerText: {
    fontSize: theme.size.text.T1,
    color: theme.colors.text.hint,
  },
}))
