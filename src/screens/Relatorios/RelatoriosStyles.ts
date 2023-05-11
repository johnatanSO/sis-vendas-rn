import { StyleSheet } from 'react-native'
import theme from '../../../styles/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  subHeader: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    gap: 15
  },
  menuButton: {
    borderBottomWidth: 2,
    borderColor: theme.COLORS.GRAY_300,
    paddingBottom: 10,
    marginTop: 30,
    paddingLeft: 35,
    paddingRight: 35,
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center'
  },
  buttonText: {
    color: theme.COLORS.GRAY_100,
    fontWeight: "500",
    fontSize: 17
  },
  buttonIcon: {
    color: theme.COLORS.GRAY_100,
  },
})
