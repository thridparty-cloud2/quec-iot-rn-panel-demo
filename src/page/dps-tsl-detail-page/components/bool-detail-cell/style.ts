import {StyleSheet} from '@quec/panel-components-kit'

export const useStyles = StyleSheet(theme => ({
  container: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },

  // 卡片公共样式
  card: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border.dividerLight,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: theme.size.text.T4,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: 16,
  },

  // 基础信息卡片
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.dividerLight,
  },
  infoRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  infoLabel: {
    fontSize: theme.size.text.T2,
    color: theme.colors.text.secondary,
  },
  infoValue: {
    fontSize: theme.size.text.T2,
    color: theme.colors.text.primary,
    fontWeight: '500',
  },
  infoCode: {
    fontFamily: 'monospace',
    color: theme.colors.text.tertiary,
    backgroundColor: theme.colors.background.tertiary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },

  // 控制测试卡片
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  optionChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
    backgroundColor: theme.colors.background.primary,
  },
  optionChipActive: {
    backgroundColor: theme.colors.brand.primary,
    borderColor: theme.colors.brand.primary,
  },
  optionText: {
    fontSize: theme.size.text.T2,
    fontWeight: '500',
    color: theme.colors.text.secondary,
  },
  optionTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  buttonPrimary: {
    backgroundColor: theme.colors.brand.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: theme.size.text.T3,
    fontWeight: 'bold',
  },

  // 代码示例卡片
  codeContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border.dividerLight,
    position: 'relative',
  },
  copyButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 6,
    zIndex: 1,
  },
  copyButtonText: {
    color: '#E2E2E2',
    fontSize: theme.size.text.T1,
    fontWeight: '500',
  },
}))
