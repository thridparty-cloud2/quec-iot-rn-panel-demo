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

  // ── 分组标题 ──
  sectionTitle: {
    fontSize: theme.size.text.T2,
    fontWeight: '600',
    color: theme.colors.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 4,
    paddingHorizontal: 4,
  },

  // ── 通用卡片 ──
  card: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.border.dividerLight,
  },

  // ── 环境选择器 ──
  envGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  envChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
    backgroundColor: theme.colors.background.tertiary,
  },
  envChipActive: {
    borderColor: theme.colors.brand.primary,
    backgroundColor: theme.colors.brand.primaryLight,
  },
  envChipText: {
    fontSize: theme.size.text.T2,
    fontWeight: '500',
    color: theme.colors.text.secondary,
  },
  envChipTextActive: {
    color: theme.colors.brand.primary,
    fontWeight: '700',
  },
  envHint: {
    fontSize: theme.size.text.T1,
    color: theme.colors.text.hint,
    marginTop: 10,
  },

  // ── 请求按钮 ──
  requestButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: theme.colors.brand.primary,
  },
  requestButtonText: {
    color: '#FFFFFF',
    fontSize: theme.size.text.T3,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // ── 响应结果 ──
  responseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  responseTitle: {
    fontSize: theme.size.text.T2,
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: theme.size.text.T1,
    fontWeight: '600',
  },
  responseBody: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: theme.colors.border.dividerLight,
    maxHeight: 300,
  },
  responseText: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: theme.colors.text.secondary,
    lineHeight: 18,
  },
  emptyResponse: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: theme.size.text.T2,
    color: theme.colors.text.hint,
  },

  // ── API 信息 ──
  apiInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  apiMethodBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: theme.colors.brand.primary,
  },
  apiMethodText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  apiPath: {
    fontSize: theme.size.text.T1,
    fontFamily: 'monospace',
    color: theme.colors.text.tertiary,
    flex: 1,
  },
  apiDivider: {
    height: 1,
    backgroundColor: theme.colors.border.dividerLight,
    marginVertical: 10,
  },

  // ── 底部间距 ──
  bottomSpacer: {
    height: 40,
  },
}))
