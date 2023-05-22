import { StyleSheet } from 'react-native'
import theme from '../../../styles/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    alignItems: 'center',
  },
  fields: {
    marginTop: '25px',
    width: '85%',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    backgroundColor: theme.COLORS.GRAY_600,
    color: theme.COLORS.GRAY_200,
    width: '100%',
    borderRadius: 10,
    padding: 15,
  },
  newSaleButton: {
    padding: 15,
    borderRadius: 10,
    width: '85%',
    alignItems: 'center',
    backgroundColor: theme.COLORS.PRIMARY_COLOR,
  },
  textNewSaleButton: {
    color: theme.COLORS.WHITE,
    fontFamily: theme.FONT_FAMILY.BOLD,
  },
})
