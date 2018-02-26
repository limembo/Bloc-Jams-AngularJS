# Bloc Jams AngularJS Starter

The below info is for the vanilla JS and jQuery version of this app. The code in this repository was refactored using Angular but has not been placed on any Node servers.

Bloc Jams is a streaming music player with media queries to determine the viewer's display dimensions and a responsive, grid-based user interface to provide an optimized look for various viewing device display sizes.

The home page features text shadowing and CSS transition animations for a (literally) moving user experience. Graphics from the Ionicons font library are also used here for the musical notes, radio wave, and mobile device images.

The Collection page, accessed via the link in the upper right corner of the home page, presents a set of albums. Each album reference includes artist, album title, song count, and album art. Selecting an album loads the album page. (At this time all entries are duplicates of a single album.)

The Album page includes album data from the Collection page, plus a track list with track number, title, and duration. A player control with play/pause, track back, track forward, and sliders for controlling the position of the currently playing track and the volume level appears at the bottom in a semi-transparent overlay. Hovering over a track number causes a play icon to appear in the track number's place and a pause button appears in the same position for the currently playing track. The Buzz audio library is used to load, play, and present representations of meta data for audio files.

Technologies Used
Languages & libraries: HTML, CSS, JavaScript, jQuery, Buzz audio library (buzz.jaysalvat.com)

Other resources: Google Fonts 'Open Sans', icons from Ionic (ionicframework.com)
