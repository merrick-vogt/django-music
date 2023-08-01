function playSong(audioSrc) {
    const audioPlayer = new Audio(audioSrc);
    audioPlayer.play();
}

function giveAudioSrc(audioSrc) {
    const audio = document.getElementById('audio');
    audio.src = audioSrc;
    audio.play();
}