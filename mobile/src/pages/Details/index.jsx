import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native'
import * as MailComposer from 'expo-mail-composer'


import styles from './styles'
import logoImg from '../../assets/logo.png'

export default function Details() {

	const navigator = useNavigation()
	function navigateBack() {
		navigator.goBack()
	}

	// useRoute é um hook utilizado para recuperar os dados da página atual,
	// enviados por parâmetro ao chamar o useNavigation de outra página
	const route = useRoute()
	const incident = route.params.incident

	

	const message =
		`Olá, ${incident.ong_nome}, estou entrado em contato pois gostaria de ajudar no caso ` +
		`"${incident.cso_titulo}" com o valor de ${
			Intl.NumberFormat('pt-BR', {
				style: 'currency',
				currency: 'BRL'
			}).format(incident.cso_valor)
		}`

	function sendMail() {
		MailComposer.composeAsync({
			subject: `Herói do caso: ${incident.cso_titulo}`,
			recipients: [incident.ong_email],
			body: message
		}).catch(error => console.log(error))
	}

	function sendWhatsapp() {
		// Linking é um objeto do React Native que permite usar o recurso
		// de Deep Link: uma forma de acessar aplicativos dentro do celular
		// através de rotas, assim como é feito na web
		Linking.openURL(`whatsapp://send?phone=+55${incident.ong_whatsapp}&text=${message}`)
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={logoImg} />
				<TouchableOpacity onPress={navigateBack}>
					<Feather name="arrow-left" size={28} color="#e02041" />
				</TouchableOpacity>
			</View>

			<View style={styles.incident}>
				<Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
				<Text style={styles.incidentValue}>
					{incident.ong_nome} de {incident.ong_cidade}/{incident.ong_uf}
				</Text>

				<Text style={styles.incidentProperty}>CASO:</Text>
				<Text style={styles.incidentValue}>{incident.cso_titulo}</Text>

				<Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
				<Text style={styles.incidentValue}>{incident.cso_descricao}</Text>

				<Text style={styles.incidentProperty}>VALOR:</Text>
				<Text style={styles.incidentValue}>{
					Intl.NumberFormat('pt-BR', {
						style: 'currency',
						currency: 'BRL'
					}).format(incident.cso_valor)
				}</Text>
			</View>

			<View style={styles.contatBox}>
				<Text style={styles.heroTitle}>Salve o dia!</Text>
				<Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

				<Text style={styles.heroDescription}>Entre em contato</Text>

				<View style={styles.actions}>
					<TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
						<Text style={styles.actionText}>WhatsApp</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.action} onPress={sendMail}>
						<Text style={styles.actionText}>Email</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View >
	)
}