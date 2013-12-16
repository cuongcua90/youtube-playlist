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
            maxResults: 10,
            v: 2,
            alt: 'jsonc',
        };
        return $http.get(url, {
            params: params
        });
  	}	



    musicService.searchLastFmTrackInfo = function(keyword){
      var url = lastFmUrl + "?method=";
    }

  	return musicService;
};

angular.module('magicListenApp')
  .factory('ExternalMusicService', ['$http', apiExternalMusic]);
