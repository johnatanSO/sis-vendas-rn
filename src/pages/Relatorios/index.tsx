import { Text, View } from 'react-native'
import { styles } from './RelatoriosStyles'

interface RelatoriosProps {}

export function Relatorios({}: RelatoriosProps) {
  return (
    <View style={styles.container}>
      <Text style={{ color: 'white' }}>Relatórios</Text>
    </View>
  )
}
