/*Esse código foi escrito por um retardado feliz conhecido como Lera*/


//Mais variável que o meu humor!

var podplays = document.getElementById("podplays");
var pbutton = document.getElementById("pbutton");
var muteb = document.getElementById("muteb");
var duration = podplays.duration;
var currentTime = podplays.currentTime;
var playhead = document.getElementById("playhead");
var thevol = document.getElementById("volu");
var volume = podplays.volume;

//Sem isso, sem controle de volume.
thevol.addEventListener("change", function() {

	podplays.volume = thevol.value;
});

//Aqueles númerozinhos que mostram quanto tempo se passou e o tempo total do audio
playhead.addEventListener("timeupdate", timeUpdate, false);


//Eventos e "click" (ou "touch").
pbutton.addEventListener("click", play);

muteb.addEventListener("click", mute);

podplays.addEventListener("timeupdate", timeUpdate, false);

podplays.addEventListener("timeupdate", function() {
	if (duration > 0) {
		for (var i = 0; i < podplays.buffered.length; i++) {
			if (podplays.buffered.start(podplays.buffered.length - 1 - i) < podplays.currentTime) {
				document.getElementById("d1").style.width = (podplays.buffered.end(podplays.buffered.length - 1 - i) / duration) * 100 + "%";
			
//Não apague essa linha!
				break;
			}
		}
	}
});

//A função do tempo...
podplays.addEventListener("timeupdate", function() {
var duration = podplays.duration;
	if (duration > 0) {
		document.getElementById("downloaded").style.width = ((podplays.currentTime / duration)*100) + "%";
	}
});




podplays.addEventListener("canplaythrough", function () {
duration = podplays.duration;
	//Esse é o calculo do tempo.
	document.getElementById("duration").innerHTML = Math.floor(this.duration / 3000) + ':'  + Math.floor(this.duration / 60 % 60) + ':' + Math.floor(this.duration % 60);

}, false);

//O nome da função é auto-explicativo.
function play() {
	if (podplays.paused) {
	podplays.play();
	pbutton.className = "";
	pbutton.className = "pause";
	} else {
		podplays.pause();
		pbutton.className = "";
		pbutton.className = "playbutton";
		
	}
}

function mute() {
	if (podplays.muted == true) {
		podplays.muted = false;
		muteb.className = "";
		muteb.className = "mutebutton";
	} else {
		podplays.muted = true;
		muteb.className = "";
		muteb.className = "unmutebutton";
	}
}



var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;





timeline.addEventListener("click", function (event) {
	moveplayhead(event)
	podplays.currentTime = duration * clickPercent(event);
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
var playPercent = timelineWidth * (podplays.currentTime / duration);
playhead.style.width = playPercent + "px";


	var playPercent = timelineWidth * (podplays.currentTime / duration);
		document.getElementById("ctime").innerHTML = Math.floor(this.currentTime / 3000) + ':' + Math.floor(this.currentTime / 60 % 60) + ':' + Math.floor(this.currentTime % 60);
}

function getPosition(el) {
	return el.getBoundingClientRect().left;
}
