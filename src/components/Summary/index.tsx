import { Text, View } from 'react-native'
import { styles } from './SummaryStyle'
import { Venda } from '../../pages/Dashboard'
import { formatting } from '../../utils/formatting'

interface SummaryProps {
  vendas: Venda[]
}

export default function Summary({ vendas }: SummaryProps) {
  return (
    <>
      <View style={styles.summaryContainer}>
        {vendas?.map((venda) => {
          return (
            <View style={styles.card} key={venda.id}>
              <View style={styles.header}>
                <Text style={styles.text}>{venda.paymentType}</Text>
              </View> 
              <Text style={styles.text}>{formatting.formatarReal(venda.value)}</Text>
            </View>
          )
        })}
      </View>
    </>
  )
}
