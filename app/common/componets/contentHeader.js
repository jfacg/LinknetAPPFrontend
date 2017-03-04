angular.module('linknetApp').component('contentHeader',{
  bindings: {
    titulo: "@",
    subtitulo: "@",
  },
  template: `
  <section class="content-header">
    <h1>{{$ctrl.titulo}} <small><em>{{$ctrl.subtitulo}}</em></small></h1>
  </section>
  `
})
