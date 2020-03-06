const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

const background = new Image();
const ground = new Image();
const topPipe = new Image();
const bottomPipe = new Image();
const bird = new Image();
const scoreboard = new Image();

background.src = 'assets/background.png';
ground.src = 'assets/ground.png';
topPipe.src = 'assets/top-pipe.png';
bottomPipe.src = 'assets/bottom-pipe.png';
bird.src = 'assets/bird.png';
scoreboard.src = 'assets/scoreboard.png';


function Bird(){
    this.x = 25;
    this.y = 275;
}

let flappyBird;
const gravity = 1.5;
let gap = 95;
const pipes = [];
let score = 0;

window.onload = function(){
    ctx.drawImage(background, 0, 0)
    ctx.drawImage(ground, 0, canvas.height - ground.height)
    ctx.drawImage(bird, 25, 275)
}

function draw(){
    flappyBird = new Bird();
    score = 0;

    pipes[0] = {
        x: canvas.width,
        y: -50
    }

    return (function animate(){
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

            if(bird.width + flappyBird.x >= pipes[i].x && flappyBird.x <= pipes[i].x + topPipe.width && (flappyBird.y <= pipes[i].y + topPipe.height || flappyBird.y + bird.height >= pipes[i].y + topPipe.height + gap) || flappyBird.y + bird.height >= canvas.height - ground.height){
                ctx.drawImage(scoreboard, 20, 200)
                ctx.font = 'bold 20px Orbitron'
                ctx.fillText(score, 242, 260)
                ctx.drawImage(ground, 0, canvas.height - ground.height)
                pipes.splice(0)
                cancelAnimationFrame(animation)
                // location.reload()
            }
        }

        ctx.drawImage(ground, 0, canvas.height - ground.height);
        ctx.drawImage(bird, flappyBird.x, flappyBird.y);
        ctx.fillStyle = '#FFF';
        ctx.font = '30px Orbitron';
        ctx.fillText(`${score}`, 162, 40)

        flappyBird.y += gravity;

        let animation = requestAnimationFrame(animate)
    }())
}

document.addEventListener('keydown', function(event){
    if(event.keyCode === 13){
        //initialize starting variable values and start animation
        draw();
    } else if(event.keyCode === 32 || event.keyCode === 38){
        //flappyBird fly functionality
        flappyBird.y -= 30;
    } else if(event.keyCode === 40){
        //flappyBird fall functionality
        flappyBird.y += gravity + 1;
    }
})
