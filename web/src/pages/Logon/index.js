import React, {useState} from 'react'
import {Link, useHistory}           from 'react-router-dom'
import {FiLogIn}        from 'react-icons/fi'
import api              from '../../services/api'

import './style.css'

import heroesImg from '../../assets/img/heroes.png'
import logoImg   from '../../assets/img/logo.svg'

export default function Logon() {
	
	const [ong_id, setOngId] = useState(''),
		history = useHistory()
	
	const handleLogin = e => {
		e.preventDefault()
		
		api.post('/sessao', {ong_id})
		   .then(response => {
			   localStorage.setItem('ong_id', ong_id)
			   localStorage.setItem('ong_nome', response.data.ong_nome)
			   history.push('/profile')
		   })
		   .catch(error => {
			   console.log(error)
			   alert('ID incorreto. Por favor, tente novamente.')
		   })
	}
	
	return (
		<div className="logon-container">
			<section className="form">
				<img id="logo" src={logoImg} alt="Be The Hero"/>
				
				<form onSubmit={handleLogin}>
					<h1>Faça seu logon</h1>
					
					<input value={ong_id}
					       onChange={e => setOngId(e.target.value)}
					       type="text" placeholder="Sua ID"/>
					<button className="button-default" type="submit">Entrar</button>
					
					<Link className="link-default" to="/register">
						<FiLogIn size={16} color="#E02041"/> Não tenho cadastro
					</Link>
				</form>
			</section>
			<img id="heroes" src={heroesImg} alt="Heroes"/>
		</div>
	)
	
}