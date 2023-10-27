// set music details 
let songs = [
    {
        name: 'Mere ma ke barabar koi nahi...',
        path: 'media/audio1.mp3',
        artist: 'juben noutiyal',
        cover: 'media/image1.jpg'
    },
    {
        name: 'chand si mahbooba ho meri kb...',
        path: ' media/audio2.mp3 ',
        artist: 'Mukesh',
        cover: 'media/image2.jpg'
    },
    {
        name: 'He najami suno na...',
        path: ' media/audio3.mp3 ',
        artist: 'A.R.rahaman',
        cover: 'media/image3.jpg'
    },
    {
        name: 'kutii story',
        path: ' media/audio4.mp3 ',
        artist: 'anirudh ravichader',
        cover: 'media/image4.jpg'
    }
]

 // Main js code

let currentMusic = 0;

const music = document.querySelector('#audio');

const seekBar = document.querySelector('.seek-bar');

const songName = document.querySelector('.music-name');

const artistName = document.querySelector('.artist-name');

const disk = document.querySelector('.disk');

const currentTime = document.querySelector('.current-time');

const musicDuration = document.querySelector('.song-duration');

const playBtn = document.querySelector('.play-btn');

const forwardBtn = document.querySelector('.for-btn');

const backwardBtn = document.querySelector('.back-btn');


playBtn.addEventListener('click' , () => {

    playBtn.classList.toggle('playing');
    disk.classList.toggle('play');

    if (playBtn.className.includes('playing')) {
        music.play();
    } else {
        music.pause();
    }
})

const setMusic = (i) => {
    seekBar.value = 0;  // set range slide value to 0 ;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;

    currentTime.innerHTML = '00:00';
    setTimeout(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, 1300);
}

setMusic(0);

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min}  :  ${sec}`;
}

setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
    if (Math.floor(music.currentTime) == Math.floor(seekBar.max)) {
        forwardBtn.click();
    }
}, 500); 

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
    playMusic();
})

const playMusic = () => {
    music.play();
    playBtn.classList.add('playing');
    disk.classList.add('play');
}
//forward and backward

forwardBtn.addEventListener('click', () => {
    if (currentMusic >= songs.length - 1) {
        currentMusic = 0;
    } else {
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
})
backwardBtn.addEventListener('click', () => {
    if (currentMusic <= 0) {
        currentMusic = songs.length - 1;
    } else {
        currentMusic--;
    }
    setMusic(currentMusic);
    playMusic();
})
