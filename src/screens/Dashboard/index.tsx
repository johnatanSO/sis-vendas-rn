import { View } from 'react-native'
import { styles } from './DashboardStyles'
import { Summary } from '../../components/Summary'
import TotalValue from '../../components/TotalValue'
import { useEffect, useState } from 'react'
import { HeaderDashboard } from '../../layout/HeaderDashboard'

interface DashboardProps {
  navigation: any
}

export function Dashboard({ navigation }: DashboardProps) {
  const [paymentTypes, setPaymentTypes] = useState<any>([])
  useEffect(() => {
    fetch('http://localhost:5000/formasDePagamento')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data)
        setPaymentTypes(data.items)
      })
  }, [])
  return (
    <View style={styles.container}>
      <HeaderDashboard />
      <Summary paymentTypes={paymentTypes} />
      <TotalValue paymentTypes={paymentTypes} />
    </View>
  )
}
