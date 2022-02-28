let move_speed = 4, grativy = 0.5;
let bird = document.querySelector('.bird');
let img = document.getElementById('bird-1');
let sound_point = new Audio('soundsEffect/point.wav');
let sound_die = new Audio('soundsEffect/die.wav');
let sound_background = new Audio('soundsEffect/AfternoonNap.mp3'); sound_background.loop = true;


// the size and position of the rectangle (DOMRect)
let bird_property = bird.getBoundingClientRect();


// (DOMReact) background x, y, width and height repective to viewport
let background = document.querySelector('.background').getBoundingClientRect();


let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');


// hide element 
img.style.display = 'none';


//css styling line 51 
message.classList.add('messageStyle');
let game_state = 'Start';



/*.forEach (*/
document.addEventListener('keydown', (e) => {
    
    if(e.key == 'Enter' && game_state != 'Play'){
        document.querySelectorAll('.pipe_css').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        bird.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score : ';
        score_val.innerHTML = '0';
        message.classList.remove('messageStyle');
        play();
    }
});



function play(){
    
    function move(){
        if(game_state != 'Play') return; 
        sound_background.play();

        let pipe_css = document.querySelectorAll('.pipe_css');
        pipe_css.forEach((element) => {
            let pipe_properties = element.getBoundingClientRect();
            bird_property = bird.getBoundingClientRect();

            // when pipe from right touch left = 0 , remove pipe
            if(pipe_properties.right <= 0){
                element.remove();
                 
            }else{
                if(bird_property.left < pipe_properties.left + pipe_properties.width && bird_property.left + bird_property.width > pipe_properties.left && bird_property.top < pipe_properties.top + pipe_properties.height && bird_property.top + bird_property.height > pipe_properties.top){
                    game_state = 'End';
                    message.innerHTML = 'Game Over' .fontcolor('red') + '<br> Press Enter To Restart'; 
                    message.classList.add('messageStyle'); /* css styling line 51 */
                    img.style.display = 'none';
                    sound_die.play();
                    sound_background.pause();
                    sound_background.currentTime = 0; /* Stop looping of background sound */
                    return;
                }else{
                    if(pipe_properties.right < bird_property.left && pipe_properties.right + move_speed >= bird_property.left && element.increase_score == '1'){
                        score_val.innerHTML =+ score_val.innerHTML + 1;
                        sound_point.play();
                    }
                    element.style.left = pipe_properties.left - move_speed + 'px';
                }
            }
        });
        requestAnimationFrame(move);
    }
    /*  tells the browser that you wish to perform an animation and requests that the browser calls a specified function 
        to update an animation before the next repaint. */
    requestAnimationFrame(move);
 

    /* Gravity on Bird (Key [up/down] toggle image) */ 
    let bird_Yaxis_Drop = 0;
    function apply_gravity(){
        if(game_state != 'Play') return;
        bird_Yaxis_Drop = bird_Yaxis_Drop + grativy;

            document.addEventListener('keydown', (e) => {
                if(e.key == 'spacebar' || e.key == ' '){
                    img.src = 'images/Bird-2.png';
                    bird_Yaxis_Drop = -10.6;
                }
            });

            document.addEventListener('keyup', (e) => {
                if(e.key == 'spacebar' || e.key == ' '){
                    img.src = 'images/Bird.png';
                }
            });

        // if bird touch extreme top or btm , game will end 
        if(bird_property.top <= 0 || bird_property.bottom >= background.bottom){
            game_state = 'End';
            message.style.left = '28vw';
            //window.location.reload() go back to starting page
            window.location.reload();
            message.classList.remove('messageStyle');
            sound_background.stop();
            return;
        }
        bird.style.top = bird_property.top + bird_Yaxis_Drop + 'px';
        bird_property = bird.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);



/* Pipes Property and Perimeter */ 
    let pipe_seperation = 0;
    let pipe_gap = 33;

    function create_pipe(){
        if(game_state != 'Play') return;

        if(pipe_seperation > 150){
            pipe_seperation = 0;

            let pipe_position = Math.floor(Math.random() * 43) + 5;
            let pipe_css_inv = document.createElement('div');
            pipe_css_inv.className = 'pipe_css';
            pipe_css_inv.style.top = pipe_position - 70 + 'vh';
            pipe_css_inv.style.left = '100vw';

            document.body.appendChild(pipe_css_inv);
            let pipe_css = document.createElement('div');
            pipe_css.className = 'pipe_css';
            pipe_css.style.top = pipe_position + pipe_gap + 'vh';
            pipe_css.style.left = '100vw';
            pipe_css.increase_score = '1';

            document.body.appendChild(pipe_css);
        }
        pipe_seperation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}