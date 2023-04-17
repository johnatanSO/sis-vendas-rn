import { ScrollView, Text, View } from 'react-native'
import { styles } from './SummaryStyle'
import { Venda } from '../../screens/Dashboard'
import { formatting } from '../../utils/formatting'

interface SummaryProps {
  vendas: Venda[]
}

export default function Summary({ vendas }: SummaryProps) {
  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.titleContainer}>Formas de pagamento</Text>
      <ScrollView
        contentContainerStyle={{
          width: '100%',
          rowGap: 10,
          padding: 17,
        }}
      >
        {vendas?.map((venda) => {
          return (
            <View style={styles.card} key={venda.id}>
              <Text style={styles.text}>{venda.paymentType}</Text>
              <Text style={styles.text}>
                {formatting.formatarReal(venda.value)}
              </Text>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}
