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
          $scope.resultYoutubes = response['data'];
    		});
    }
    $scope.getRelatedYoutubeVideo = function(videoId){
      ExternalMusicService.getRelatedYoutubeVideo(videoId)
        .success(function(response){
          $scope.videoRelateds = response['data'];
        });
    }

  });
