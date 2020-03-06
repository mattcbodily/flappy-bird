const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

const background = new Image();
const ground = new Image();
const topPipe = new Image();
const bottomPipe = new Image();
const bird = new Image();
const scoreboard = new Image();
const bronze = new Image();
const silver = new Image();
const gold = new Image();
const platinum = new Image();

background.src = 'assets/background.png';
ground.src = 'assets/ground.png';
topPipe.src = 'assets/top-pipe.png';
bottomPipe.src = 'assets/bottom-pipe.png';
bird.src = 'assets/bird.png';
scoreboard.src = 'assets/scoreboard.png';
bronze.src = 'assets/bronze-medal.png';
silver.src = 'assets/silver-medal.png';
gold.src = 'assets/gold-medal.png';
platinum.src = 'assets/platinum-medal.png';

const pointSound = new Audio();
const flyingSound = new Audio();

pointSound.src = 'assets/point-sound.wav';
flyingSound.src = 'assets/flying-sound.mp3';

function Bird(){
    this.x = 25;
    this.y = 275;
}

let flappyBird;
const gravity = 1.5;
let gap = 95;
const pipes = [];
let score = 0;
sessionStorage.setItem('highScore', 0);

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
                    y: Math.floor(Math.random() * -335)
                });
            }

            if(pipes[i].x === 25){
                pointSound.play()
                score++
                if(score > sessionStorage.getItem('highScore')){
                    sessionStorage.setItem('highScore', score);
                }
            }

            if(bird.width + flappyBird.x >= pipes[i].x && flappyBird.x <= pipes[i].x + topPipe.width && (flappyBird.y <= pipes[i].y + topPipe.height || flappyBird.y + bird.height >= pipes[i].y + topPipe.height + gap) || flappyBird.y + bird.height >= canvas.height - ground.height){
                ctx.drawImage(scoreboard, 20, 200)

                if(score >= 10 && score <= 24){
                    ctx.drawImage(bronze, 50, 248)
                } else if(score >= 25 && score <= 49){
                    ctx.drawImage(silver, 50, 248)
                } else if(score >= 50 && score <= 99){
                    ctx.drawImage(gold, 50, 248)
                } else if(score >= 100){
                    ctx.drawImage(platinum, 50, 248)
                }

                ctx.font = 'bold 20px Orbitron'
                ctx.fillText(score, 235, 260)
                ctx.fillText(sessionStorage.getItem('highScore'), 236, 320)
                ctx.drawImage(ground, 0, canvas.height - ground.height)
                pipes.splice(0)
                cancelAnimationFrame(animation)
            }
        }

        ctx.drawImage(ground, 0, canvas.height - ground.height);
        ctx.drawImage(bird, flappyBird.x, flappyBird.y);
        ctx.fillStyle = '#FFF';
        ctx.font = '30px Orbitron';
        ctx.fillText(`${score}`, canvas.width / 2, 40)

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
        flyingSound.play()
        flappyBird.y -= 30;
    } else if(event.keyCode === 40){
        //flappyBird fall functionality
        flappyBird.y += gravity + 2;
    }
})