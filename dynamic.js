  $('.welcome-screen button').on('click', function() {
        var name = $('#name-input').val();
        if (name.length > 2) {
            var message = "Welcome, " + name;
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');
            $('.main').removeClass('hidden');
        } else {
		    
            $('#name-input').addClass('error');
			$('#errortext').removeClass('hidden');
			var mess="Name is too short!";
			$('#errortext h4').text(mess);
        }
    });
	
	

	function updateCurrentTime() {
var song = document.querySelector('audio');
var currentTime=Math.floor(song.currentTime);
currentTime=fancyTimeFormat(currentTime);
var duration=Math.floor(song.duration);
duration=fancyTimeFormat(duration);
$('.time-elapsed').text(currentTime);
$('.song-duration').text(duration);
}
var songs=[{
	    'name': 'Tamma Tamma Again',
        'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
        'album': 'Badrinath ki Dulhania',
        'duration': '2:56',
       'fileName': 'song1.mp3',
	   'image':'song1.jpg'
},
{
        'name': 'Humma Song',
        'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
        'album': 'Ok Jaanu',
        'duration': '3:15',
        'fileName': 'song2.mp3',
		'image':'song2.jpg'
    },
    {
        'name': 'Nashe Si Chadh Gayi',
        'artist': 'Arijit Singh',
        'album': 'Befikre',
        'duration': '2:34',
        'fileName': 'song3.mp3',
		'image':'song3.jpg'
    },
    {
        'name': 'The Breakup Song',
        'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
        'album': 'Ae Dil Hai Mushkil',
        'duration': '2:29',
        'fileName': 'song4.mp3',
		'image':'song4.jpg'
	}];
$(document).ready(function() {
	changeCurrentDetails(songs[0])
for(var i=0;i<songs.length;i++){
	var obj=songs[i];
	var id="#song"+(i+1);
	var song=$(id);
	song.find('.song-name').text(obj.name);
	song.find('.song-artist').text(obj.artist);
    song.find('.song-album').text(obj.album);
    song.find('.song-length').text(obj.duration);
	addSongNamePlay(obj,i+1);
	
	
	
	
}
updateCurrentTime();
setInterval(function() {
updateCurrentTime();
},1000);
$('#songs').DataTable({
        paging: false
		
    });
});
function timeJump() {
    var song = document.querySelector('audio')
    song.currentTime = song.duration - 5;
}

function togglesong(){
	 var song = document.querySelector('audio');
	
        if (song.paused == true) {
            console.log('Playing');
            $('.play-icon').removeClass('fa-play').addClass('fa-pause');
            song.play();
        } else {
            console.log('Pausing');
            $('.play-icon').removeClass('fa-pause').addClass('fa-play');
            song.pause();
        }
	
	
	}
	function fancyTimeFormat(time)
{   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}
function changeCurrentDetails(obj){
	$('.current-song-image').attr('src','img/' + obj.image)
    $('.current-song-name').text(obj.name)
    $('.current-song-album').text(obj.album)
}
function addSongNamePlay(obj,i){
	var fileName=obj.fileName;
var id="#song"+i;
$(id).click(function(){
      var audio=document.querySelector('audio');
	
	 var currentSong=audio.src;
	 if(currentSong.search(fileName)!=-1){
	     togglesong();
	     
	 
	 }
	 else{
	    audio.src=fileName;
		togglesong();
		changeCurrentDetails(obj);
	 }
	 
});


}



    $('.play-icon').on('click', function() {
       togglesong();
    });
    $('body').on('keypress', function(event) {
	var target=event.target
                if (event.keyCode == 32 && target.tagName!='INPUT') {
                    togglesong();
                }
            });