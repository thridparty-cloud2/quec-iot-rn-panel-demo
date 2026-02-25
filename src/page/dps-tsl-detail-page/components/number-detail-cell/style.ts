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
  testValueContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  testValueText: {
    fontSize: 48,
    fontWeight: '700',
    color: theme.colors.brand.primary,
  },
  testUnitText: {
    fontSize: 30,
    fontWeight: '700',
    color: theme.colors.brand.primary,
  },
  testValueUnit: {
    fontSize: theme.size.text.T3,
    color: theme.colors.text.secondary,
    marginLeft: 4,
  },
  sliderContainer: {
    marginBottom: 24,
  },
  trackStyle: {
    height: 6,
    borderRadius: 3,
  },
  thumbStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
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
  },
}))
