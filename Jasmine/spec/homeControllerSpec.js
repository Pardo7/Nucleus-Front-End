describe('HomeController', function(){
	beforeEach(module('nucleusChat.controllers'));

	var $controller;

	beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
	}));

	describe('$scope.next', function(){
		it('directs users to the chat screen', function(){
			var $scope = {};
			var controller = $controller('HomeController', {$scope: $scope});
			$scope.next();
			expect($scope.next).toEqual('chat');
		});
	});
});