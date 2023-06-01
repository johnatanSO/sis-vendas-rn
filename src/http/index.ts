import axios from 'axios'
const BASE_URL = 'http://192.168.15.104:3333/'
/* Passando o URL hardcode mesmo pois é apenas um trabalho,
  caso fosse um projeto real, deveriam ser criadas variáveis de 
  ambiente. 
*/

/* Para iniciar web service (API), abra o terminal na pasta 'server' e 
  execute o comando 'npm install' para instalar as dependências e depois 
  'npm start' para iniciar o servidor local.
*/
export default axios.create({
  baseURL: BASE_URL,
})
