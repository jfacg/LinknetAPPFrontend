(function () {
  angular.module('linknetApp').factory('msgs', [
    'toastr',
    MsgsFactory
  ])

  function MsgsFactory(toastr) {
    function addMsgs(msgs, titulo, metodo) {
      if (msgs instanceof Array) {
        msgs.forEach(msg => toastr[metodo](msg, titulo))
      } else {
        toastr[metodo](msgs, titulo)
      }
    }

    function addSucesso(msgs) {
      addMsgs(msgs, 'Sucesso', 'success')
    }

    function addErro(msgs) {
      addMsgs(msgs, 'Erro', 'error')
    }

    return {addSucesso, addErro}
  }


})()
