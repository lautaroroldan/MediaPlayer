const play = document.querySelector(".play")
const next = document.querySelector(".next")
const prev = document.querySelector(".prev")
const musicTitle = document.querySelector(".musicTitle")
const songData = musicTitle.querySelectorAll("p")
const list = document.querySelector(".list")
const startDuration = document.querySelector(".startDuration")
const endDuration = document.querySelector(".endDuration")
const songArray = [{
    name: "I want you back",
    artist: "Jackson 5",
    cover: "./assets/images/I Want You Back.jpg",
    source: "./assets/music/I Want You Back.mp3",
}, {
    name: "Genie in a bottle",
    artist: "Christina Aguilera",
    cover: "./assets/images/Genie in a Bottle.jpg",
    source: "./assets/music/Genie in a Bottle.mp3",
}]
let songIndex = 0
const audio = new Audio(songArray[songIndex].source)
const range = document.querySelector("input[type=range]")
const album = document.querySelector(".album")
const playlist = document.querySelector(".playlist")
const svgPause = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-pause-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" stroke-width="0" fill="currentColor"></path>
            <path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" stroke-width="0" fill="currentColor"></path>
        </svg>`

const svgPlay = `<svg xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-player-play-filled" width="24" height="24"
    viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
    stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path
        d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z"
        stroke-width="0" fill="currentColor"></path>
</svg>`
const reproduction = play.querySelector("svg")
const albumImg = document.querySelector(".albumImg")

function createPlaylist() {
    const ul = document.createElement("ul")
    songArray.forEach((song) => {
        const li = document.createElement("li")
        const div = document.createElement("div")
        div.classList.add("playlistSongs")
        const button = document.createElement("button")

        const infoSong = document.createElement("div")
        infoSong.classList.add("infoSong")
        const titleSong = document.createElement("h3")
        const artistSong = document.createElement("h4")

        const svg = document.createElement("svg")
        svg.innerHTML = svgPlay

        titleSong.innerHTML = song.name
        artistSong.innerHTML = song.artist
        infoSong.appendChild(titleSong)
        infoSong.appendChild(artistSong)

        button.appendChild(svg)
        button.addEventListener("click", () => {

            if (!audio.paused) {
                audio.pause()
                svg.innerHTML = svgPlay
                reproduction.innerHTML = svgPlay
                button.classList.remove("playing")
                play.classList.remove("playing")
                albumImg.classList.add("pauseAnimationRotate")
            }
            else {
                audio.play()
                button.classList.add("playing")
                play.classList.add("playing")
                albumImg.classList.add("playAnimationRotate")
                albumImg.classList.remove("pauseAnimationRotate")
                svg.innerHTML = svgPause
                reproduction.innerHTML = svgPause
            }
        })
        div.appendChild(infoSong)
        div.appendChild(button)

        li.appendChild(div)
        ul.appendChild(li)
        playlist.appendChild(ul)
    })
}
createPlaylist()

list.addEventListener("click", () => {
    const albumDots = document.querySelector(".albumDots")
    const albumCover = document.querySelector(".albumCover")
    const albumHeart = document.querySelector(".albumHeart")
    albumHeart.classList.toggle("albumHeartAnimation")
    albumCover.classList.toggle("albumCoverAnimation")
    albumDots.classList.toggle("albumDotsAnimation")
    playlist.classList.toggle("active")
    const musicInfo = document.querySelector(".musicInfo")
    if (musicInfo.style.visibility === "hidden") {
        musicInfo.style.visibility = "visible"
    } else {
        musicInfo.style.visibility = "hidden"
    }

})

function handleRangeInput() {
    audio.currentTime = range.value * audio.duration / 100;
}

function updateSongTitle() {
    songData[0].innerHTML = songArray[songIndex].name
    songData[1].innerHTML = songArray[songIndex].artist
}

function updateEndDuration() {
    const minutes = Math.floor(audio.duration / 60);
    const seconds = Math.floor(audio.duration % 60);
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    endDuration.innerHTML = formattedTime
}

function playNextOrPrevSong() {
    range.value = 0
    // Actualizar el título de la canción.
    updateSongTitle();
    updateEndDuration()
}

range.addEventListener("input", handleRangeInput)

audio.addEventListener("loadeddata", playNextOrPrevSong)

prev.addEventListener("click", () => {
    songIndex--
    if (songIndex < 0) {
        songIndex = songArray.length - 1
    }
    audio.pause()
    audio.currentTime = 0

    // Cambiar la fuente de audio.
    audio.src = songArray[songIndex].source;
    audio.play();
    reproduction.innerHTML = svgPause
    play.classList.add("playing")
    albumImg.classList.remove("pauseAnimationRotate")
    albumImg.classList.add("playAnimationRotate")
})



next.addEventListener("click", () => {
    songIndex++;
    if (songIndex > songArray.length - 1) {
        songIndex = 0;
    }

    // Pausar el audio actual.
    audio.pause();
    audio.currentTime = 0;

    // Cambiar la fuente de audio.
    audio.src = songArray[songIndex].source;
    audio.play();
    reproduction.innerHTML = svgPause
    play.classList.add("playing")
    albumImg.classList.remove("pauseAnimationRotate")
    albumImg.classList.add("playAnimationRotate")
});


audio.addEventListener("ended", () => {
    play.src = "./assets/svgs/play.svg"
    range.value = 0
    startDuration.innerHTML = "00:00"
})

audio.addEventListener("timeupdate", () => {
    // CONVIERTO EL TIEMPO EN MINUTOS Y SEGUNDOS, Y LO MUESTRO EN EL HTML
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    startDuration.innerHTML = formattedTime
    const currentTimePercentage = (audio.currentTime * 100) / audio.duration
    if (!isNaN(currentTimePercentage)) {
        range.value = currentTimePercentage
    } else {
        range.value = 0;
    }

})


play.addEventListener("click", () => {

    if (!audio.paused) {
        audio.pause()
        reproduction.innerHTML = svgPlay
        play.classList.remove("playing")
        albumImg.classList.add("pauseAnimationRotate")
    }
    else {
        audio.play()
        play.classList.add("playing")
        albumImg.classList.add("playAnimationRotate")
        albumImg.classList.remove("pauseAnimationRotate")
        reproduction.innerHTML = svgPause
    }
})