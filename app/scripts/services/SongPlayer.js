(function() {
  function SongPlayer($rootScope, Fixtures) {
    var SongPlayer = {};

/**
* @desc Active album object from collection of albums
* @type {Object}
*/
  var currentAlbum = Fixtures.getAlbum();

  /**
* @desc Buzz object audio file
* @type {Object}
*/
    var currentBuzzObject = null;

/**
* @function setSong
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {Object} song
*/

    var setSong = function(song) {
    if (currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
    }

    currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });

    currentBuzzObject.bind('timeupdate', function() {
         $rootScope.$apply(function() {
             SongPlayer.currentTime = currentBuzzObject.getTime();
         });
     });

    SongPlayer.currentSong = song;
 };

 /**
 * @function playSong
 * @desc Plays audio file.
 * @param {Object} song
 */

 var playSong = function(song) {
         currentBuzzObject.play();
         song.playing = true;
 };

 var stopSong = function(song) {
         currentBuzzObject.stop();
         song.playing = null;
 };

 var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
  };



 /**
  * @desc Current song object that holds metadata for audio file
  * @type {Object}
  */

SongPlayer.currentSong = null;

/**
* @desc Current playback time (in seconds) of currently playing song
* @type {Number}
*/
SongPlayer.currentTime = null;

/**
* @desc Changes the volume
* @type {Number}
*/
SongPlayer.volume = 40;

/**
* @desc Mutes sound
* @type {Object}
*/
SongPlayer.muted = false;


SongPlayer.play = function(song) {
   song = song || SongPlayer.currentSong;
  if (SongPlayer.currentSong !== song) {
    setSong(song);
    playSong(song);
   } else if (SongPlayer.currentSong === song) {
     if (currentBuzzObject.isPaused()) {
         playSong(song);
     }
 }
};


SongPlayer.pause = function(song) {
 song = song || SongPlayer.currentSong;
 currentBuzzObject.pause();
 song.playing = false;
};

SongPlayer.previous = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;
     if (currentSongIndex < 0) {
           stopSong(song);
       } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }
 };

 SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex++;
      if (currentSongIndex > currentAlbum.songs.length) {
            stopSong(song);
      } else {
          var song = currentAlbum.songs[currentSongIndex];
          setSong(song);
          playSong(song);
      }
  };

  /**
* @function setCurrentTime
* @desc Set current time (in seconds) of currently playing song
* @param {Number} time
*/
SongPlayer.setCurrentTime = function(time) {
    if (currentBuzzObject) {
        currentBuzzObject.setTime(time);
    }
};

/**
* @function setVolume
* @desc Sets the volume of a song
* @param {Number} volume
*/
SongPlayer.setVolume = function(volume) {
  if (currentBuzzObject) {
    currentBuzzObject.setVolume(volume);
    }
    SongPlayer.volume = volume
  };

  /**
  * @function setVolume
  * @desc Allows user to mute sound of currently playing song
  * @param {Object}
  */

  SongPlayer.toggleMute = function () {
		if (SongPlayer.volume === 0) {
				SongPlayer.muted = false;
				SongPlayer.setVolume(SongPlayer.prevVolume);
			} else {
				// Previous volume to return to after un-muting
				SongPlayer.prevVolume = SongPlayer.volume;
				SongPlayer.muted = true;
				SongPlayer.setVolume(0);
			}
		}

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
