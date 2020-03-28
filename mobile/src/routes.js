import React  from 'react'

// Biblioteca que disponibiliza uma série de navegações
// para o app, como Navigation Drawers, Tabs e Stacks
import {NavigationContainer}  from '@react-navigation/native'

// Stack Navigator: Navegação baseada em pilhas de páginas.
// Neste tipo de navegação, não há nenhum container que guarde
// as rotas entre as páginas (como um navigation drawer, por ex.)
// Aqui cada página é aberta a partir de um botão em outra página
// Ex.: página A contém um link para a página B, que contém dois
// botões, um que leva à página C e outro que volta para a página A
// E assim por diante...
import {createStackNavigator} from '@react-navigation/stack'

import Incidents from './pages/Incidents'
import Details from './pages/Details'

const AppStack = createStackNavigator()

export default function Router() {
	return (
		// Container de navegação, onde todas as rotas devem estar
		// É semelhante ao BrowserRouter do React
		<NavigationContainer>
			{/* Nosso objeto navigator baseado em pilhas */}
			<AppStack.Navigator screenOptions={{headerShown: false}}>
				{/* Cada AppStack.Screen representa uma página do app */}
				<AppStack.Screen name="Incidents" component={Incidents} />
				{/* O attr component recebe um React Native Component */}
				<AppStack.Screen name="Details" component={Details} />
			</AppStack.Navigator>
		</NavigationContainer>
	)
}