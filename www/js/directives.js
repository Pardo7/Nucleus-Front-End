angular.module('nucleusChat.directives',[])
.directive('browseFile', ['$rootScope','USER', function($rootScope, USER){
    return {
        scope:{

        },
        replace: true,
        restrict: 'AE',
        link: function(scope, elem, attrs){
            // Once The user clicks the browse button it will allow them to select an image -
            // Or take a picture
            scope.browseFile = function(){
                document.getElementById('browseBtn').click();
            };

            angular.element(document.getElementById('browseBtn')).on('change', function(e){

               var file = e.target.files[0];

               angular.element(document.getElementById('browseBtn')).val('');

               var fileReader = new FileReader();

                // The selected image is than broadcast
               fileReader.onload = function(event){
                   $rootScope.$broadcast('event:file:selected', {image:event.target.result,sender:USER.name});
               };

               fileReader.readAsDataURL(file);
            });

        },
        templateUrl: 'views/browse-file.html'
    };
}])
.directive('chatList', ['$rootScope','SOCKET_URL', function($rootScope, SOCKET_URL){
    return{
        replace: true,
        restrict: 'AE',
        scope: {

        },
        link: function(scope, elem, attrs){

            var socket = io(SOCKET_URL);

            scope.messages = [];

            // Broadcasting an event that the file has been selected

            $rootScope.$on('event:file:selected', function(event, data){

                socket.emit('event:new:image',data);

                scope.$apply(function(){
                    scope.messages.unshift(data);
                });

            });

            // client will receive the event:incoming:image. directive listens to the event and
            // will update the view so that other users can see what is being shared

            socket.on('event:incoming:image', function(data){

                scope.$apply(function(){
                    scope.messages.unshift(data);
                });

            });

        },
        templateUrl:'views/chat-list.html'
    };
}])
.directive('userChat', ['$rootScope', function($rootScope) {
    return {
        replace: true,
        restrict: 'AE',
        scope: {},
        controller: 'UserChatController',
        templateUrl: "views/user-chat.html"
    };
}]);
