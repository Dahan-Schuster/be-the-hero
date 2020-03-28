import React, {useState, useEffect} from 'react'
import {Link, useHistory}           from "react-router-dom"
import {FiPower, FiTrash2}          from 'react-icons/fi'
import api                          from '../../services/api'

import './style.css'

import logoImg from '../../assets/img/logo.svg'

export default function Profile() {
	
	const history = useHistory(),
		[incidents, setIncidents] = useState([]),
		ongNome = localStorage.getItem('ong_nome'),
		ongId = localStorage.getItem('ong_id')
	
	
	if (ongId === null || ongNome === null) {
		history.push('/')
	}
	
	useEffect(() => {
		api.get('/perfil', {
			headers: {
				Authorization: ongId,
			},
		}).then(response => {
			setIncidents(response.data)
		}).catch(error => {
			console.log(error)
			alert('Não foi possível carregar sua lista de casos. Por favor, tente novamente.')
		})
	}, [ongId])
	
	const handleDeleteIncident = cso_id => {
		api.delete(`/casos/${cso_id}`, {
			headers: {
				Authorization: ongId,
			},
		}).then(response => {
			alert('Caso deletado com sucesso!')
			setIncidents(incidents.filter(incident => incident.cso_id !== cso_id))
		}).catch(error => {
			console.log(error)
			alert('Não foi possível deletar este caso. Por favor, tente novamente.')
		})
	}
	
	const handleLogout = () => {
		let reallyWants = window.confirm('Deseja realmente fazer logout?')
		if (reallyWants) {
			localStorage.clear()
			history.push('/')
		}
	}
	
	return (
		<div className="profile-container">
			<header>
				<img src={logoImg} alt="Be The Hero"/>
				<span>Bem Vinda, {ongNome}</span>
				
				<div className="buttons">
					<Link to="/incidents/new" className="button-default">Cadastrar novo caso</Link>
					<button onClick={() => handleLogout()}  type="button" className="logout">
						<FiPower size={18} color="#E02041"/>
					</button>
				</div>
			</header>
			
			<h1>Casos Cadastrados</h1>
			
			{incidents.length > 0
			 ? (<ul>{
					incidents.map(incident => (
						<li key={incident.cso_id}>
							<strong>CASO:</strong>
							<p>{incident.cso_titulo}</p>
							<strong>DESCRIÇÃO:</strong>
							<p>{incident.cso_descricao}</p>
							<strong>VALOR:</strong>
							<p>{`R$  ${parseFloat(incident.cso_valor).toFixed(2)}`}</p>
							<button onClick={() => handleDeleteIncident(incident.cso_id)} type="button">
								<FiTrash2 size={20} color="#A8A8B3"/>
							</button>
						</li>
					))
				}</ul>)
			 : <h2>Que ótimo! Você não possui nenhum caso cadastrado. Não é o máximo?</h2>
			}
		
		</div>
	)
}