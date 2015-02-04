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
