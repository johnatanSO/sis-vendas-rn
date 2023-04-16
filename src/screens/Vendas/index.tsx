import { Button, Text, View } from 'react-native'
import { styles } from './VendasStyles'

export function Vendas({ navigation }: any) {
  function handleGoToNewSale() {
    navigation.navigate('NovaVenda')
  }
  return (
    <View style={styles.container}>
      <Text style={{ color: 'white' }}>Vendas</Text>
      <Button onPress={handleGoToNewSale} title="Nova venda" />
    </View>
  )
}
