import { Text, View } from 'react-native'
import { styles } from './TotalValueStyle'
import { formatting } from '../../utils/formatting'

interface TotalValueProps {
  paymentTypes: any
}

export default function TotalValue({ paymentTypes }: TotalValueProps) {
  const totalPaymentTypes = paymentTypes.reduce(
    (acc: number, paymentType: any) => {
      acc += paymentType.value
      return acc
    },
    0,
  )

  return (
    <>
      <View style={styles.totalValueContainer}>
        <Text style={styles.text}>Valor total</Text>
        <Text style={styles.text}>
          {formatting.formatarReal(totalPaymentTypes || 0)}
        </Text>
      </View>
    </>
  )
}
