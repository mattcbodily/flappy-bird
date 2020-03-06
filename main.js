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

const gravity = 1.5;
let gap = 95;
const pipes = [];


pipes[0] = {
    x: canvas.width,
    y: -50
}

let score = 0

function draw(){
    ctx.drawImage(background, 0, 0);

    for(let i = 0; i < pipes.length; i++){
        ctx.drawImage(topPipe, pipes[i].x, pipes[i].y)
        ctx.drawImage(bottomPipe, pipes[i].x, pipes[i].y + topPipe.height + gap)

        pipes[i].x--

        if(pipes[i].x === 125){
            pipes.push({
                x: canvas.width, 
                y: Math.floor(Math.random() * (topPipe.height)) - topPipe.height
            });
        }

        if(pipes[i].x === 25){
            score++
        }

        if(bird.width + birdX >= pipes[i].x && birdX <= pipes[i].x + topPipe.width && (birdY <= pipes[i].y + topPipe.height || birdY + bird.height >= pipes[i].y + topPipe.height + gap) || birdY + bird.height >= canvas.height - ground.height){
            location.reload()
        }
    }

    ctx.drawImage(ground, 0, canvas.height - ground.height);
    ctx.drawImage(bird, birdX, birdY);
    ctx.fillStyle = '#FFF';
    ctx.font = '30px Orbitron';
    ctx.fillText(`${score}`, 162, 40)

    birdY += gravity;

    requestAnimationFrame(draw)
}

// draw();

document.addEventListener('keydown', function(event){
    if(event.keyCode === 13){
        draw();
    }
})

document.addEventListener('keydown', function(event){
    if(event.keyCode === 32 || event.keyCode === 38){
        birdY -= 30;
    }
})

