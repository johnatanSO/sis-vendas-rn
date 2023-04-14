import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  summaryContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px',
    border: '1px solid white',
    width: '80%',
    marginTop: '10px',
    borderRadius: 10,
    gap: 15,
  },
  card: {
    color: 'white',
    backgroundColor: 'rgb(40,40,40)',
    boxShadow: '1px 3px 7px rgba(0,0,0,0.4)',
    width: '100%',
    padding: '15px',
    borderRadius: 8,
    display: 'flex',
    gap: 15
  },
  header: {
    width: '100%',
    border: '1px solid rgb(255,255,255)',
  },
  text: {
    color: 'white'
  }
})
