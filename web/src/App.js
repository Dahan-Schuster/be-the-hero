import React from 'react'
import './assets/css/global.css'
import Routes from './routes'

function App() {
	
	/**
	 * Elementos e variáveis React são imutáveis. Uma vez criados,
	 * você não pode alterar seus elementos filhos ou atributos.
	 *
	 * Então como eu altero valores de variáveis? Serão sempre constantes?
	 * Vou precisar ficar renderizando tudo denovo com valores diferentes?
	 * Éooqqqq??? Não!
	 *
	 * No React, variáveis e elementos (objetos JSX) são STATEFUL
	 * Isto significa que eles possuem ESTADO. O a variável em si
	 * não é alterada, mas sim seu estado atual.
	 *
	 * O método useState é utilizado para criar uma variável com um
	 * valor inicial e obter um método de atualização de seu estado
	 *
	 * Para componentes, é necessário criá-los a partir de classes
	 * (class Componente extends React.Component) e utilizar os objetos
	 * this.state e this.setState. O this.state deve ser inicializado
	 * no construtor com os 'atributos' do componente que estão passíveis
	 * de alteração (como a hora atual de um timer); o this.setState
	 * deve ser usado para alterar os valores definidos em this.state
	 * Ex.:
	 *      this.state = {timer: 0} (no construtor)
	 *      this.setState({ timer: new Date() }) (em outros métodos)
	 */
	
	return (<Routes/>)
}

export default App
