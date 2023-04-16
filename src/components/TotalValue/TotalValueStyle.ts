import { StyleSheet } from 'react-native'
import theme from '../../../styles/theme'

export const styles = StyleSheet.create({
  totalValueContainer: {
    backgroundColor: theme.COLORS.BLUE_500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 12,
    padding: '20px',
    paddingRight: '25px',
    paddingLeft: '25px',
    marginTop: 'auto',
    marginBottom: '3rem',
    width: '90%',
    boxShadow: '1px 3px 10px rgba(0,0,0,0.3)',
  },
  text: {
    color: 'white',
    fontWeight: '500',
    fontSize: 20,
    display: 'flex',
  },
})
