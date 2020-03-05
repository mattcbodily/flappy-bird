const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

const background = new Image();
const ground = new Image();
const topPipe = new Image();
const bottomPipe = new Image();
const bird = new Image();

background.src = 'assets/background.png';
ground.src = 'assets/ground.png';
topPipe.src = 'assets/top-pipe.png';
bottomPipe.src = 'assets/bottom-pipe.png';
bird.src = 'assets/bird.png';

let birdX = 25;
let birdY = 275;

const gravity = 1;
const pipes = [];

pipes[0] = {
    x: canvas.width,
    y: 0
}

function draw(){
    ctx.drawImage(background, 0, 0);

    for(let i = 0; i < pipes.length; i++){
        ctx.drawImage(topPipe, pipes[i].x, pipes[i].y)
        ctx.drawImage(bottomPipe, pipes[i].x, pipes[i].y + topPipe.height + 75)

        pipes[i].x--
    }

    ctx.drawImage(ground, 0, canvas.height - ground.height);
    ctx.drawImage(bird, birdX, birdY);

    birdY += gravity;

    requestAnimationFrame(draw)
}

draw();

document.addEventListener('keydown', fly)

function fly(event){
    if(event.keyCode === 32 || event.keyCode === 38){
        birdY -= 25;
    }
}