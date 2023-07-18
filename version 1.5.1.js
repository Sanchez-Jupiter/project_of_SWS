import { update_text, create_text, gameobjects_overlap, update_scale, create_sprite, create_rectangle, query_position, update_position, update_loop, build_game, input_key_down } from "arcade_2d";

// Create GameObjects outside update_loop(...)
const BARRI_BOUNCE_DIS = 10;
const BOUNDRY_MIN = 0;
const BOUNDRY_MAX = 550;
const birth_place = [300, 300];
const g = 5;
const inf = 999999; 
const movement_dist = 10;
const size_of_player = [0.15, 0.25];
const RIGHT = 1;
const LEFT = 0;
const UP = 2;
const DOWN = 3;
const background = update_position(create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/Screenshot_20230717_181910_com.huawei.hinote.png"), [300, 300]);
const player = [update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/Screenshot_20230717_181659_com.huawei.hinote.png"),  size_of_player),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/7a9ae57ae73cdebd3c49bfe1e5f9232731e0f3a5/player_towars_right2.png"), size_of_player),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/Screenshot_20230717_195411.png"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/62abc972249c331bca6e0e98382e6aa0f3a2c67c/player_towars_left2.png"), size_of_player )
                ];
                
const player_towards_right = 0;
const player_towards_right2 = 1;
const player_towards_left  = 2;
const player_towards_left2  = 3;

const barri = [create_rectangle(200, 50)];

const boundry = [create_rectangle(20, 1200), create_rectangle(20, 1200), 
                create_rectangle(1200, 20), create_rectangle(1200, 20)];

update_position(player[player_towards_left] , [-inf, -inf]);
update_position(player[player_towards_left2], [-inf, -inf]);
update_position(player[player_towards_right], [-inf, -inf]);
update_position(player[player_towards_right2], [-inf, -inf]);

update_position(barri[0], [100, 300]);

update_position(boundry[LEFT], [0, 0]);
update_position(boundry[UP], [0, 0]);
update_position(boundry[RIGHT], [600, 0]);
update_position(boundry[DOWN], [0, 600]);

function make_anim(mov, pos){
    return update_position(mov, pos);
}

function add_vectors(to, from) {
   to[0] = to[0] + from[0];
   to[1] = to[1] + from[1];
}

function check_barri(player, barri){
    for(let i = 0; i < array_length(barri); i = i + 1){
        if( gameobjects_overlap(barri[i], player) ){
            return true;
        }
    }
    return false;
}

let cond = player_towards_right;
let dir = RIGHT;
let last_dir = -1;

make_anim(player[cond], birth_place);

const find_xy = create_text(stringify(query_position(player[cond])[0]) + "," + stringify(query_position(player[cond])[1]));

update_loop(game_state => {
    const new_position = query_position(player[cond]);
    const pre_position = query_position(player[cond]);
    const posi = query_position(player[cond]);
    let temp = player;
    
    
    
    
    
    
    update_text(find_xy, stringify(posi[0]) + "," + stringify(posi[1]));
    update_position(find_xy, [100, 100]);
    
    
    
    if( gameobjects_overlap(boundry[LEFT], player[cond])){
        update_position(player[cond], [new_position[0] + 10 * movement_dist, new_position[1]]);
    }
    else if( gameobjects_overlap(boundry[RIGHT], player[cond])){
        update_position(player[cond], [new_position[0] - 10 * movement_dist, new_position[1]]);
    }
    else if( gameobjects_overlap(boundry[UP], player[cond])){
        update_position(player[cond], [new_position[0], new_position[1] + 10 * movement_dist]);
    }
    else if( gameobjects_overlap(boundry[DOWN], player[cond])){
        update_position(player[cond], [new_position[0], new_position[1] - 10 * movement_dist]);
    }
    
    
    
    
    if( check_barri(player[cond], barri) ){
        if( last_dir === UP ){
            update_position(player[cond], [new_position[0], new_position[1] + BARRI_BOUNCE_DIS]);
        }
        else if(last_dir === DOWN ){
            update_position(player[cond], [new_position[0], new_position[1] - BARRI_BOUNCE_DIS]);
        }
        else if(last_dir === LEFT ){
            update_position(player[cond], [new_position[0] + BARRI_BOUNCE_DIS, new_position[1]]);
        }
        else if(last_dir === RIGHT ){
            update_position(player[cond], [new_position[0] - BARRI_BOUNCE_DIS, new_position[1]]);
        }
    }
    
    //drag those who are out of rage
    if(posi[0] < BOUNDRY_MIN ) {
        update_position(player[cond], [BOUNDRY_MIN + 1, posi[1]]);
    }
    if(posi[0] > BOUNDRY_MAX){
        update_position(player[cond], [BOUNDRY_MAX - 1, posi[1]]);
    }
    if(posi[1] < BOUNDRY_MIN){
        update_position(player[cond], [posi[0], BOUNDRY_MIN + 1]);
    }
    if(posi[1] > BOUNDRY_MAX){
        update_position(player[cond], [posi[0], BOUNDRY_MAX - 1]);
    }
    
    
    
    
   if (input_key_down("j") ) {
      // update_position( player, [-inf, -inf] );
       add_vectors(new_position, [0, -5 * movement_dist]);
       update_position(player[cond], new_position);
       if( check_barri(player[cond], barri) ){
            //const helloworld = create_text("Hello\nworld!");
            //update_position(helloworld, [300, 300]);
            if(last_dir === UP) {
                add_vectors(new_position, [0, 10]);
                update_position(player[cond], new_position);
            }
       }
       last_dir = UP;
   }
   
   if (input_key_down("a")) {
        //player = update_position(player, [-inf, -inf]);
        if( gameobjects_overlap(player[cond], barri[0]) ){
            //display(cond);
            if(last_dir === LEFT){
                add_vectors(new_position, [10, 0]);
                update_position(player[cond], new_position);
            }
       }
       else {
           update_position(player[cond], [-inf, -inf]);
            if(cond === player_towards_left){
                cond = player_towards_left2;
            }
            else {
                cond = player_towards_left;
            }
            update_position(player[cond], new_position);
            add_vectors(new_position, [-1 * movement_dist, 0]);
            update_position(player[cond], new_position);
       }
        last_dir = LEFT;
        //display(cond);
        //update_position(player[cond], [-inf, -inf]);
        
   }
   
   if (input_key_down("d")) {
       if( check_barri(player[cond], barri) ){
           if(last_dir === RIGHT){
                add_vectors(new_position, [-1 * 10, 0]);
                update_position(player[cond], new_position);
           }
       }
       else{
            update_position(player[cond], [-inf, -inf]);
            if(cond === player_towards_right){
                cond = player_towards_right2;
            }
            else {
                cond = player_towards_right;
            }
            update_position(player[cond], pre_position);
            add_vectors(new_position, [movement_dist, 0]);
            update_position(player[cond], new_position);
       }
       
       last_dir = RIGHT;
       
   }
   
   if(query_position(player[cond])[0] > 0 && query_position(player[cond])[0] < 550 
        && query_position(player[cond])[1] > 0 && query_position(player[cond])[1] < 550){
            update_position(player[cond], [query_position(player[cond])[0], query_position(player[cond])[1] + g]);
        }
    last_dir = DOWN;//gravity
    
   // Update GameObjects within update_loop(...)wda
   //update_position(player[cond], new_position);
});
build_game();