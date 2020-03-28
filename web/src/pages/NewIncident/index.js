import React, {useState}  from 'react'
import {Link, useHistory} from "react-router-dom"
import {FiArrowLeft}      from 'react-icons/fi'
import api                from '../../services/api'

import './style.css'

import logoImg from '../../assets/img/logo.svg'

export default function NewIncident() {
	
	const [cso_titulo, setTitulo] = useState('')
	const [cso_descricao, setDescricao] = useState('')
	const [cso_valor, setValor] = useState('')
	
	const ongId = localStorage.getItem('ong_id'), history = useHistory()
	if (ongId === null) {
		history.push('go')
	}
	
	function handleNewIncident(e) {
		e.preventDefault()
		
		const data = {cso_titulo, cso_descricao, cso_valor}
		api.post('/casos', data, {
			headers: {
				Authorization: ongId,
			},
		}).then(() => {
			let wantsToKeep = window.confirm('Caso cadastrado com sucesso! Deseja cadastrar outro?')
			if (!wantsToKeep) {
				history.push('/profile')
			}
		}).catch(error => {
			console.log(error)
			alert('Não foi possível cadastrar seu caso. Por favor, tente novamente')
		})
	}
	
	return (
		<div className="new-incident-container">
			<div className="content">
				<section>
					<img id="logo" src={logoImg} alt="Be The Hero"/>
					
					<h1>Cadastrar novo caso</h1>
					<p>Descreva o caso detalhadamente para encontrar um herói que resolva seu problema.</p>
					<Link to="/profile" className="link-default">
						<FiArrowLeft size={16} color="#E02041"/> Voltar para a listagem de casos
					</Link>
				</section>
				<form id="form" onSubmit={handleNewIncident}>
					<input value={cso_titulo} onChange={e => setTitulo(e.target.value)}
					       type="text" placeholder="Titulo do caso"/>
					<textarea value={cso_descricao} onChange={e => setDescricao(e.target.value)}
					          placeholder="Descrição"/>
					<input value={cso_valor} onChange={e => setValor(e.target.value)}
					       type="number" placeholder="Valor em reais"/>
					<button type="submit" className="button-default">Cadastrar</button>
				</form>
			</div>
		</div>
	)
	
}