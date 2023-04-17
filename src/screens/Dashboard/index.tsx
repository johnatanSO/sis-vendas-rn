import { View } from 'react-native'
import { styles } from './DashboardStyles'
import Summary from '../../components/Summary'
import TotalValue from '../../components/TotalValue'
import { useEffect, useState } from 'react'
import HeaderDashboard from '../../layout/HeaderDashboard'

interface DashboardProps {
  navigation: any
}

export interface Venda {
  id: number
  paymentType: string
  value: number
}

export function Dashboard({ navigation }: DashboardProps) {
  const [vendas, setVendas] = useState<Venda[]>([])
  useEffect(() => {
    fetch('http://localhost:8080/vendas')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setVendas(data.items)
      })
  }, [])
  return (
    <View style={styles.container}>
      <HeaderDashboard />
      <Summary vendas={vendas} />
      <TotalValue vendas={vendas} />
    </View>
  )
}
