var hasmo = angular.module('hasmo', []);

hasmo.directive('bar', function() {
	return {
		restrict: 'E',
		templateUrl: 'templates/bar.tpl.html',
		scope: {
			value: '@value'
		}
	};
});

hasmo.directive('gauge', function() {
	return {
		restrict: 'E',
		templateUrl: 'templates/gauge.tpl.html',
		scope: {
			value: '@value'
		},
		controller: 'gaugeController'
	};
});

hasmo.controller('gaugeController', ['$scope', function($scope) {
	$scope.$watch('value', function() {
		$scope.deg = {
			transform: 'rotate(' + ($scope.value*2.7-135) + 'deg) translateY(15%)'
		}
	});
}]);
