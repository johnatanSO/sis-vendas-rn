import { Text } from 'react-native'
import {styles} from './HeaderStyles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faUser, faBars} from '@fortawesome/free-solid-svg-icons'

export default function Header({ }){
  return (
    <>
      <header style={styles.headerContainer}>
        <FontAwesomeIcon style={{ marginLeft: "15px", color: "white" }} size={ 18 } icon={faBars} />
        <Text style={{ color: 'white', fontSize: 18 }}>Delivery</Text>
        <FontAwesomeIcon style={{ marginRight: "15px", color: "white" }} size={ 18 }icon={faUser} />
      </header>
    </>
  )
}