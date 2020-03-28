import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * # Diferenças entre React e React Native
 *
 * ## Elementos
 * Em React podemos utilizar, ao lado dos componentes
 * React, elementos html para renderizar nossas páginas
 *
 * ### Tipos de elemento
 * Em React Native, estes elementos não estão disponíveis
 * Em vez disso, utilizamos alguns componentes padrões:
 * - View: como uma div, encapsula outros elementos
 * - Text: para qualquer tipo de texto (titulos, labels, parágrafos etc)
 *
 * ### Atributos
 * Atributos html/react como className, id etc não existem no React Native
 *
 * ## Estilos
 *
 * ### Stylesheets
 * Estilos css podem ser agregados utilizando o attr style, passando como
 * valor um objeto Js, geralmente criado utilizando a função create do
 * objeto StyleSheet
 *
 * ### Flex
 * No React Native, todos os elementos possuemhbbbdisplay: flex por padrão :)
 *
 * ### Nomeação
 * Os nomes das regras css no React Native não possuem hífen.
 * Regras como font-size, devem ser escritas com camelCase (fontSize)
 *
 * ### Herança de estilo e estilização própria
 * Por padrão, o css herda estilos de elementos pai para elementos
 * filhos. Assim, criar uma <div> com color: #fff irá fazer com que
 * todos os elementos dentro dela, como <p> e <span>, herdem isso
 * No React Native, isso simplesmente não existe
 * Cada elemento deve ter seu próprio estilo próprio
 *
 */

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello, Omnistack!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
