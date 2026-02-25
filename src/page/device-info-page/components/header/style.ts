import {StyleSheet} from '@quec/panel-components-kit'

export const useStyles = StyleSheet(theme => ({
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.brand.primaryLight,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.brand.primaryLight,
  },
  deviceLogo: {
    width: 60,
    height: 60,
    borderRadius: 14,
  },
  deviceLogoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: theme.colors.brand.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviceLogoEmoji: {
    fontSize: 28,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 14,
  },
  deviceName: {
    fontSize: theme.size.text.T5,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: 2,
  },
  productName: {
    fontSize: theme.size.text.T2,
    color: theme.colors.text.tertiary,
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusOnline: {
    backgroundColor: theme.colors.status.success + '20',
  },
  statusOffline: {
    backgroundColor: theme.colors.status.error + '20',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  dotOnline: {
    backgroundColor: theme.colors.status.success,
  },
  dotOffline: {
    backgroundColor: theme.colors.status.error,
  },
  statusText: {
    fontSize: theme.size.text.T1,
    fontWeight: '600',
  },
  statusTextOnline: {
    color: theme.colors.status.success,
  },
  statusTextOffline: {
    color: theme.colors.status.error,
  },
}))
