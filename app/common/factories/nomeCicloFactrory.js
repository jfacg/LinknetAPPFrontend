(function () {
  angular.module('linknetApp').factory('nomeCiclo', [nomeCiclo])

  function nomeCiclo(cicloPagamento) {
    function geradorNome() {

      const mes = cicloPagamento.mes
      const ano = cicloPagamento.ano

      switch (mes) {
        case mes == 1:
          return cilcoPagamento.nome = `Janeiro/${ano}`
          break
        case mes === 2:
          return cilcoPagamento.nome = `Fevereiro/${ano}`
          break
        case mes === 3:
          return cilcoPagamento.nome = `Março/${ano}`
          break
        case mes === 4:
          return cilcoPagamento.nome = `Abril/${ano}`
          break
        case mes === 5:
          return cilcoPagamento.nome = `Maio/${ano}`
          break
        case mes === 6:
          return cilcoPagamento.nome = `Junho/${ano}`
          break
        case mes === 7:
          return cilcoPagamento.nome = `Julho/${ano}`
          break
        case mes === 8:
          return cilcoPagamento.nome = `Agosto/${ano}`
          break
        case mes === 9:
          return cilcoPagamento.nome = `Setembro/${ano}`
          break
        case mes === 10:
          return cilcoPagamento.nome = `Outubro/${ano}`
          break
        case mes === 11:
          return cilcoPagamento.nome = `Novembro/${ano}`
          break
        case mes === 12:
          return cilcoPagamento.nome = `Dezembro/${ano}`
          break
        default:
          return cilcoPagamento
      }
    }
    return {geradorNome}
  }
})()
