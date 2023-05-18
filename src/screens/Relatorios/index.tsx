import { View } from 'react-native'
import { styles } from './RelatoriosStyles'
import HeaderReports from '../../layout/HeaderReports'
import { ProductsList } from './ProductsList'
import { Submenu } from './Submenu'

export function Relatorios() {
  return (
    <View style={styles.container}>
      <HeaderReports />

      <Submenu />
      <ProductsList />
    </View>
  )
}
