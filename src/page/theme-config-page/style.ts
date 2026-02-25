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

  previewCard: {
    alignItems: 'center',
    backgroundColor: theme.colors.background.secondary,
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
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
    color: '#000',
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

  // ── 外观模式 ──
  modeOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    position: 'relative',
  },
  modeEmoji: {
    color: '#000',
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
    backgroundColor: theme.colors.border.divider,
    alignSelf: 'center',
  },

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
    borderColor: theme.colors.border.default,
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

  swatchRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  swatchItem: {
    flex: 1,
    alignItems: 'center',
  },
  swatchBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
  },
  swatchLabel: {
    fontSize: theme.size.text.T1,
    color: theme.colors.text.secondary,
    marginBottom: 1,
  },
  swatchName: {
    fontSize: 9,
    color: theme.colors.text.tertiary,
    fontFamily: 'monospace',
    marginBottom: 1,
  },
  swatchHex: {
    fontSize: 9,
    color: theme.colors.text.tertiary,
    fontFamily: 'monospace',
  },

  demoDivider: {
    height: 1,
    backgroundColor: theme.colors.border.divider,
    marginVertical: 12,
  },
  demoLabel: {
    fontSize: theme.size.text.T1,
    fontWeight: '600',
    color: theme.colors.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  demoRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },

  demoButton: {
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  demoBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
  },

  bgDemoStack: {
    marginBottom: 10,
  },
  bgDemoLayer: {
    borderRadius: 10,
    padding: 10,
    marginTop: 6,
    borderWidth: 1,
    borderColor: theme.colors.border.dividerLight,
  },
  demoInputBox: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
  },

  statusDemoRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statusBadge: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    borderRadius: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  textDemoList: {
    gap: 6,
  },
  textInverseBox: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 4,
  },

  borderDemoRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  borderBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  demoDividerLine: {
    height: 1,
    marginVertical: 8,
  },

  overlayDemoRow: {
    flexDirection: 'row',
    gap: 10,
  },
  overlayDemoBase: {
    flex: 1,
    height: 64,
    borderRadius: 10,
    backgroundColor: theme.colors.background.inverted,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  overlayDemoCover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlayDemoText: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.text.inverse,
    zIndex: 1,
  },

  bottomSpacer: {
    height: 40,
  },
}))
