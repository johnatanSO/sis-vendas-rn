import { Text, View } from 'react-native'
import { styles } from './TotalValueStyle'
import { formatting } from '../../utils/formatting'
import { Venda } from '../../screens/Dashboard'

interface TotalValueProps {
  vendas: Venda[]
}

export default function TotalValue({ vendas }: TotalValueProps) {
  const totalVendas = vendas.reduce((acc, venda) => {
    acc += venda.value
    return acc
  }, 0)

  return (
    <>
      <View style={styles.totalValueContainer}>
        <Text style={styles.text}>Valor total</Text>
        <Text style={styles.text}>{formatting.formatarReal(totalVendas)}</Text>
      </View>
    </>
  )
}
