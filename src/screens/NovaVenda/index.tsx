import { View, Pressable, Text, TextInput, FlatList } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'
import { styles } from './NovaVendaStyles'
import HeaderNewSale from '../../layout/HeaderNewSale'
import http from '../../http'
import { Product } from '../Relatorios/ProductsList'
import { formasDePagamento, formatting } from '../../utils/formatting'
import { salesService } from '../../services/salesService.service'

const CustomPickerItem = (props:any) => (
  <Picker.Item {...props} />
)

interface SaleProduct extends Product {
  amount: number
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
  const [productsList, setProductsList] = useState<SaleProduct[]>([])

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
        console.log('VENDA CRIADA COM SUCESSO!')
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
        setProductsList(res.data.items)
      })
      .catch((err) => {
        console.log('[ERRO]: ', err)
      })
  }

  const totalValue = newSale?.products?.reduce((acc, prod) => acc += prod.value, 0)

  return (
    <View style={styles.container}>
      <HeaderNewSale navigation={navigation} />

      <View style={styles.fields}>
        <TextInput
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

        <Picker
          style={styles.input}
          onValueChange={(formaDePagamento: string) => {
            if (formaDePagamento) {
              setNewSale({
                ...newSale,
                paymentType: formaDePagamento,
              })
            }
          }}
        >
          <CustomPickerItem label="Selecione uma forma de pagamento" value={null} />
          {formasDePagamento?.map((formaDePagamento) => {
            return (
              <CustomPickerItem
                key={formaDePagamento.value}
                label={formaDePagamento?.text}
                value={formaDePagamento?.value}
              />
            )
          })}
        </Picker>

        <View style={styles.selectProductContainer}>
          <Text style={styles.labelSelectProduct}>Selecione um produto</Text>
          <Picker
            selectedValue={undefined}
            style={styles.input}
            onFocus={() => {
              getProducts()
            }}
            onValueChange={(index: any) => {
              if (index) {
                const newProduct = { ...productsList[index], amount: 1 }
                setNewSale({
                  ...newSale,
                  products: [...newSale.products, newProduct],
                })
              }
            }}
          >
            {' '}
            <CustomPickerItem label="Selecione um produto" value={null} />
            {productsList?.map((product, index) => {
              return <CustomPickerItem key={product?._id} label={product?.name} value={index} />
            })}
          </Picker>
        </View>
      </View>

      <View style={styles.selectedProductsContainer}>
        {newSale?.products?.length > 0 && (
          <Text style={styles.selectedProductsTitle}>
            Produtos selecionados
          </Text>
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
                    item.amount = Number(text)
                  }}
                  placeholder="Qtd."
                  inputMode="numeric"
                  keyboardType="number-pad"
                />
                <TextInput
                  style={styles.productInput}
                  onChangeText={(text) => {
                    item.value = Number(text)
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

      <View style={styles.totalValueSaleCard}> 
        <Text style={styles.textNewSaleButton}>Valor total</Text>
        <Text style={styles.textNewSaleButton}>{formatting.formatarReal(totalValue || 0)}</Text>
      </View>

      <Pressable style={styles.newSaleButton} onPress={createNewSale}>
        <Text style={styles.textNewSaleButton}>Finalizar</Text>
      </Pressable>
    </View>
  )
}
