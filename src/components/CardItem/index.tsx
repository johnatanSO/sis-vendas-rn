import { View, Text } from 'react-native'
import { styles } from './CardItemStyles'

export function CardItem({ item }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{item.cliente.nome}</Text>
      <Text>{item.paymentType}</Text>
      <Text>{item.value}</Text>
    </View>
  )
}
