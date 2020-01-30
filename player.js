/*Esse código foi escrito por um retardado feliz conhecido como Lera*/

//Mais variável que o meu humor!

var podplays = document.getElementById("podcast");
var pbutton = document.getElementById("pButton");
var muteb = document.getElementById("muteb");
var duration = podcast.duration;
var currentTime = podcast.currentTime;
var playhead = document.getElementById("playhead");
var thevol = document.getElementById("volu");
var volume = podcast.volume;

//Sem isso, sem controle de volume.
thevol.addEventListener("change", function() {

	podcast.volume = thevol.value;
});

//Aqueles númerozinhos que mostram quanto tempo se passou e o tempo total do audio
playhead.addEventListener("timeupdate", timeUpdate, false);


//Eventos e "click" (ou "touch").
pButton.addEventListener("click", play);

muteb.addEventListener("click", mute);

podcast.addEventListener("timeupdate", timeUpdate, false);

podcast.addEventListener("timeupdate", function() {
	if (duration > 0) {
		for (var i = 0; i < podcast.buffered.length; i++) {
			if (podcast.buffered.start(podcast.buffered.length - 1 - i) < podcast.currentTime) {
				document.getElementById("d1").style.width = (podcast.buffered.end(podcast.buffered.length - 1 - i) / duration) * 100 + "%";
			
//Não apague essa linha!
				break;
			}
		}
	}
});

//A função do tempo...
podcast.addEventListener("timeupdate", function() {
var duration = podcast.duration;
	if (duration > 0) {
		document.getElementById("downloaded").style.width = ((podcast.currentTime / duration)*100) + "%";
	}
});




podcast.addEventListener("canplaythrough", function () {
duration = podcast.duration;
	//Esse é o calculo do tempo.
	document.getElementById("duration").innerHTML = Math.floor(this.duration / 3000) + ':'  + Math.floor(this.duration / 60 % 60) + ':' + Math.floor(this.duration % 60);

}, false);

//O nome da função é auto-explicativo.
function play() {
	if (podcast.paused) {
	podcast.play();
	pButton.className = "";
	pButton.className = "pause";
	} else {
		podcast.pause();
		pButton.className = "";
		pButton.className = "playbutton";
		
	}
}

function mute() {
	if (podcast.muted == true) {
		podcast.muted = false;
		muteb.className = "";
		muteb.className = "mutebutton";
	} else {
		podcast.muted = true;
		muteb.className = "";
		muteb.className = "unmutebutton";
	}
}



var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;





timeline.addEventListener("click", function (event) {
	moveplayhead(event)
	podcast.currentTime = duration * clickPercent(event);
}, false);

function clickPercent(event) {
	return (event.clientX - getPosition(timeline)) / timelineWidth;
}
function moveplayhead(event) {
	var newMargLeft = event.clientX - getPosition(timeline);

	if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
		playhead.style.width = newMargLeft + "px";
	}

	if (newMargLeft < 0) {
		playhead.style.marginLeft = "0px";
	}

	if (newMargLeft > timelineWidth) {
		playhead.style.margiLeft = timelineWidth + "px";
	}
}



function timeUpdate() {
var playPercent = timelineWidth * (podcast.currentTime / duration);
playhead.style.width = playPercent + "px";


	var playPercent = timelineWidth * (podcast.currentTime / duration);
		document.getElementById("ctime").innerHTML = Math.floor(this.currentTime / 3000) + ':' + Math.floor(this.currentTime / 60 % 60) + ':' + Math.floor(this.currentTime % 60);
}

function getPosition(el) {
	return el.getBoundingClientRect().left;
}
