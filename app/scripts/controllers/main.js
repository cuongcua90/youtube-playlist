'use strict';

angular.module('magicListenApp')
  .controller('MainCtrl', function ($scope, $log, $window, $http, ExternalMusicService, PlayerService) {

    $scope.searchAll = function(keyword){
      $scope.searchYoutube(keyword);
      $scope.searchLastFmTrackInfo(keyword);
      $scope.searchLastFmAlbumInfo(keyword); 
      $scope.searchLastFmArtistInfo(keyword);    
    }
    $scope.addVideoItem = function(item){
      if ($scope.playerControl.supports_html5_storage()) $log.log('great');
      $scope.playerControl.addVideoItem(item);
      if (!player){
        player = new YT.Player('player', {
          height: '270',
          width: '480',
          videoId: $scope.playerControl.config.list[$scope.playerControl.config.index]['id'],
          playerVars: {
            controls: '1',
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
    $scope.removeVideoByIndex = function(index){
      $scope.playerControl.config.list.splice(index,1);
      if ($scope.playerControl.config.index === index){
        if (index === $scope.playerControl.config.list.length){
          $scope.playerControl.config.index--;
        }
        $scope.playerControl.config.loadVideoByIndex();
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

    $scope.suggestQueries = function(keyword){
      var url = "http://suggestqueries.google.com/complete/search";
      var params = {
        //hl: "vn",
        ds: "yt",
        client: "youtube",
        hjson: "t",
        q: keyword,
        callback:"JSON_CALLBACK",
      }
      return $http.jsonp(url, {
        params: params
      }).then(function(response){
        $log.log(response.data[1]);
        var queries = [];
        angular.forEach(response.data[1], function(item){
          queries.push(item[0]);
        });
        $log.log(queries);
        return queries;

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
    /*Initial value search*/

    var randomKeywords = ['Thu Hien','Thu Hien', 'Anh tho', 'Ngoc tan', 'Dau phai boi mua thu', 'Shakira', 'Che Linh', 'Enya'];
    var ranNum = Math.floor((Math.random()*randomKeywords.length));
    $scope.searchKeyword = randomKeywords[ranNum];
    $scope.searchYoutube($scope.searchKeyword);
    $scope.playerControl = PlayerService;


  });
