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

angular.module('myApp', ['emailParser'])
    .controller('MyController',
    ['$scope', 'EmailParser',
        function($scope, EmailParser) {
            // Set up a watch
            $scope.$watch('emailBody', function(body) {
                if (body) {
                    $scope.previewText =
                        EmailParser.parse(body, {
                            to: $scope.to
                        });
                }
            });
        }]);

angular.module('emailParser', [])
    .config(['$interpolateProvider',
        function($interpolateProvider) {
            $interpolateProvider.startSymbol('__');
            $interpolateProvider.endSymbol('__');
        }])
    .factory('EmailParser', ['$interpolate',
        function($interpolate) {
            // a service to handle parsing
            return {
                parse: function(text, context) {
                    var template = $interpolate(text);
                    return template(context);
                }
            };
        }]);

angular.module('myApp', ['myApp.filters']);

angular.module('myApp.filters', [])
    .filter('capitalize', function() {
        return function(input) {
            // input will be the string we pass in
            if (input) {
                return input[0].toUpperCase() + input.slice(1);
            }
        }
    })
    .filter('blankIfNegative', function() {
        return function(input) {
            if (input <= 0) return ' ';
            else return input;
        }
    });

angular.module('myApp', [])
    .directive('myDirective', function() {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                myUrl: '=someAttr',
                myLinkText: '@'
            },
            template: '\
          <div>\
            <label>My Url Field:</label>\
            <input type="text" ng-model="myUrl" />\
            <a href="{{myUrl}}">{{myLinkText}}</a>\
          </div>\
        '
        }
    })

angular.module('myApp', [])
    .controller('ParentController', function($scope) {
        $scope.name = "Erik";
    })
    .controller('EriksController', function($scope) {
        $scope.heyThere = "Ari";
        console.log("Instantiated");
    })
    .controller("ChildController", function($scope) {
        console.log("inside childController");
        // $scope.
    })
    .directive('someHello', function() {
        console.log("Loading someController");
        return { controller: function($scope) {
            console.log("Loading someHello directive's Controller");
        } }
    })
    .directive('anotherHello', function() {
        console.log("Loading anotherHello");
        return { controller: function($scope) {
            console.log("Loading anotherHello directive's Controller");
        } }
    })
    .directive('myDirective', function() {
        return {
            restrict: 'A',
            replace: true,
            require: ['^someHello', 'anotherHello'],
            scope: {
                myUrl: '@someAttr',
                myLinkText: '=',
                someController: '=someHello'
            },
            template: '<div><a href="{{myUrl}}">{{myLinkText}}</a> {{someController}}</div>',
            link: function(scope, iElement, iAttr, ngModelController) {
                // ngModelController.myUrl = "hey from link function";
                console.log(scope.someController,
                    iAttr.someController,
                    ngModelController,
                    ngModelController[0] === iElement.inheritedData().$someHelloController,
                    iElement.inheritedData());
            }
        };
    });
