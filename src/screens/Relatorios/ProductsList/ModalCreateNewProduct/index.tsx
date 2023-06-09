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
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'
import { styles } from './ModalCreateNewProduct.styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import theme from '../../../../../styles/theme'
import { productsService } from '../../../../services/productsService.service'
import CurrencyInput from 'react-native-currency-input'

interface ModalCreateNewProductProps {
  productDataToEdit: any
  open: boolean
  setProductDataToEdit: (productData: any) => void
  handleClose: () => void
  getProducts: () => void
}

export interface NewProduct {
  name: string
  value: number
  stock: number
}

export function ModalCreateNewProduct({
  handleClose,
  open,
  getProducts,
  productDataToEdit,
  setProductDataToEdit,
}: ModalCreateNewProductProps) {
  const defaultValuesNewProduct = {
    name: '',
    value: 0,
    stock: 0,
  }

  const [newProduct, setNewProduct] = useState<NewProduct>(
    productDataToEdit || defaultValuesNewProduct,
  )
  const [loadingCreateNew, setLoadingCreateNew] = useState<boolean>(false)

  function createNewProduct() {
    if (!newProduct.name) {
      Alert.alert('Digite um nome para o produto')
    }
    setLoadingCreateNew(true)
    productsService
      .create(newProduct)
      .then(() => {
        handleClose()
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
    if (!newProduct.name) {
      Alert.alert('Digite um nome para o produto')
    }
    setLoadingCreateNew(true)
    productsService
      .update(newProduct)
      .then((res) => {
        handleClose()
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
    <Modal
      onRequestClose={() => {
        handleClose()
      }}
      visible={open}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContainer}>
            <View style={styles.headerModal}>
              <Text style={styles.titleModal}>Informações do produto</Text>
              <Pressable
                onPress={() => {
                  handleClose()
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

            <ScrollView style={styles.fieldsContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.labelField}>Nome</Text>
                <TextInput
                  onChangeText={(text) => {
                    setNewProduct({
                      ...newProduct,
                      name: text,
                    })
                  }}
                  value={newProduct.name}
                  placeholder="Nome do produto"
                  placeholderTextColor={theme.COLORS.GRAY_300}
                  style={styles.input}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.labelField}>Valor</Text>
                <CurrencyInput
                  value={newProduct.value}
                  onChangeValue={(value) => {
                    setNewProduct({
                      ...newProduct,
                      value: Number(value),
                    })
                  }}
                  prefix="R$"
                  delimiter="."
                  separator=","
                  precision={2}
                  minValue={0}
                  style={styles.input}
                  placeholder="Valor do produto"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.labelField}>Estoque</Text>
                <TextInput
                  onChangeText={(text) => {
                    setNewProduct({
                      ...newProduct,
                      stock: Number(text),
                    })
                  }}
                  value={newProduct.stock.toString()}
                  keyboardType="number-pad"
                  placeholder="Digite a quantidade do estoque"
                  placeholderTextColor={theme.COLORS.GRAY_300}
                  style={styles.input}
                />
              </View>
            </ScrollView>

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
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
