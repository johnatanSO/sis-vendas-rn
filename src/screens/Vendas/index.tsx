import { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { EmptyItems } from '../../components/EmptyItems'
import HeaderSales from '../../layout/HeaderSales'
import { formatting } from '../../utils/formatting'
import { styles } from './VendasStyles'
import dayjs from 'dayjs'
import { ModalSale } from './ModalSale'
import http from '../../http'
import { Product } from '../Relatorios/ProductsList'

export interface Sale {
  _id: string
  client: string
  date: Date
  products: Product[]
  totalValue: number
  paymentType: string
  canceled?: boolean
}

interface VendasProps {
  navigation: any
}

export function Vendas({ navigation }: VendasProps) {
  const [sales, setSales] = useState<Sale[]>([])
  const [saleDetailsModalOpened, setSaleDetailsModalOpened] =
    useState<boolean>(false)
  const [saleDetailsData, setSaleDetailsData] = useState<Sale | undefined>(
    undefined,
  )

  function handleGoToNewSale() {
    navigation.navigate('NovaVenda')
  }

  useEffect(() => {
    http.get('/vendas').then((res) => {
      setSales(res.data.items)
    })
  }, [])

  function handleOpenSaleDetailsModal(sale: Sale) {
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
