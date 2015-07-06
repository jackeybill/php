angular.module('myApp.controllers', [])
.controller('MyController', function($scope) {
  $scope.clock = {
    now: new Date()
  };
  var updateClock = function() {
    $scope.clock.now = new Date();
  };
  setInterval(function() {
    $scope.$apply(updateClock);
  }, 1000);
  updateClock();
});

angular.module('myApp.FirstController', [])
.controller('FirstController', ['$scope', function($scope) {
    $scope.counter = 0;
    $scope.add = function(amount) { $scope.counter += amount; };
    $scope.subtract = function(amount) { $scope.counter -= amount; };
}]);
