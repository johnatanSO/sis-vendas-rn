import { StyleSheet } from 'react-native'
import theme from '../../../styles/theme'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.PURPLE_500,
    width: '100%',
    alignItems: 'center',
    height: '20vh',
  },
  title: {
    color: theme.COLORS.WHITE,
    fontFamily: theme.FONT_FAMILY.BOLD,
    marginTop: '3vh',
    fontSize: 25,
  },
})
