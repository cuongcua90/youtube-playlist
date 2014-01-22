'use strict';

var playerService = function($window, $log, $rootScope, $timeout){
	var playerControl = {
		config : {
			isReady: false,
			volume: 50,
			isShow: false,
			isShuffle: false,
			isRepeate: false,
			index: 0,
			status: -1,
			list: [],
		},
		loadVideoByIndex: function(){
			if (this.config.list.length > this.config.index){
				player.loadVideoById(this.config.list[this.config.index]['id']);
			}
		},
		addVideoItem: function(item){
			this.config.list.push(item);
		},
	
		isPlayable: function() {
			return (this.config.list.length > 0);
		},

		pauseVideo: function(){
			player.pauseVideo();
		},

		changeIndex: function(index){
			if (this.config.index!==index){
				this.config.index = index;
				this.loadVideoByIndex();
			}
		},

		playVideo: function(){
			var duration = player.getDuration();
			if (duration>0){
				player.playVideo();
			}
			else{
				//player.loadVideoById(this.config.list[this.config.index]['id']);
			}
		},
		nextVideo: function(){
			if (this.config.isShuffle==false){
				if (this.config.index < this.config.list.length-1){
					this.config.index++;
					this.loadVideoByIndex();
				}
				else{
					this.config.index = 0;
					this.loadVideoByIndex();
				}
			}
		},
		previousVideo: function(){
			if (this.config.isShuffle==false){
				if (this.config.index > 0){
					this.config.index --;
					this.loadVideoByIndex();
				}
			}
		},

	};
	$window.onYouTubeIframeAPIReady = function () {
		playerControl.config.isReady = true;

	};
	$window.onPlayerReady = function(evt) {
		evt.target.playVideo();
	};
	$window.onPlayerStateChange = function(evt) {
		if (evt.data == YT.PlayerState.ENDED){
			playerControl.nextVideo();
		}

		$rootScope.$apply(function(){
			playerControl.config.status = evt.data;
		});
	};
	return playerControl;
	
};

angular.module('magicListenApp')
  .factory('PlayerService', ['$window','$log', '$rootScope', '$timeout',playerService]);
