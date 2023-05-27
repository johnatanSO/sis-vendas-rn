import { View } from 'react-native'
import { styles } from './DashboardStyles'
import { Summary } from '../../components/Summary'
import TotalValue from '../../components/TotalValue'
import { useEffect, useState } from 'react'
import { HeaderDashboard } from '../../layout/HeaderDashboard'
import http from '../../http'

export interface PaymentType {
  type: string
  value: number
}

interface DashboardProps {
  navigation: any
}

export function Dashboard({ navigation }: DashboardProps) {
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      http.get('/dashboard/formasDePagamento').then((res) => {
        setPaymentTypes(res.data.items)
      })
    })

    return unsubscribe
  }, [navigation])

  return (
    <View style={styles.container}>
      <HeaderDashboard />
      <Summary paymentTypes={paymentTypes} />
      <TotalValue paymentTypes={paymentTypes} />
    </View>
  )
}
