import {StyleSheet} from '@quec/panel-components-kit'

export const useStyles = StyleSheet(theme => ({
  heroSection: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 36,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: theme.dark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 36,
  },
  title: {
    fontSize: theme.size.text.T7,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: theme.size.text.T3,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  versionBadge: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: theme.dark ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.06)',
  },
  versionText: {
    fontSize: theme.size.text.T2,
    color: theme.dark ? '#818CF8' : '#6366F1',
    fontWeight: '500',
  },
}))
