# ZUP POIs - Teste
API para cadastro de pontos de interesse, além de buscas de todos os pontos e por proximidade.

## Instalação

Clone o repositório
``
git clone https://github.com/thiagoaag/poi-zup-Kpotz.git
``

Navegue até o diretório raiz e execute o seguinte comando:
``
npm install
``

## Inicialização

Dentro do repositório raiz execute:
``
npm start
``

## Serviços


| Método  | URL                  | Parâmetros                                  | Descrição                                                                            |
|---------|----------------------|---------------------------------------------|--------------------------------------------------------------------------------------|
| POST    | /zupois/add          |*JSON*:<br/>{<br/>&nbsp;&nbsp;"name": "Nome do POI",<br/>&nbsp;&nbsp;"coordinates": [0, 180]<br/>} | Cadastra um novo ponto de interesse.                                        |
| GET     | /zupois/find         |                                                 | Busca todos os pontos de interesse.                                                |        
| POST    | /zupois/find         |*JSON*:<br/>{<br/>&nbsp;&nbsp;"x": [0 a 180],<br/>&nbsp;&nbsp;"y": [0 a 180],<br/>&nbsp;&nbsp;"max_distance": [número inteiro]<br/>}| Busca todos os pontos de interesse próximos ao parâmetros específicos.                           |

## Testes

Para executar os testes automatizados:
``
npm test
``
