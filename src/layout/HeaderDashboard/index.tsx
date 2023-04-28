import { Text, View } from 'react-native'
import { styles } from './HeaderDashboardStyles'

export function HeaderDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
    </View>
  )
}
