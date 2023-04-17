import { Text, View } from 'react-native'
import { styles } from './HeaderNewSaleStyles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

export default function HeaderNewSale() {
  return (
    <View style={styles.container}>
      <FontAwesomeIcon color="white" icon={faAngleLeft} />
      <Text style={styles.title}>Nova venda</Text>
    </View>
  )
}
