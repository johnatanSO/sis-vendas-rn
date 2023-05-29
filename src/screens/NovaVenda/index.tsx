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
import { useState, useEffect } from 'react'
import { styles } from './NovaVendaStyles'
import HeaderNewSale from '../../layout/HeaderNewSale'
import http from '../../http'
import { Product } from '../Relatorios/ProductsList'
import { formasDePagamento, formatting } from '../../utils/formatting'
import { salesService } from '../../services/salesService.service'
import { Dropdown } from 'react-native-element-dropdown'
import theme from '../../../styles/theme'

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
  totalValue: number
}

export function NovaVenda({ navigation }: NovaVendaProps) {
  const defaultValuesNewSale = {
    client: '',
    paymentType: '',
    products: [],
    totalValue: 0,
  }
  const [newSale, setNewSale] = useState<NewSale>(defaultValuesNewSale)
  const [productsList, setProductsList] = useState<ListItem[]>([])

  function createNewSale() {
    if (!newSale.paymentType) {
      console.log('Forma de pagamento não informada [front check]')
      return
    }
    if (newSale.products.length === 0) {
      console.log('Nenhum produto selecionado [front check]')
      return
    }

    salesService
      .create(newSale)
      .then(() => {
        Alert.alert('Venda criada com sucesso!')
        setNewSale(defaultValuesNewSale)
        navigation.navigate('Vendas')
      })
      .catch((err) => {
        console.log('[ERROR]: ', err.response.data.message)
      })
  }

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
    const sale: any = { ...newSale }
    sale.products[index][inputField] = text

    setNewSale(sale)
  }

  function handleAddNewProduct({ value }: ListItem) {
    value.amount = 1

    setNewSale({
      ...newSale,
      products: [...newSale.products, value],
    })
  }

  useEffect(() => {
    setNewSale({
      ...newSale,
      totalValue: newSale?.products?.reduce(
        (acc, prod) => (acc += prod.value),
        0,
      ),
    })
  }, [newSale.products])

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
            style={styles.selectInput}
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
              style={styles.selectInput}
              onChange={handleAddNewProduct}
              data={productsList}
              onFocus={() => {
                getProducts()
              }}
            />
          </View>
        </View>

        <View style={styles.selectedProductsContainer}>
          {newSale?.products?.length > 0 && (
            <View style={styles.selectedProductsTitleContainer}>
              <Text style={styles.selectedProductsTitle}>Produtos</Text>
              <Text style={styles.selectedProductsTitle}>
                Total {formatting.formatarReal(newSale.totalValue || 0)}
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
                    inputMode="numeric"
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
                    inputMode="numeric"
                    keyboardType="number-pad"
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
