import { StyleSheet } from 'react-native'
import theme from '../../../../styles/theme'

export const styles = StyleSheet.create({
  list: {
    marginTop: 25,
    width: '85%',
  },
  productItem: {
    backgroundColor: theme.COLORS.GRAY_400,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '1rem',
    paddingRight: '1.1rem',
    paddingLeft: '1.1rem',
  },
  text: {
    color: theme.COLORS.GRAY_100,
    fontFamily: theme.FONT_FAMILY.BOLD,
  },
})
