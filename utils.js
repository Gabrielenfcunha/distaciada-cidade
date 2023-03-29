
/**
 * Pega o indice da cidade pela lista.
 * 
 * @param {String} cityName Nome da cidade
 * @returns Numero com o indice de onde a cidade está na lista
 */
function getIndexForCity (cityName) {
  return cities.indexOf(cityName)
};





/**
 * pegar distacia da cidade
 * 
 * @param {string} cityFrom Cidade onde a rota começa
 * @param {string} cityTo Cidade de destino
 * @returns 
 */
function getDistanceBetween(cityFrom, cityTo) {
  return objCities[cityFrom][getIndexForCity(cityTo)];
};





/**
 * Calcula a distancia entre as duas cidades e devolve o custo
 * daquele trecho.
 * 
 * @param {string} cityFrom Cidade onde a rota começa
 * @param {string} cityTo Cidade de destino
 * @param {number} pricePerKm Custo por quilometro rodado
 * @returns Numero com o custo para a distancia
 */
function getCostForDistance (cityFrom, cityTo, pricePerKm) {
  const distance = getDistanceBetween(cityFrom, cityTo);
  return pricePerKm * distance;};






/**
 * mostra as lista da cidade da procura
 * 
 * @param {string} cityName nome da cidade
 * @returns as distancias das cidade
 */
function getDistancesPerCity (cityName) {
  const cityIndex = cities.indexOf(cityName);
  return objCities[cityName];
};




/**
 * 
 * @param {string} currentCity cidade atual 
 * @param {string} cityTo cidade seu destino
 * @param {string} porte tamanho do caminhao
 * @param {Array} listItems Lista com o nome de todos os itens
 * @returns nome da cidades caminhao distancia, total da km 
 */
function getRouteInfo (currentCity, cityTo, porte, listItems) {
  listItems = Array.isArray(listItems) ? listItems : [listItems];
  const kmPrice = truck[porte];
  const distance = getDistanceBetween(currentCity, cityTo);
  const totalCost = getCostForDistance(currentCity, cityTo, kmPrice);
  let pesoTotal = 0;
  let quantidadeTotal = 0;
  listItems.forEach(item => {
    pesoTotal += calcularPesodaUnid(item);
    quantidadeTotal += getunide(item);
  });
  return {
    from: currentCity,
    to: cityTo,
    porte,
    kmPrice,
    totalCost,
    distance,
    nomeIten: listItems,
    pesoTotal,
    unidades: quantidadeTotal,
    // pesoUnidades
  };
};





/**
 * mostra a mensagem  e com tratamento de erro
 * 
 * @param {*} currentCity cidade tual
 * @param {*} cityTo cidade do seu destino 
 * @param {*} porte tamanho caminhão
 */
function routeOuput (currentCity, cityTo, porte) {
  try {
    const info = getRouteInfo(currentCity, cityTo, porte);

    // tratar diferente o que fazer com a informação
    const stringMessage = `de ${info.from} para ${info.to} utilizando um caminhão de porte ${info.porte},
     com custo de R$${info.kmPrice} por km, dando um custo total de R$${info.totalCost},
      com a distancia total de ${info.distance}`;
  
      console.log(stringMessage);
      document.querySelector('#message').innerHTML = stringMessage;
      alert(stringMessage); 
  } catch (error) {
    const mengerrorCidades = `não encontrado essa cidade no banco de dados`;
    console.log(mengerrorCidades);
    document.querySelector('#message').innerHTML = mengerrorCidades;
    alert(mengerrorCidades);
    
  }
};










/* itens */

/**
 * inserir produto e pesoIten quantidade
 * 
 * @param {string} nomeIten 
 * @param {number} pesoIten peso do 
 * @param {number} unid 
 * @returns 
 */
function inserir(nomeIten,pesoIten,unid) {
  listaProdutos.push({nomeIten,pesoIten,unid})
  return listaProdutos;
};







/**
 * percorrer a lista e pega o peso do iten atraves do nome do iten
 * 
 * @param {string} nomeIten nome no iten
 * @returns o peso do iten
 */
function getpeso(nomeIten){
  return listaProdutos.find(item => item.nomeIten === nomeIten).pesoIten;
};






/**
 * percorrer a lista e pega o nome do iten atraves do nome do iten
 * 
 * @param {string} itemName nome no iten
 * @returns o nome do iten
 */
function getItemByName (itemName) {
  return listaProdutos.find(item => item.nomeIten === itemName) || null;
}





/**
 *  percorrer a lista e pega o unidade do iten atraves do nome do iten
 * 
 * @param {string} nomeIten nome no iten
 * @returns a unidade do iten
 */
function getunide(nomeIten){
  return listaProdutos.find(unidI => unidI.nomeIten === nomeIten).unid;
};




/**
 * calcula o peso do iten e da unidade
 * 
 * @param {*} nomeIten nome do iten
 * @returns o peso total do itens
 */
function calcularPesodaUnid(nomeIten) {
  const calcuPEso = getpeso(nomeIten);
  const calcuUnid=  getunide(nomeIten);
  return calcuPEso * calcuUnid;
  
};


/**
 * 
 * @param {string} nomeIten nome do iten
 */
function getfind(nomeIten,nomeIten){
  const found = listaProdutos.find((iten) => {
      if(iten.nomeIten == nomeIten ){
        return true;
      }
      return false;
  });
  console.log(`${found.nomeIten} ${found.pesoIten} ${found.unid}
`)
};


function getfor(nomeIten){
  listaProdutos.forEach((iten) => {
      console.log(`nome do Iten`,iten.nomeIten + ' ' +`peso do Iten` , iten.pesoIten + ' ' +`unidade do Iten` , iten.unid);
  })
};




/**
 * 
 * @param {string} currentCity cidade atual
 * @param {string} cityTo cidade destinada
 * @param {string} porte caminhao
 * @param {string} nomeIten itens
 */
function total(currentCity, cityTo,porte,nomeIten) {
  try {
    debugger;
    const infocity = getRouteInfo(currentCity, cityTo, porte, nomeIten);
    const mensagemCadast = `
     de  ${infocity.from} para ${infocity.to} a
     distância a ser percorrida é de ${infocity.distance} km, para transporte dos produtos ${infocity.nomeIten} 
     peso ${infocity.pesoTotal}, unidade ${infocity.unidades}, peso total ${infocity.pesoUnidades} ,  será
     necessário utilizar 2 caminhões de porte  ${infocity.porte} e um de porte MÉDIO, de
     forma a resultar no menor custo de transporte por km rodado. O valor total do
     transporte dos itens é R$ ${infocity.kmPrice}, sendo R$ ${infocity.totalCost} é o custo unitário médio.
     `;
    console.log(mensagemCadast);
    document.querySelector('#message').innerHTML = mensagemCadast;
    alert(mensagemCadast);
  } catch (error) {
    const mengerrortotal = `não encontrado no banco de dados`;
    console.log(mengerrortotal);
    document.querySelector('#message').innerHTML = mengerrortotal;
    alert(mengerrortotal);
  }
};


