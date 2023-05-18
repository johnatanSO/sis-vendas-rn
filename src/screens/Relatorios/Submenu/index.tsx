import { Pressable, Text, View } from 'react-native'
import { styles } from './Submenu.styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import theme from '../../../../styles/theme'
import { faUsers, faWineBottle } from '@fortawesome/free-solid-svg-icons'

export function Submenu() {
  return (
    <View style={styles.subHeader}>
      <Pressable style={styles.menuButton}>
        <FontAwesomeIcon
          style={{
            ...styles.buttonIcon,
            color: theme.COLORS.PRIMARY_COLOR,
            borderColor: theme.COLORS.PRIMARY_COLOR,
          }}
          icon={faWineBottle}
        />
        <Text
          style={{ ...styles.buttonText, color: theme.COLORS.PRIMARY_COLOR }}
        >
          Produtos
        </Text>
      </Pressable>
      <Pressable style={styles.menuButton}>
        <FontAwesomeIcon style={styles.buttonIcon} icon={faUsers} />
        <Text style={styles.buttonText}>Clientes</Text>
      </Pressable>
    </View>
  )
}
