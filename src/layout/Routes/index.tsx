import { Dashboard } from '../../screens/Dashboard'
import { Relatorios } from '../../screens/Relatorios'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationMenu } from '../NavigationMenu'
import { Vendas } from '../../screens/Vendas'
import { View } from 'react-native'
import { NovaVenda } from '../../screens/NovaVenda'

const Tab = createBottomTabNavigator()

export function Routes() {
  return (
    <View style={{ width: '100%', flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'rgb(30,30,30)',
            height: 55,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 20,
          },
        }}
        tabBar={(props) => <NavigationMenu {...props} />}
      >
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: 'Dashboard',
          }}
        />
        <Tab.Screen
          name="Vendas"
          component={Vendas}
          options={{
            title: 'Vendas',
          }}
        />
        <Tab.Screen
          name="Relatorios"
          component={Relatorios}
          options={{
            title: 'Relatórios',
          }}
        />
        <Tab.Screen
          name="NovaVenda"
          component={NovaVenda}
          options={{
            title: 'Nova venda',
          }}
        />
      </Tab.Navigator>
    </View>
  )
}
