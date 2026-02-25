import {StyleSheet} from '@quec/panel-components-kit'

export const useStyles = StyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  // ── 空状态 ──
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: theme.size.text.T3,
    color: theme.colors.text.tertiary,
  },

  // ── 头部卡片 ──
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.dark ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.06)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.dark ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.1)',
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
    backgroundColor: theme.dark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)',
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

  // ── 在线状态 ──
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusOnline: {
    backgroundColor: theme.dark ? 'rgba(34,197,94,0.15)' : 'rgba(34,197,94,0.1)',
  },
  statusOffline: {
    backgroundColor: theme.dark ? 'rgba(239,68,68,0.15)' : 'rgba(239,68,68,0.1)',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  dotOnline: {
    backgroundColor: '#22C55E',
  },
  dotOffline: {
    backgroundColor: '#EF4444',
  },
  statusText: {
    fontSize: theme.size.text.T1,
    fontWeight: '600',
  },
  statusTextOnline: {
    color: '#22C55E',
  },
  statusTextOffline: {
    color: '#EF4444',
  },

  // ── 分组卡片 ──
  sectionCard: {
    backgroundColor: theme.dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
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
    borderBottomColor: theme.dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
  },

  // ── 信息行 ──
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

  // ── 底部间距 ──
  bottomSpacer: {
    height: 32,
  },
}))
