import { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { EmptyItems } from '../../components/EmptyItems'
import HeaderSales from '../../layout/HeaderSales'
import { formatting } from '../../utils/formatting'
import { styles } from './VendasStyles'

export function Vendas({ navigation }: any) {
  const [sales, setSales] = useState<any>([])
  function handleGoToNewSale() {
    navigation.navigate('NovaVenda')
  }

  useEffect(() => {
    fetch('http://localhost:8080/vendas')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data)
        setSales(data.items)
      })
  }, [])

  return (
    <View style={styles.container}>
      <HeaderSales />
      <Pressable style={styles.newSaleButton} onPress={handleGoToNewSale}>
        <Text style={styles.newSaleButtonText}>Nova venda</Text>
      </Pressable>
      <FlatList
        data={sales}
        ListEmptyComponent={() => (
          <EmptyItems text="Nenhuma venda encontrada" />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        style={styles.listContainer}
        keyExtractor={(sale) => sale.id}
        renderItem={({ item }) => {
          return (
            <View style={styles.listItem}>
              <Text style={styles.text}>{item.paymentType}</Text>
              <Text style={styles.text}>
                {formatting.formatarReal(item.value)}
              </Text>
            </View>
          )
        }}
      />
    </View>
  )
}
