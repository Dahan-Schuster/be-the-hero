import React, {useState}  from 'react'
import {Link, useHistory} from "react-router-dom"
import {FiArrowLeft}      from 'react-icons/fi'
import api                from '../../services/api'

import './style.css'
import logoImg            from '../../assets/img/logo.svg'


export default function Register() {
	
	const [ong_nome, setOngNome] = useState(''),
		[ong_email, setOngEmail] = useState(''),
		[ong_whatsapp, setOngWhatsapp] = useState(''),
		[ong_cidade, setOngCidade] = useState(''),
		[ong_uf, setOngUf] = useState(''),
		history = useHistory()
	
	
	const handleRegister = e => {
		e.preventDefault()
		
		const data = {ong_nome, ong_email, ong_whatsapp, ong_cidade, ong_uf}
		
		api.post('ongs', data)
		   .then(response => {
			   alert(`Seu ID de acesso: ${response.data.ong_id}`)
			   history.push('/')
		   })
		   .catch(error => {
			   console.log(error)
			   alert('Não foi possível realizar o cadastro. Por favor, tente novamente.')
		   })
	}
	
	return (
		<div className="register-container">
			<div className="content">
				<section>
					<img id="logo" src={logoImg} alt="Be The Hero"/>
					
					<h1>Cadastro</h1>
					<p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
					<Link to="/" className="link-default">
						<FiArrowLeft size={16} color="#E02041"/> Voltar para o login
					</Link>
				</section>
				<form onSubmit={handleRegister}>
					<input value={ong_nome}
					       onChange={e => setOngNome(e.target.value)}
					       type="text" placeholder="Nome da ONG"/>
					<input value={ong_email}
					       onChange={e => setOngEmail(e.target.value)}
					       type="email" placeholder="E-mail"/>
					<input value={ong_whatsapp}
					       onChange={e => setOngWhatsapp(e.target.value)}
					       type="text" placeholder="WhatsApp"/>
					<div className="cidade-estado">
						<input value={ong_cidade}
						       onChange={e => setOngCidade(e.target.value)}
						       type="text" placeholder="Cidade"/>
						<input value={ong_uf}
						       onChange={e => setOngUf(e.target.value)}
						       type="text" placeholder="UF" style={{width: 80}}/>
					</div>
					<button type="submit" className="button-default">Cadastrar</button>
				</form>
			</div>
		</div>
	)
	
}