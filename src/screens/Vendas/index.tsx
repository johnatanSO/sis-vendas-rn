import { useEffect, useState } from 'react'
import { Modal, Pressable, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { EmptyItems } from '../../components/EmptyItems'
import HeaderSales from '../../layout/HeaderSales'
import { formatting } from '../../utils/formatting'
import { styles } from './VendasStyles'
import dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'

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
        ItemSeparatorComponent={() => <View style={{ height: 13 }} />}
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
              <Text style={item.canceled ? styles.canceledText : styles.text}>
                {dayjs(item.date).format('DD/MM/YYYY')}
              </Text>
              <Text style={item.canceled ? styles.canceledText : styles.text}>
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
              <View style={styles.fieldContainer}>
                <Text style={styles.titleField}>Cliente</Text>
                <Text style={styles.text}>
                  {saleDetailsData?.client?.nome || '--'}
                </Text>
              </View>
              <View style={styles.fieldContainer}>
                <Text style={styles.titleField}>Data</Text>
                <Text style={styles.text}>
                  {dayjs(saleDetailsData?.date).format('DD/MM/YYYY') || '--'}
                </Text>
              </View>
              <View style={styles.fieldContainer}>
                <Text style={styles.titleField}>Produtos</Text>
                {saleDetailsData?.products.map((product: any) => (
                  <Text
                    style={{
                      ...styles.text,
                    }}
                    key={product.name}
                  >
                    {product.name || '--'}
                  </Text>
                ))}
              </View>
              <View style={styles.fieldContainer}>
                <Text style={styles.titleField}>Valor</Text>
                <Text style={styles.text}>
                  {formatting.formatarReal(saleDetailsData?.value || 0)}
                </Text>
              </View>
              <View style={styles.fieldContainer}>
                <Text style={styles.titleField}>Forma de pagamento</Text>
                <Text style={styles.text}>
                  {saleDetailsData?.paymentType || '--'}
                </Text>
              </View>
            </View>

            {!saleDetailsData?.canceled ? (
              <Pressable style={styles.cancelButton}>
                <FontAwesomeIcon color={'white'} icon={faTrash} />
                <Text style={styles.textButton}>Cancelar</Text>
              </Pressable>
            ) : (
              <Text style={{ ...styles.canceledText, marginTop: 20 }}>
                Venda cancelada
              </Text>
            )}
          </View>
        </View>
      </Modal>
    </View>
  )
}
