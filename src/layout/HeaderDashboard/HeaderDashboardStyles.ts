import { StyleSheet, Dimensions } from 'react-native'
import theme from '../../../styles/theme'

const windowHeight = Dimensions.get('window').height

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.PRIMARY_COLOR,
    width: '100%',
    alignItems: 'center',
    height: windowHeight / 4,
  },
  title: {
    color: theme.COLORS.WHITE,
    fontFamily: theme.FONT_FAMILY.BOLD,
    fontSize: 25,
    marginTop: windowHeight / 15,
  },
  backgroundImage: {
    width: 100,
    height: 100,
    marginTop: 15,
    filter: 'grayscale(1)',
    opacity: 0.2,
  },
  notificationIcon: {
    position: 'absolute',
    top: windowHeight / 15,
    right: 25,
    color: theme.COLORS.WHITE,
    filter: 'drop-shadow(1px 1px 5px rgba(0,0,0,0.2))',
  },
})
