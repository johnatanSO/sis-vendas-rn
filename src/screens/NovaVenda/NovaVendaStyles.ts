import { StyleSheet } from 'react-native'
import theme from '../../../styles/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
  },
  input: {
    backgroundColor: 'rgb(30,30,30)',
    width: '85%',
    color: 'white',
    borderRadius: 10,
    padding: 15,
  },
  newSaleButton: {
    padding: 15,
    borderRadius: 10,
    width: '85%',
    alignItems: 'center',
    backgroundColor: theme.COLORS.PURPLE_500,
  },
  textNewSaleButton: {
    color: theme.COLORS.WHITE,
    fontFamily: theme.FONT_FAMILY.REGULAR,
  },
})
