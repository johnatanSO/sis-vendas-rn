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
    minHeight: '100px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderRadius: 8,
  },
  header: {
    //width: '50%',
    paddingLeft: '15px',
    paddingRight: '15px',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.3)',
    paddingBottom: '4px',
    textAlign: 'center'
  },
  text: {
    color: 'white'
  }
})
