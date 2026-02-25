import {StyleSheet} from '@quec/panel-components-kit'

export const useStyles = StyleSheet(theme => ({
  sectionCard: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.border.dividerLight,
  },
  sectionTitle: {
    fontSize: theme.size.text.T2,
    fontWeight: '600',
    color: theme.colors.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.dividerLight,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  infoContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: theme.size.text.T3,
    color: theme.colors.text.secondary,
    flex: 1,
  },
  infoValue: {
    fontSize: theme.size.text.T3,
    color: theme.colors.text.primary,
    fontWeight: '500',
    textAlign: 'right',
    maxWidth: '55%',
  },
}))
