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
    backgroundColor: theme.colors.brand.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoText: {
    color: '#000',
    fontSize: 36,
  },
  title: {
    fontSize: theme.size.text.T7,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: 8,
    letterSpacing: 0.5,
    height: 50,
    lineHeight: 50,
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
    backgroundColor: theme.colors.brand.primaryLight,
  },
  versionText: {
    fontSize: theme.size.text.T2,
    color: theme.colors.brand.primary,
    fontWeight: '500',
  },
}))
