import { useEffect, useState } from 'react'
import { Modal, Pressable, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { EmptyItems } from '../../components/EmptyItems'
import HeaderSales from '../../layout/HeaderSales'
import { formatting } from '../../utils/formatting'
import { styles } from './VendasStyles'
import dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export function Vendas({ navigation }: any) {
  const [sales, setSales] = useState<any>([])
  const [saleDetailsModalOpened, setSaleDetailsModalOpened] =
    useState<boolean>(false)
  const [saleDetailsData, setSaleDetailsData] = useState<any>(undefined)

  function handleGoToNewSale() {
    navigation.navigate('NovaVenda')
  }

  useEffect(() => {
    fetch('http://localhost:8080/vendas')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
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
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        style={styles.listContainer}
        keyExtractor={(sale) => sale.id}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                handleOpenSaleDetailsModal(item)
              }}
              style={styles.listItem}
            >
              <Text style={styles.text}>
                {dayjs(item.date).format('DD/MM/YYYY')}
              </Text>
              <Text style={styles.text}>
                {formatting.formatarReal(item.value)}
              </Text>
            </Pressable>
          )
        }}
      />
      <Modal
        visible={saleDetailsModalOpened}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.headerModal}>
              <Text style={styles.titleModal}>Informações da venda</Text>
              <Pressable
                onPress={() => {
                  setSaleDetailsModalOpened(false)
                }}
              >
                <FontAwesomeIcon
                  size={25}
                  style={styles.closeModalIcon}
                  icon={faXmark}
                />
              </Pressable>
            </View>

            <View style={styles.infosContainer}>
              <Text style={styles.text}>
                Cliente {saleDetailsData?.client?.nome}
              </Text>
              <Text style={styles.text}>
                Data {dayjs(saleDetailsData?.date).format('DD/MM/YYYY')}
              </Text>
              <Text style={styles.text}>
                Produtos{' '}
                {saleDetailsData?.products.map((product: any) => product.name)}
              </Text>
              <Text style={styles.text}>Valor {saleDetailsData?.value}</Text>
              <Text style={styles.text}>
                Forma de pagamento {saleDetailsData?.paymentType}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}
