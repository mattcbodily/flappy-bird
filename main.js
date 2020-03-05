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

function draw(){
    ctx.drawImage(background, 0, 0);
    ctx.drawImage(topPipe, canvas.width, 0)
    ctx.drawImage(bottomPipe, canvas.width, topPipe.height + 75)
    ctx.drawImage(ground, 0, canvas.height - 106);
    ctx.drawImage(bird, birdX, birdY);

    birdY -= gravity;

    requestAnimationFrame(draw)
}

draw();