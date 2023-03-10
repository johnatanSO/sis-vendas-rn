import { Text } from 'react-native'
import {styles} from './NavigationMenuStyles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faChartPie, faGears, faClipboardList} from '@fortawesome/free-solid-svg-icons'

export function NavigationMenu({ }){
  return (
    <nav style={styles.navMenuContainer}>
      <ul style={styles.listMenu}>
        <li style={styles.listItem}>
          <FontAwesomeIcon size={19} color="white" icon={faChartPie} />
          <Text style={styles.textMenu}>Dashboard</Text>
        </li>
        <li style={styles.listItem}>
          <FontAwesomeIcon size={19} color="white" icon={faClipboardList} />
          <Text style={styles.textMenu}>Relatórios</Text>
        </li>
        <li style={styles.listItem}>
          <FontAwesomeIcon size={19} color="white" icon={faGears} />
          <Text style={styles.textMenu}>Configurações</Text>
        </li>
      </ul>
    </nav>
  )
}