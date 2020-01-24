/* Isso pertence a um retardado feliz conhecido como Lera. Apesar de livre, o autor terá que ser citado. Roubo de código é crime!

UM BEIJO NA SUA BOCA!=)*/


//Variaveis...
var podplays = document.getElementById("podplays");
var pbutton = document.getElementById("pbutton");
var muteb = document.getElementById("muteb");
var duration = podplays.duration;
var currentTime = podplays.currentTime;
var playhead = document.getElementById("playhead");


//Isso é importante para a barra de tempo fincionar
playhead.addEventListener("timeupdate", timeUpdate, false);


//função play
pbutton.addEventListener("click", play);
//...
muteb.addEventListener("click", mute);
//Os númerozinhos que indicam quanto tempo passou
podplays.addEventListener("timeupdate", timeUpdate, false);
//a barra de progresso
podplays.addEventListener("timeupdate", function() {
	if (duration > 0) {
		for (var i = 0; i < podplays.buffered.length; i++) {
			if (podplays.buffered.start(podplays.buffered.length - 1 - i) < podplays.currentTime) {
				document.getElementById("d1").style.width = (podplays.buffered.end(podplays.buffered.length - 1 - i) / duration) * 100 + "%";
				break;
			}
		}
	}
});

//a função que atualiza o tempo
podplays.addEventListener("timeupdate", function() {
var duration = podplays.duration;
	if (duration > 0) {
		document.getElementById("downloaded").style.width = ((podplays.currentTime / duration)*100) + "%";
	}
});




podplays.addEventListener("canplaythrough", function () {
duration = podplays.duration;
	document.getElementById("duration").innerHTML = Math.floor(this.duration / 3000) + ':'  + Math.floor(this.duration / 60 % 60) + ':' + Math.floor(this.duration % 60);

}, false);

//isso é para o botão funcionar (sim, eu estou tentando ser engraçado)
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


//isso é para limitar a largura da timeline
var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;




//isso é para torna-la clicavel
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


//A função do tempo. Deleta-la causará o fim do universo!
function timeUpdate() {
var playPercent = timelineWidth * (podplays.currentTime / duration);
playhead.style.width = playPercent + "px";


	var playPercent = timelineWidth * (podplays.currentTime / duration);
		document.getElementById("ctime").innerHTML = Math.floor(this.currentTime / 3000) + ':' + Math.floor(this.currentTime / 60 % 60) + ':' + Math.floor(this.currentTime % 60);
}

function getPosition(el) {
	return el.getBoundingClientRect().left;
}
