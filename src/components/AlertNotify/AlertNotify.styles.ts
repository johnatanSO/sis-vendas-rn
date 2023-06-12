import { StyleSheet } from 'react-native'
import theme from '../../../styles/theme'

export const styles = StyleSheet.create({
  alertOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
  },
  alertContainer: {
    backgroundColor: theme.COLORS.GRAY_400,
    maxWidth: '85%',
    borderRadius: 10,
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 20,
    paddingTop: 30,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  icon: {
    opacity: 0.8,
  },
  text: {
    color: theme.COLORS.GRAY_200,
  },
  button: {
    backgroundColor: theme.COLORS.RED,
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    lineHeight: 1,
    marginTop: 10,
  },
  textButton: {
    color: theme.COLORS.WHITE,
    fontSize: 12,
    fontWeight: '500',
  },
})
