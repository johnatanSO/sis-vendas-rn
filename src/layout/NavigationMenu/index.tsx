import { styles } from './NavigationMenuStyles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  faChartPie,
  faClipboardList,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons'
import { View } from 'react-native'

export function NavigationMenu(props: any) {
  return (
    <View style={styles.navMenuContainer}>
      <ul style={styles.listMenu}>
        <li
          onClick={() => {
            props.navigation.navigate('Dashboard')
          }}
          style={styles.listItem}
        >
          <FontAwesomeIcon size={19} color="white" icon={faChartPie} />
        </li>
        <li
          onClick={() => {
            props.navigation.navigate('Vendas')
          }}
          style={styles.listItem}
        >
          <FontAwesomeIcon size={19} color="white" icon={faDollarSign} />
        </li>
        <li
          onClick={() => {
            props.navigation.navigate('Relatorios')
          }}
          style={styles.listItem}
        >
          <FontAwesomeIcon size={19} color="white" icon={faClipboardList} />
        </li>
      </ul>
    </View>
  )
}

NavigationMenu.navigationOptions = {
  title: 'NavigationMenu',
}
