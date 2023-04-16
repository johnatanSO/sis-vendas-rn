import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  summaryContainer: {
    padding: '15px',
    width: '80%',
    marginTop: '20px',
  },
  card: {
    color: 'white',
    backgroundColor: 'rgb(40,40,40)',
    boxShadow: '1px 3px 10px rgba(0,0,0,0.3)',
    width: '100%',
    minHeight: '100px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    borderRadius: 12,
    marginBottom: '15px',
  },
  header: {
    paddingLeft: '20px',
    paddingRight: '20px',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.3)',
    paddingBottom: '4px',
    textAlign: 'center',
  },
  text: {
    color: 'white',
  },
})
