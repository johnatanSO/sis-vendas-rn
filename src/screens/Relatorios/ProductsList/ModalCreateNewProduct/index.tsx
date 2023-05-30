import { useState } from 'react'
import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
} from 'react-native'
import { styles } from './ModalCreateNewProduct.styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import theme from '../../../../../styles/theme'
import { productsService } from '../../../../services/productsService.service'

interface ModalCreateNewProductProps {
  productDataToEdit: any
  setProductDataToEdit: (productData: any) => void
  handleClose: (open: boolean) => void
  getProducts: () => void
}

export interface NewProduct {
  name: string
  value: string
  stock: string
}

export function ModalCreateNewProduct({
  handleClose,
  getProducts,
  productDataToEdit,
  setProductDataToEdit,
}: ModalCreateNewProductProps) {
  const defaultValuesNewProduct = {
    name: '',
    value: '0',
    stock: '0',
  }

  const [newProduct, setNewProduct] = useState<NewProduct>(
    productDataToEdit || defaultValuesNewProduct,
  )
  const [loadingCreateNew, setLoadingCreateNew] = useState<boolean>(false)

  function createNewProduct() {
    setLoadingCreateNew(true)
    productsService
      .create(newProduct)
      .then(() => {
        handleClose(false)
        Alert.alert('Produto cadastrado com sucesso')
        getProducts()
      })
      .catch((err: any) => {
        Alert.alert(
          'Erro ao tentar cadastrar o produto',
          err.response.data.message,
        )
        console.log(err.response.data.message)
      })
      .finally(() => {
        setLoadingCreateNew(false)
      })
  }

  function updateProduct() {
    setLoadingCreateNew(true)
    productsService
      .update(newProduct)
      .then((res) => {
        handleClose(false)
        getProducts()
        setProductDataToEdit(undefined)
        console.log('Produto atualizado com sucesso: ', res.data)
      })
      .catch((err) => {
        Alert.alert(
          'Erro ao tentar atualizar o produto',
          err.response.data.message,
        )
        console.log('[ERROR]:', err.response.data.message)
      })
      .finally(() => {
        setLoadingCreateNew(false)
      })
  }

  return (
    <Modal transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.headerModal}>
              <Text style={styles.titleModal}>Informações do produto</Text>
              <Pressable
                onPress={() => {
                  handleClose(false)
                  setProductDataToEdit(undefined)
                }}
              >
                <FontAwesomeIcon
                  size={25}
                  style={styles.closeModalIcon}
                  icon={faXmark}
                />
              </Pressable>
            </View>

            <View style={styles.fieldsContainer}>
              <View>
                <Text style={styles.labelField}>Nome</Text>
                <TextInput
                  onChangeText={(text) => {
                    setNewProduct({
                      ...newProduct,
                      name: text,
                    })
                  }}
                  value={newProduct.name}
                  placeholder="Digite o nome do produto"
                  placeholderTextColor={theme.COLORS.GRAY_300}
                  style={styles.input}
                />
              </View>

              <View>
                <Text style={styles.labelField}>Valor</Text>
                <TextInput
                  onChangeText={(text) => {
                    setNewProduct({
                      ...newProduct,
                      value: text,
                    })
                  }}
                  value={newProduct.value}
                  keyboardType="numeric"
                  placeholder="Digite o valor do produto"
                  placeholderTextColor={theme.COLORS.GRAY_300}
                  style={styles.input}
                />
              </View>

              <View>
                <Text style={styles.labelField}>Estoque</Text>
                <TextInput
                  onChangeText={(text) => {
                    setNewProduct({
                      ...newProduct,
                      stock: text,
                    })
                  }}
                  value={newProduct.stock}
                  keyboardType="number-pad"
                  placeholder="Digite a quantidade do estoque"
                  placeholderTextColor={theme.COLORS.GRAY_300}
                  style={styles.input}
                />
              </View>
            </View>

            <Pressable
              onPress={productDataToEdit ? updateProduct : createNewProduct}
              style={styles.confirmButton}
            >
              <Text style={styles.confirmButtonText}>
                {loadingCreateNew ? (
                  <ActivityIndicator color={theme.COLORS.WHITE} />
                ) : (
                  'Confirmar'
                )}
              </Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
