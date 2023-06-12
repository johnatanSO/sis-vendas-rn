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
    backgroundColor: theme.COLORS.GRAY_300,
    width: '80%',
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
  },
})
