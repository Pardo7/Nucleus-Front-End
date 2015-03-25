
angular.module('nucleusChat.controllers',[])

.controller('HomeController',['$scope','USER','$state', function($scope, USER, $state){
    $scope.user = {};
    $scope.next = function(){
        USER.name = $scope.user.name;
        $state.go('chat');
    };
}])
.controller('ChatController',['$scope','$rootScope', function($scope, $rootScope){

    $rootScope.$on('event:file:selected', function(event, data){
        //console.log(data.image)
    });
}])
.controller('UserChatController', ["$scope", "chatMessages", function($scope, chatMessages ) {
    //Set messages to chatMessages factory which returns the firebase data
    $scope.messages = chatMessages;

    //Initialize message object
    $scope.message = {};

    //Add message to the firebase data
    $scope.addMessage = function(message) {
        $scope.messages.$add({content: message});
        //we reset the text input field to an empty string`
        $scope.message.theMessage = "";
    };
}])
.factory("chatMessages", ['$firebase', "$rootScope", function($firebase, $rootScope){
    // create a reference to the Firebase where we will store our data
    var ref = new Firebase("https://popping-torch-1667.firebaseio.com/");

    // this uses AngularFire to create the synchronized array
    return $firebase(ref.limitToLast(10)).$asArray();
}])
.controller('WelcomeController',['$scope', '$state', function($scope, $state){
    $scope.nextTwo = function(){
        $state.go('home');
    };
}]);