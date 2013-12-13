'use strict';

angular.module('magicListenApp')
  .controller('MainCtrl', function ($scope, $log, ExternalMusicService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $log.log('test log');
    $scope.test = 'beautiful';
    $scope.searchYoutube = function(keyword){
    	ExternalMusicService.searchYoutube(keyword)
    		.success(function(response){
    			$log.log('test log 2');
    		});
    }

  });
