import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  navMenuContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginTop: 'auto',
    backgroundColor: 'rgb(30,30,30)',
    color: 'white',
    fontSize: 20,
    height: '55px',
  },
  listMenu: {
    display: 'flex',
    alignItems: 'center',
    padding: '0',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    listStyleType: 'none',
    gap: 30,
  },
  textMenu: {
    color: 'rgba(255,255,255, 0.8)',
    fontWeight: '400',
    marginTop: '5px',
    fontSize: 13,
  },
})
