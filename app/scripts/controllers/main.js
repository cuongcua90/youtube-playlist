'use strict';

angular.module('magicListenApp')
  .controller('MainCtrl', function ($scope, $log, $window, ExternalMusicService, PlayerService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.playerControl = PlayerService;
    
    //$scope.playerControl.config.volume = 30;

    $scope.stopVideo = function(){
      player.loadVideoById('HQ6TwrBHm3Q');
    }

    $scope.isPlayable = function(){
      return ($scope.playerControl.config.list.length > 0);
    }

    $scope.searchYoutube = function(keyword){
    	ExternalMusicService.searchYoutube(keyword)
    		.success(function(response){
          $scope.resultYoutubes = response['data'];
          $scope.playerControl.config.list = response['data']['items'];
          player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: $scope.playerControl.config.list[$scope.playerControl.config.index]['id'],
            playerVars: {
              controls: '0',
              color: 'red'
            },
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
          });   
          //$scope.playerControl.playVideo();
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
