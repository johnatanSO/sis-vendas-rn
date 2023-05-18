import { useState } from 'react'
import { View } from 'react-native'
import { styles } from './RelatoriosStyles'
import HeaderReports from '../../layout/HeaderReports'
import { ProductsList } from './ProductsList'
import { Submenu } from './Submenu'

export function Relatorios() {
  const [activeReport, setActiveReport] = useState<string>('products')
  return (
    <View style={styles.container}>
      <HeaderReports />

      <Submenu activeReport={activeReport} setActiveReport={setActiveReport} />
      <ProductsList />
    </View>
  )
}
