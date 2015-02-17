var hasmo = angular.module('hasmo', []);

hasmo.directive('bar', function() {
	return {
		restrict: 'E',
		templateUrl: 'templates/bar.tpl.html',
		scope: {
			value: '@value',
			min: '@min',
			max: '@max'
		},
		controller: 'hasmoLimitController'
	};
});

hasmo.controller('hasmoLimitController', ['$scope', function($scope) {
	if ($scope.min === undefined) $scope.min = 0
	if ($scope.max === undefined) $scope.max = 100
	$scope.$watch('min', function() {
		if ($scope.min === undefined) $scope.min = 0
	});
	$scope.$watch('max', function() {
		if ($scope.max === undefined) $scope.max = 100
	});
	$scope.$watch('value', function() {
		$scope.val = Math.min(Math.max($scope.value-$scope.min, 0), $scope.max-$scope.min)*(100/($scope.max-$scope.min));
	})
}]);

hasmo.directive('gauge', function() {
	return {
		restrict: 'E',
		templateUrl: 'templates/gauge.tpl.html',
		scope: {
			value: '@value',
			min: '@min',
			max: '@max'
		},
		controller: 'hasmoLimitController'
	};
});

hasmo.controller('hasmoGaugeController', ['$scope', function($scope) {
	$scope.$watch('value', function() {
		var val = $scope.val*(270/($scope.max-$scope.min))-135
		$scope.deg = {
			transform: 'rotate(' + val + 'deg) translateY(15%)'
		}
	});
}]);
