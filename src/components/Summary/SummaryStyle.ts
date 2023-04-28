import { StyleSheet } from 'react-native'
import theme from '../../../styles/theme'

export const styles = StyleSheet.create({
  summaryContainer: {
    width: '85%',
    marginTop: '-6vh',
    backgroundColor: theme.COLORS.GRAY_600,
    borderRadius: 20,
    boxShadow: '1px 3px 10px rgba(0,0,0,0.5)',
  },
  card: {
    boxShadow: '0px 3px 7px rgba(0,0,0,0.2)',
    backgroundColor: theme.COLORS.GRAY_400,

    width: '100%',
    padding: 20,
    borderRadius: 15,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: theme.COLORS.GRAY_100,
    fontFamily: theme.FONT_FAMILY.REGULAR,
  },
  titleContainer: {
    color: theme.COLORS.GRAY_100,
    fontFamily: theme.FONT_FAMILY.BOLD,
    textAlign: 'center',
    fontSize: 18,
    marginTop: 25,
  },
})
