import { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { EmptyItems } from '../../components/EmptyItems'
import HeaderSales from '../../layout/HeaderSales'
import { formatting } from '../../utils/formatting'
import { styles } from './VendasStyles'
import dayjs from 'dayjs'
import { ModalSale } from '../../components/ModalSale'

export function Vendas({ navigation }: any) {
  const [sales, setSales] = useState<any>([])
  const [saleDetailsModalOpened, setSaleDetailsModalOpened] =
    useState<boolean>(false)
  const [saleDetailsData, setSaleDetailsData] = useState<any>(undefined)

  function handleGoToNewSale() {
    navigation.navigate('NovaVenda')
  }

  useEffect(() => {
    fetch('http://localhost:5000/vendas')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data.items)
        setSales(data.items)
      })
  }, [])

  function handleOpenSaleDetailsModal(sale: any) {
    setSaleDetailsData(sale)
    setSaleDetailsModalOpened(true)
  }

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
        ItemSeparatorComponent={() => <View style={{ height: 13 }} />}
        style={styles.listContainer}
        keyExtractor={(sale) => sale?._id}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                handleOpenSaleDetailsModal(item)
              }}
              style={styles.listItem}
            >
              <Text style={item?.canceled ? styles.canceledText : styles.text}>
                {dayjs(item?.date).format('DD/MM/YYYY')}
              </Text>
              <Text style={item?.canceled ? styles.canceledText : styles.text}>
                {formatting.formatarReal(item?.totalValue)}
              </Text>
            </Pressable>
          )
        }}
      />
      {saleDetailsModalOpened && (
        <ModalSale
          setSaleDetailsModalOpened={setSaleDetailsModalOpened}
          saleDetailsData={saleDetailsData}
        />
      )}
    </View>
  )
}
