import axios from 'axios'

export default axios.create({
    // http://{ip_do_servidor}:{porta}
    // 192.168.0.11 é o IP do localhost meu computador
    // Acessar localhost no celular não aponta para o meu computador,
    // e sim para o localhost do celular
    // Por isso é necessário usar o IP do da máquina
    // 3333 é a porta na qual o servidor node está rodando 
    baseURL: 'http://192.168.0.11:3333' 
})