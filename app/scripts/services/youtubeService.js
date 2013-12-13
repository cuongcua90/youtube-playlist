'use strict';

var apiExternalMusic = function($http) {
    var youtubeApiUrl = "http://gdata.youtube.com/feeds/api/videos?q=";

    var musicService = {};
  	musicService.searchYoutube = function(keyword){
  		var url = youtubeApiUrl+ encodeURIComponent(keyword); 
  		var params = {
            format: 5,
            maxResults: 10,
            v: 2,
            alt: 'jsonc'
            
        };
        return $http.jsonp(url, {
            params: params
        });
  	}	

  	return musicService;
};

angular.module('magicListenApp')
  .factory('ExternalMusicService', ['$http', apiExternalMusic]);
