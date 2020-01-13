var podplays = document.getElementById("podplays");
var pbutton = document.getElementById("pbutton");
var muteb = document.getElementById("muteb");
var duration = podplays.duration;
var currentTime = podplays.currentTime;
var playhead = document.getElementById("playhead");



playhead.addEventListener("timeupdate", timeUpdate, false);


//PLAY E MUTE EVENTS
pbutton.addEventListener("click", play);

muteb.addEventListener("click", mute);

podplays.addEventListener("timeupdate", timeUpdate, false);




//DURAÇÃO
podplays.addEventListener("canplaythrough", function () {
duration = podplays.duration;
	document.getElementById("duration").innerHTML = Math.floor(this.duration / 3000) + ':'  + Math.floor(this.duration / 60 % 60) + ':' + Math.floor(this.duration % 60);

}, false);

//FUNÇÃO PLAY
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
//AUTO EXPLICATIVO
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


//TIMELINE
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

