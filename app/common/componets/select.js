(function () {
  angular.module('linknetApp').component('newselect', {
    bindings:{
      grid: '@',
      label: '@',
      model: '=',
      value: '@',
      readonly: '<',
    },
    controlller: [
      'gridSystem',
      function (gridSystem) {
        this.$onInit = () => this.gridClasses = gridSystem.toCssClasses(this.grid)
      }
    ],
    template: `
    <div class="form-group {{$ctrl.gridClasses}}" >
        <label>{{$ctrl.label}}</label>
        <select class="form-control select-lista" ng-model="$ctrl.model">
          <option value="$ctrl.value"></option>
        </select>
    </div>
    `
  })
})()
