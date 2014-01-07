'use strict';

var playerService = function($window, $log){
	$window.onYouTubeIframeAPIReady = function () {
		
	}
	$window.onPlayerReady = function(evt) {
		evt.target.playVideo();
	};
	$window.onPlayerStateChange = function(evt) {
		if (evt.data == YT.PlayerState.ENDED){
			playerControl.nextVideo();
		}
	};
	var playerControl = {
		config : {
			volume: 50,
			isShow: false,
			isShuffle: false,
			isRepeate: false,
			isPaused: false,
			index: 0,
			isValid: false,
			list: [],
			loadVideoByIndex: function(){
				if (this.list.length > this.index){
					player.loadVideoById(this.list[this.index]['id']);
				}
			}
		},

		isPlayable: function() {
			return (this.config.list.length > 0);
		},

		stopVideo: function(){
			player.stopVideo();
			this.config.isPaused = true;
		},

		playVideo: function(){
			var duration = player.getDuration();
			if (duration>0){
				player.playVideo();
				this.config.isPaused = false;
			}
			else{
				//player.loadVideoById(this.config.list[this.config.index]['id']);
			}
		},
		nextVideo: function(){
			if (this.config.isShuffle==false){
				if (this.config.index < this.config.list.length){
					this.config.index++;
					this.config.loadVideoByIndex();
					this.config.isPaused = false;
				}
			}
		},
		previousVideo: function(){
			if (this.config.isShuffle==false){
				if (this.config.index > 0){
					this.config.index --;
					this.config.loadVideoByIndex();
					this.config.isPaused = false;
				}
			}
		},

	};
	return playerControl;
	
};

angular.module('magicListenApp')
  .factory('PlayerService', ['$window','$log',playerService]);
