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

    $scope.addVideoItem = function(item){
      $scope.playerControl.config.list.push(item);
      if (!player){
        player = new YT.Player('player', {
          height: '225',
          width: '400',
          videoId: $scope.playerControl.config.list[$scope.playerControl.config.index]['id'],
          playerVars: {
            controls: '0',
            color: 'red',
            showinfo: '0'
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
        $scope.playerControl.config.isValid = true;
      }
    }
    $scope.searchYoutube = function(keyword){
    	ExternalMusicService.searchYoutube(keyword)
    		.success(function(response){
          $scope.resultYoutubes = response['data'];
          //$scope.playerControl.config.list = response['data']['items'];
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
    $scope.searchYoutube('Thu Hien');

  });
