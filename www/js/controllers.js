
var app = angular.module('myControllers', [])

.controller('HomeController',['$scope', 'USER', '$state', function($scope, USER, $state) {
    $scope.user = {};
    $scope.next = function(){
        USER.name = $scope.user.name;
        $state.go('chat');
    }
}]);