import { Dashboard } from '../../pages/Dashboard'
import { Relatorios } from '../../pages/Relatorios'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationMenu } from '../NavigationMenu'
import { Vendas } from '../../pages/Vendas'

const Tab = createBottomTabNavigator()

export function Routes() {
  return (
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
    </Tab.Navigator>
  )
}
