'use strict';

var apiExternalMusic = function($http) {
    var youtubeApiUrl = "http://gdata.youtube.com/feeds/api/videos?q=";
    var lastFmUrl = "http://ws.audioscrobbler.com/2.0/";
    var lastFmApiKey = "eb1b9816c22aa3985aa863c03cc738cb";

    var call = function(method, params, keyword){
      var url = lastFmUrl + "?method="+method;  

    }

    var musicService = {};

  	musicService.searchYoutube = function(keyword){
  		var url = youtubeApiUrl+ encodeURIComponent(keyword); 
  		var params = {
            format: 5,
            'max-results': 12,
            v: 2,
            alt: 'jsonc',
        };
        return $http.get(url, {
            params: params
        });
  	}	

    musicService.getRelatedYoutubeVideo = function(videoId){
      var url = "http://gdata.youtube.com/feeds/api/videos/"+videoId+"/related";
      var params = {
        v: 2,
        alt: 'jsonc'
      }
      return $http.get(url, {
          params: params
      });
    }

    var call = function(method, keyword, params){
      
      params.format = 'json';
      params.api_key = lastFmApiKey;
      params.method = method;

      var url = lastFmUrl + "?";
      return $http.get(url, {
        params: params
      });
    }

    musicService.track = {
      search:function(keyword){
        var params = {
          track: keyword,
          limit: 30
        }
        return call('track.search', keyword, params);
      }
    }

    musicService.album = {
      search:function(keyword){
        var params = {
          album: keyword,
          limit: 3
        }
        return call('album.search', keyword, params);
      }  
    }

    musicService.artist = {
      search:function(keyword){
        var params = {
          artist: keyword,
          limit: 3
        }
        return call('artist.search', keyword, params);
      }  
    }

  	return musicService;
};

angular.module('magicListenApp')
  .factory('ExternalMusicService', ['$http', apiExternalMusic]);
