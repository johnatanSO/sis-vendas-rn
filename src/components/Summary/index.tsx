import { ScrollView, Text, View } from 'react-native'
import { styles } from './SummaryStyle'
import { formatting } from '../../utils/formatting'

interface SummaryProps {
  paymentTypes: any
}

export function Summary({ paymentTypes }: SummaryProps) {
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
        {paymentTypes.map((formaDePagamento: any) => {
          return (
            <View key={formaDePagamento.id} style={styles.card}>
              <Text style={styles.text}>
                {formaDePagamento?.paymentType || '--'}
              </Text>
              <Text style={styles.text}>
                {formatting.formatarReal(formaDePagamento?.value || 0)}
              </Text>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}
