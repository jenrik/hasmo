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
			value: '@value',
			min: '@min',
			max: '@max'
		},
		controller: 'gaugeController'
	};
});

hasmo.controller('gaugeController', ['$scope', function($scope) {
	$scope.$watch('value', function() {
		console.log($scope.min, $scope.max);
		if ($scope.min === undefined) $scope.min = 0
		if ($scope.max === undefined) $scope.max = 100
		var val = Math.min(Math.max($scope.value-$scope.min, 0), $scope.max-$scope.min)*(270/($scope.max-$scope.min))-135
		$scope.deg = {
			transform: 'rotate(' + val + 'deg) translateY(15%)'
		}
	});
}]);
