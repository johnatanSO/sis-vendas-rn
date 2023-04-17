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

  modalOverlay: {
    backgroundColor: 'rgba(0,0,0,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
  },
  modalContainer: {
    backgroundColor: theme.COLORS.GRAY_600,
    width: '85%',
    maxHeight: '85%',
    borderRadius: 20,
    alignItems: 'center',
    padding: 25,
  },
  headerModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  closeModalIcon: {
    color: theme.COLORS.RED,
  },
  titleModal: {
    color: theme.COLORS.WHITE,
    fontSize: 20,
    fontFamily: theme.FONT_FAMILY.BOLD,
  },
  infosContainer: {
    backgroundColor: theme.COLORS.GRAY_700,
    borderRadius: 20,
    width: '100%',
    marginTop: 30,
    padding: 15,
  },
})
