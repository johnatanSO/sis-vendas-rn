import { StyleSheet } from 'react-native'
import theme from '../../../styles/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  newSaleButton: {
    backgroundColor: theme.COLORS.PURPLE_500,
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
    marginBottom: 25,
    width: '60%',
    textAlign: 'center',
    boxShadow: '1px 3px 10px rgba(0,0,0,0.5)',
  },
  newSaleButtonText: {
    color: theme.COLORS.WHITE,
    fontFamily: theme.FONT_FAMILY.BOLD,
    fontSize: 16,
  },
  listContainer: {
    width: '85%',
  },
  listItem: {
    backgroundColor: theme.COLORS.GRAY_600,
    padding: 18,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    boxShadow: '1px 3px 7px rgba(0,0,0,0.3)',
  },
  text: {
    color: theme.COLORS.WHITE,
    fontFamily: theme.FONT_FAMILY.REGULAR,
  },
})
