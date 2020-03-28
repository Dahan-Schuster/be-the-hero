import React, { useEffect, useState } from 'react'
import api from '../../services/api' // nosso objeto Axios
import { Feather } from '@expo/vector-icons' // pacote de ícones do react native
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'

import styles from './styles'
import logoImg from '../../assets/logo.png'

export default function Incidents() {

	const [incidents, setIncidents] = useState([])
	const [totalOfIncidents, setTotalOfIncidents] = useState(0)

	// para paginação
	const [page, setPage] = useState(1)
	const [isLoading, setIsLoading] = useState(false)

	// useNavigation é um hook utilizado para chamar uma página
	// da pilha de páginas definida no arquivo de rotas
	const navigator = useNavigation()
	function navigateToDetail(incident) {
		navigator.navigate('Details', {incident})
	}

	// useEffect é um hook utilizado para definir observers
	// que disparam funções sempre que o valor de uma variável muda
	// As variáveis observadas devem ser passadas em um array no 
	// segundo parâmetro. Por padrão, o useEffect dispara a função
	// ao inicar a página
	useEffect(() => {
		loadIncidents()
	}, [])

	async function loadIncidents() {

		// retorna se já estiver carregando ou se não houverem mais casos a carregar
		if (isLoading || (totalOfIncidents > 0 && incidents.length === totalOfIncidents)) return

		setIsLoading(true)

		// o Axios é baseado em promises
		api.get(`casos?page=${page}`)
			.then(response => {
				setIncidents([...incidents, ...response.data])
				setTotalOfIncidents(response.headers['x-total-count'])
				setPage(page + 1)
				setIsLoading(false)
			})
			.catch(error => console.log(error))
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={logoImg} />
				<Text style={styles.headerText}>
					Total de <Text style={styles.headerTextBold}>{totalOfIncidents} casos</Text>
				</Text>
			</View>

			<Text style={styles.title}>Bem vindo!</Text>
			<Text style={styles.description}>Escolha um dos casos abaixo e salve o dia!</Text>

			<FlatList
				data={incidents}
				style={styles.incidentList}
				keyExtractor={incident => String(incident.cso_id)}
				showsVerticalScrollIndicator={false}
				onEndReached={loadIncidents}
				onEndReachedThreshold={0.2}
				renderItem={({ item: incident }) => (
					<View style={styles.incident}>
						<Text style={styles.incidentProperty}>ONG:</Text>
						<Text style={styles.incidentValue}>{incident.ong_nome}</Text>

						<Text style={styles.incidentProperty}>CASO:</Text>
						<Text style={styles.incidentValue}>{incident.cso_titulo}</Text>

						<Text style={styles.incidentProperty}>VALOR:</Text>
						<Text style={styles.incidentValue}>{
							Intl.NumberFormat('pt-BR', {
								style: 'currency',
								currency: 'BRL'
							}).format(incident.cso_valor)
						}</Text>

						<TouchableOpacity
							style={styles.detailsButton}
							onPress={() => navigateToDetail(incident)}
						>

							<Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
							<Feather name="arrow-right" size={16} color="#E02041" />
						</TouchableOpacity>
					</View>
				)}
			/>
		</View>
	)
}