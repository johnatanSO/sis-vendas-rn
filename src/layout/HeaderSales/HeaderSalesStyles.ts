import { Dimensions, StyleSheet } from 'react-native'
import theme from '../../../styles/theme'
const windowHeight = Dimensions.get('window').height

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.GRAY_600,
    width: '100%',
    paddingTop: windowHeight / 15,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    color: theme.COLORS.WHITE,
    fontFamily: theme.FONT_FAMILY.BOLD,
    fontSize: 25,
  },
})
