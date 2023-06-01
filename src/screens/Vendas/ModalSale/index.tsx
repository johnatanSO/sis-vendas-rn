import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPen, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Alert, Modal, Pressable, ScrollView, Text, View } from 'react-native'
import { styles } from './ModalSalesStyles'
import { formatting } from '../../../utils/formatting'
import dayjs from 'dayjs'
import { Sale } from '..'
import { salesService } from '../../../services/salesService.service'

interface ModalSaleProps {
  saleDetailsData: Sale
  getSales: () => void
  setSaleDetailsModalOpened: (open: boolean) => void
}

export function ModalSale({
  saleDetailsData,
  setSaleDetailsModalOpened,
  getSales,
}: ModalSaleProps) {
  function handleCancelOrder() {
    Alert.alert(
      'Alerta de confirmação',
      'Deseja realmente cancelar esta venda?',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            salesService
              .cancel(saleDetailsData)
              .then(() => {
                setSaleDetailsModalOpened(false)
                getSales()
              })
              .catch((err) => {
                console.log('ERRO', err.response.data.message)
                Alert.alert('Alerta de erro', err.response.data.message)
              })
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => {},
        },
      ],
    )
  }

  function handleEditOrder() {}

  return (
    <Modal transparent={true} animationType="fade">
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

          <ScrollView
            contentContainerStyle={{
              alignItems: 'center',
              flexGrow: 1,
            }}
            style={styles.infosContainer}
          >
            <View style={styles.fieldContainer}>
              <Text style={styles.titleField}>Cliente</Text>
              <Text style={styles.text}>{saleDetailsData?.client || '--'}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.titleField}>Data</Text>
              <Text style={styles.text}>
                {dayjs(saleDetailsData?.date).format('DD/MM/YYYY - HH:mm') ||
                  '--'}
              </Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.titleField}>Produtos</Text>
              {saleDetailsData?.products.map((product) => (
                <View style={styles.productItem} key={product?._id}>
                  <Text style={styles.text}>{product.name || '--'}</Text>
                  <Text style={styles.text}>
                    {formatting.formatarReal(product?.value || 0) || '--'}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.titleField}>Valor</Text>
              <Text style={styles.text}>
                {formatting.formatarReal(saleDetailsData?.totalValue || 0)}
              </Text>
            </View>
            <View style={[styles.fieldContainer, { marginBottom: 20 }]}>
              <Text style={styles.titleField}>Forma de pagamento</Text>
              <Text style={styles.text}>
                {formatting.formatarFormaDePagamento(
                  saleDetailsData?.paymentType,
                ) || '--'}
              </Text>
            </View>
          </ScrollView>

          {saleDetailsData?.status !== 'canceled' ? (
            <>
              <Pressable
                onPress={handleCancelOrder}
                style={styles.cancelButton}
              >
                <FontAwesomeIcon color={'white'} icon={faTrash} />
                <Text style={styles.textButton}>Cancelar</Text>
              </Pressable>
              <Pressable onPress={handleEditOrder} style={styles.editButton}>
                <FontAwesomeIcon color={'white'} icon={faPen} />
                <Text style={styles.textButton}>Editar venda</Text>
              </Pressable>
            </>
          ) : (
            <Text style={{ ...styles.canceledText, marginTop: 20 }}>
              Venda cancelada
            </Text>
          )}
        </View>
      </View>
    </Modal>
  )
}
