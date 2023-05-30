import {
  View,
  Pressable,
  Text,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native'
import { useState } from 'react'
import { styles } from './NovaVendaStyles'
import HeaderNewSale from '../../layout/HeaderNewSale'
import http from '../../http'
import { Product } from '../Relatorios/ProductsList'
import { formasDePagamento, formatting } from '../../utils/formatting'
import { salesService } from '../../services/salesService.service'
import { Dropdown } from 'react-native-element-dropdown'
import theme from '../../../styles/theme'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

interface SaleProduct extends Product {
  amount: number
}

interface ListItem {
  text: string
  value: SaleProduct
}

interface NovaVendaProps {
  navigation: any
}

export interface NewSale {
  client: string
  products: SaleProduct[]
  paymentType: string
}

export function NovaVenda({ navigation }: NovaVendaProps) {
  const defaultValuesNewSale = {
    client: '',
    paymentType: '',
    products: [],
  }
  const [newSale, setNewSale] = useState<NewSale>(defaultValuesNewSale)
  const [productsList, setProductsList] = useState<ListItem[]>([])

  function createNewSale() {
    if (!newSale.paymentType) {
      Alert.alert('Forma de pagamento não informada')
      console.log('Forma de pagamento não informada')
      return
    }
    if (newSale.products.length === 0) {
      Alert.alert('Nenhum produto selecionado')
      console.log('Nenhum produto selecionado')
      return
    }

    salesService
      .create(newSale, totalValue)
      .then(() => {
        Alert.alert('Venda realizada com sucesso!')
        setNewSale(defaultValuesNewSale)
        navigation.navigate('Vendas')
      })
      .catch((err) => {
        Alert.alert('Erro ao tentar realizar venda', err.response.data.message)
        console.log('[ERROR]: ', err.response.data.message)
      })
  }

  const totalValue = newSale?.products?.reduce(
    (acc, prod) => /* (acc += prod.value) */ 0,
    0,
  )

  function getProducts() {
    http
      .get('/produtos')
      .then((res) => {
        const formatedList = res.data.items.map((product: SaleProduct) => ({
          value: product,
          text: product.name,
        }))
        setProductsList(formatedList)
      })
      .catch((err) => {
        console.log('[ERRO]: ', err)
      })
  }

  function onChangeProductField({ text, inputField, index }: any) {
    console.log('VALUE', text)
    const sale: any = { ...newSale }
    sale.products[index][inputField] = text.replace(',', '.')

    setNewSale(sale)
  }

  function handleAddNewProduct({ value }: ListItem) {
    value.amount = 1

    setNewSale({
      ...newSale,
      products: [...newSale.products, value],
    })
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <HeaderNewSale navigation={navigation} />

        <View style={styles.fields}>
          <TextInput
            placeholderTextColor={theme.COLORS.GRAY_300}
            style={styles.input}
            onChangeText={(text) => {
              setNewSale({
                ...newSale,
                client: text,
              })
            }}
            value={newSale.client}
            placeholder="Nome do cliente"
          />

          <Dropdown
            valueField="value"
            labelField="text"
            placeholder="Selecione a forma de pagamento"
            activeColor={theme.COLORS.GRAY_300}
            containerStyle={{
              backgroundColor: theme.COLORS.GRAY_500,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
            itemTextStyle={{
              color: theme.COLORS.GRAY_100,
            }}
            placeholderStyle={{ color: theme.COLORS.GRAY_200 }}
            selectedTextStyle={{ color: theme.COLORS.GRAY_100 }}
            style={styles.selectPaymentInput}
            onChange={({ value }) => {
              setNewSale({
                ...newSale,
                paymentType: value,
              })
            }}
            data={formasDePagamento}
          />

          <View style={styles.selectProductContainer}>
            <Text style={styles.labelSelectProduct}>Selecione um produto</Text>
            <View style={{ flexDirection: 'row' }}>
              <Dropdown
                valueField="value"
                labelField="text"
                placeholder="Produtos"
                activeColor={theme.COLORS.GRAY_300}
                containerStyle={{
                  backgroundColor: theme.COLORS.GRAY_500,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                }}
                itemTextStyle={{
                  color: theme.COLORS.GRAY_100,
                }}
                placeholderStyle={{ color: theme.COLORS.GRAY_200 }}
                selectedTextStyle={{ color: theme.COLORS.GRAY_100 }}
                style={styles.selectProductsInput}
                onChange={handleAddNewProduct}
                data={productsList}
                onFocus={() => {
                  getProducts()
                }}
              />
              <Pressable
                style={styles.clearProductsButton}
                onPress={() => {
                  setNewSale({
                    ...newSale,
                    products: [],
                  })
                }}
              >
                <FontAwesomeIcon color="white" icon={faXmark} />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.selectedProductsContainer}>
          {newSale?.products?.length > 0 && (
            <View style={styles.selectedProductsTitleContainer}>
              <Text style={styles.selectedProductsTitle}>Produtos</Text>
              <Text style={styles.selectedProductsTitle}>
                Total {formatting.formatarReal(totalValue || 0)}
              </Text>
            </View>
          )}
          <FlatList
            data={newSale?.products}
            style={{ width: '100%' }}
            ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
            keyExtractor={(product) => product._id}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.selectedProductCard}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: '500',
                      marginRight: 'auto',
                    }}
                  >
                    {item?.name}
                  </Text>
                  <TextInput
                    style={styles.productInput}
                    value={item.amount.toString()}
                    onChangeText={(text) => {
                      onChangeProductField({
                        text,
                        inputField: 'amount',
                        index,
                      })
                    }}
                    placeholder="Qtd."
                    keyboardType="number-pad"
                  />
                  <TextInput
                    style={styles.productInput}
                    onChangeText={(text) => {
                      onChangeProductField({
                        text,
                        inputField: 'value',
                        index,
                      })
                    }}
                    value={item.value.toString()}
                    placeholder="Valor"
                    keyboardType="numeric"
                  />
                </View>
              )
            }}
          />
        </View>

        <Pressable style={styles.newSaleButton} onPress={createNewSale}>
          <Text style={styles.textNewSaleButton}>Finalizar</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  )
}
