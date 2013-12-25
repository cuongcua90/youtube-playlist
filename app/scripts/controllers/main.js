'use strict';

angular.module('magicListenApp')
  .controller('MainCtrl', function ($scope, $log, ExternalMusicService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // $scope.resultYoutubes
    // $scope.videoRelated
    // $scope.trackLastFm

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
      
    $scope.searchLastFmTrackInfo = function(keyword){
      ExternalMusicService.track.search(keyword)
        .success(function(response){
          $scope.lastFmTracks = (response['results']['trackmatches']['track']);
        });
    }

    $scope.searchLastFmAlbumInfo = function(keyword){
      ExternalMusicService.album.search(keyword)
        .success(function(response){
          //$scope.lastFmAlbums = (response['results']['trackmatches']['track']);
        });
    }

    $scope.searchLastFmArtistInfo = function(keyword){
      ExternalMusicService.artist.search(keyword)
        .success(function(response){
          //$scope.lastFmArtists = (response['results']['trackmatches']['track']);
        });
    }

  });
