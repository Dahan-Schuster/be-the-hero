import React                          from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Logon       from './pages/Logon'
import Register    from './pages/Register'
import Profile     from './pages/Profile'
import NewIncident from './pages/NewIncident'

/**
 * Este arquivo é responsável por capturar rotas acessadas pelo usuário
 * através do navegador e redirecioná-las para uma página específica.
 *
 * Cada página é um Componente React, em seu formato funcional (existem
 * classe componentes), que retorna JSX ─ html integrado a js renderizado
 * nativamente dentro de funções
 *
 * Em React, o front end também funciona a partir de acesso a rotas. É
 * ele o responsável por gerir as rotas que acessam html ─ diferentemente
 * de aplicações PHP, por exemplo, em que os controladores servem tanto como
 * API como gerenciador de páginas, com métodos 'salvarUsuario' e 'abrirTelaCadastro'
 * declarados juntos na mesma classe ( ¯\_(ツ)_/¯ )
 *
 * Dessa forma, o servidor de uma aplicação React só precisa se preocupar
 * em gerenciar rotas de manipulação de dados, enquanto o próprio React
 * lida com as rotas de acesso às páginas do sistema, o que o torna um bom
 * candidato a uma Api Restful, que escuta e responde os métodos HTTP
 * e realizam operações no banco de dados,
 *
 * @return {*}
 * @constructor
 */
export default function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/register" component={Register}/>
				<Route path="/profile" component={Profile}/>
				<Route path="/incidents/new" component={NewIncident}/>
				<Route path="/" component={Logon}/>
			</Switch>
		</BrowserRouter>
	)
}