console.log("Welcome to earloop");
let songInfo = document.getElementsByClassName('songinfo')
let songIndex = 0;
let audioElement = new Audio('songs/UNRAVEL PIANO.mp3');
let masterPlay = document.getElementById('masterPlay')
let myProgBar = document.getElementById('progressBar')
let songitem = Array.from(document.getElementsByClassName('songItem')) // to change the html list into an array
let songs = [
    {songname:"UNRAVEL PIANO",filePath:"songs/UNRAVEL PIANO.mp3",coverPath:"unravel.jpeg",duration:"04:08"},
    {songname:"Your lie in April",filePath:"songs/yourlie.mp3",coverPath:"your lie april.jpeg",duration:"04:53"},
    {songname:"Sparkle Your Name",filePath:"songs/sparkle.mp3",coverPath:"yourname.jpeg",duration:"03:06"},
    {songname:"Ashes on Fire",filePath:"songs/AOT ASH.mp3",coverPath:"aotash.jpeg",duration:"05:07"},
]
songitem.forEach((element,i)=>{
    
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerHTML = songs[i].songname;
    element.getElementsByClassName('timestamp')[0].innerHTML = songs[i].duration;
})

//Handle play/Pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play()
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
    else{
        audioElement.pause()
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }
})

//Listen to event
audioElement.addEventListener('timeupdate',()=>{
    
    //seek bar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgBar.value = progress
})

myProgBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgBar.value*audioElement.duration/100
})


songitem.forEach((element,i)=>{
    element.addEventListener('click',(e)=>{
        
        //index = parseInt(e.target.id);
       // console.log(index)
        audioElement.currentTime=0;
        audioElement.src=songs[i].filePath;
        if(audioElement.paused||audioElement.currentTime<=0){
            audioElement.play()
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
        
        //audioElement.play()
        songInfo[0].innerHTML = songs[i].songname;
        songIndex = i;
    })
})
document.getElementById('next').addEventListener('click',(e)=>{
   
   if(songIndex>=3){
    songIndex=0
   }
   else{
    songIndex+=1;
   }
   audioElement.currentTime=0;
   audioElement.src=songs[songIndex].filePath;
   audioElement.play()
   masterPlay.classList.remove('fa-play-circle');
   masterPlay.classList.add('fa-pause-circle');
   songInfo[0].innerHTML = songs[songIndex].songname;

})

document.getElementById('prev').addEventListener('click',(e)=>{
    
    if(songIndex<=0){
        songIndex = (songitem.length)-1;
    }
    else{
        songIndex-=1;
    }
    audioElement.currentTime=0;
    audioElement.src=songs[songIndex].filePath;
    audioElement.play()
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    songInfo[0].innerHTML = songs[songIndex].songname;
    
})