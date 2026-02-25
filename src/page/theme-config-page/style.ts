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

  // ── 预览卡片 ──
  previewCard: {
    alignItems: 'center',
    backgroundColor: theme.dark ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.04)',
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: theme.dark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
  },
  previewCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  previewEmoji: {
    fontSize: 28,
  },
  previewTitle: {
    fontSize: theme.size.text.T5,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  previewSubtitle: {
    fontSize: theme.size.text.T2,
    color: theme.colors.text.tertiary,
  },

  // ── 分组标题 ──
  sectionTitle: {
    fontSize: theme.size.text.T2,
    fontWeight: '600',
    color: theme.colors.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    paddingHorizontal: 4,
  },

  // ── 通用卡片 ──
  card: {
    backgroundColor: theme.dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
  },

  // ── 外观模式 ──
  modeOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    position: 'relative',
  },
  modeEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  modeLabel: {
    fontSize: theme.size.text.T3,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  modeIndicator: {
    position: 'absolute',
    bottom: 8,
    width: 20,
    height: 3,
    borderRadius: 2,
  },
  modeDivider: {
    width: 1,
    height: 40,
    backgroundColor: theme.dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
    alignSelf: 'center',
  },

  // ── 颜色选择 ──
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  colorItem: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  colorCircleSelected: {
    borderWidth: 3,
    borderColor: theme.dark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.2)',
  },
  colorCheck: {
    color: '#FFFFFF',
    fontSize: theme.size.text.T3,
    fontWeight: '700',
  },
  colorLabel: {
    fontSize: theme.size.text.T1,
    color: theme.colors.text.tertiary,
  },

  // ── 效果预览 ──
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  previewLabel: {
    fontSize: theme.size.text.T3,
    color: theme.colors.text.secondary,
  },
  previewSwatch: {
    width: 24,
    height: 24,
    borderRadius: 6,
  },
  previewDivider: {
    height: 1,
    backgroundColor: theme.dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
    marginBottom: 14,
  },
  previewButton: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  previewButtonText: {
    color: '#FFFFFF',
    fontSize: theme.size.text.T3,
    fontWeight: '600',
  },

  // ── 底部 ──
  bottomSpacer: {
    height: 32,
  },
}))
