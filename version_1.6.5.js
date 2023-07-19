import { query_pointer_position, update_text, create_text, gameobjects_overlap, update_scale, create_sprite, create_rectangle, query_position, update_position, update_loop, build_game, input_key_down } from "arcade_2d";

// Create GameObjects outside update_loop(...)
let player1_alive = true;
let player2_alive = true;
const origin_HP = 100;
const JUMP_HEIGHT = -30;
const BARRI_BOUNCE_DIS = 9;
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
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/62abc972249c331bca6e0e98382e6aa0f3a2c67c/player_towars_left2.png"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/punch.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/reverse_punch.png"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/punch2.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/reverse_punch2.jpg"), size_of_player )
                ];
                
const player_towards_right = 0;
const player_towards_right2 = 1;
const player_towards_left  = 2;
const player_towards_left2  = 3;
const punch_right = 4;
const punch_left = 5;
const punch2_right = 6;
const punch2_left = 7;

const barri = [create_rectangle(200, 50), create_rectangle(200, 50)];

const boundry = [create_rectangle(20, 1200), create_rectangle(20, 1200), 
                create_rectangle(1200, 20), create_rectangle(1200, 20)];

update_position(player[player_towards_left] , [-inf, -inf]);
update_position(player[player_towards_left2], [-inf, -inf]);
update_position(player[player_towards_right], [-inf, -inf]);
update_position(player[player_towards_right2], [-inf, -inf]);

update_position(barri[0], [100, 300]);
update_position(barri[1], [500, 430]);

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
const print_hp = create_text(stringify(origin_HP));
const print_point = create_text("0 , 0");
const game_text = create_text("2P game");

update_position(game_text, [240, 25]);
update_position(print_point, [250, 100]);
update_loop(game_state => {
    const new_position = query_position(player[cond]);
    const pre_position = query_position(player[cond]);
    const posi = query_position(player[cond]);
    const point_xy = query_pointer_position();
    let temp = player;
    
    
    
    if ( !player1_alive) {
       update_text(game_text, "Player2 Win !");
       return undefined;
   }
    if(!player2_alive){
        update_text(game_text, "player1 Win !");
        return undefined;
    }
    
    
    
    if(cond === punch_right){
        update_position(player[cond], [-inf, -inf]);
        cond = player_towards_right;
        update_position(player[cond], pre_position);
    }
    if(cond === punch_left){
        update_position(player[cond], [-inf, -inf]);
        cond = player_towards_left;
        update_position(player[cond], pre_position);
    }
    
    //updadte text
    update_text(find_xy, stringify(posi[0]) + "," + stringify(posi[1]));
    update_position(find_xy, [100, 100]);
    
    update_position(print_hp, [400, 100]);
    
    update_text(print_point, stringify(point_xy[0]) + "," + stringify(point_xy[1]));
    
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
        update_position(player[cond], [BOUNDRY_MIN + 35, posi[1]]);
    }
    if(posi[0] > BOUNDRY_MAX){
        update_position(player[cond], [BOUNDRY_MAX - 1  , posi[1]]);
    }
    if(posi[1] < BOUNDRY_MIN){
        update_position(player[cond], [posi[0], BOUNDRY_MIN + 35]);
    }
    if(posi[1] > BOUNDRY_MAX){
        update_position(player[cond], [posi[0], BOUNDRY_MAX - 1 ]);
    }

    
    
    
    
    
   if (input_key_down("j") ) {
       add_vectors(new_position, [0, JUMP_HEIGHT]);
       update_position(player[cond], new_position);
       if( check_barri(player[cond], barri) ){
            if(last_dir === UP) {
                add_vectors(new_position, [0, BARRI_BOUNCE_DIS]);
                update_position(player[cond], new_position);
            }
       }
       last_dir = UP;
   }
   
   if (input_key_down("a")) {
        if( check_barri(player[cond], barri) ){
            if(last_dir === LEFT){
                add_vectors(new_position, [BARRI_BOUNCE_DIS, 0]);
                update_position(player[cond], new_position);
            }
       }
       else {
           update_position(player[cond], [-inf, -inf]);
            if(cond === player_towards_left ){
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
   }
   
   if (input_key_down("d")) {
       if( check_barri(player[cond], barri) ){
           if(last_dir === RIGHT){
                add_vectors(new_position, [-1 * BARRI_BOUNCE_DIS, 0]);
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
   if(input_key_down("k")){
       update_position(player[cond], [-inf, -inf]);
       if(cond === player_towards_right2 || cond === player_towards_right || cond === punch_right || cond === punch2_right){
           //cond = punch_right;
           if( check_barri(player[cond], barri) ){
                if(last_dir === RIGHT){
                    add_vectors(new_position, [-1 * BARRI_BOUNCE_DIS, 0]);
                    update_position(player[cond], new_position);
                }
            }
            else{
                update_position(player[cond], [-inf, -inf]);
                if(cond === punch_right){
                    cond = punch2_right;
                }
                else {
                    cond = punch_right;
                }
                update_position(player[cond], pre_position);
                add_vectors(new_position, [movement_dist, 0]);
                update_position(player[cond], new_position);
            }
            last_dir = RIGHT;
       
       }
       else if(cond === player_towards_left2 || cond === player_towards_left || cond === punch2_left || cond === punch_left ){
           //cond = punch_left;
            if( check_barri(player[cond], barri) ){
                if(last_dir === LEFT){
                    add_vectors(new_position, [BARRI_BOUNCE_DIS, 0]);
                    update_position(player[cond], new_position);
                }
            }
            else {
                update_position(player[cond], [-inf, -inf]);
                if(cond === punch_left){
                    cond = punch2_left;
                }
                else {
                    cond = punch_left;
                }
                update_position(player[cond], new_position);
                add_vectors(new_position, [-1 * movement_dist, 0]);
                update_position(player[cond], new_position);
            }
            last_dir = LEFT;
       }
       
       //update_position(player[cond], pre_position);
   }
   
   if(query_position(player[cond])[0] > 0 && query_position(player[cond])[0] < 550 
        && query_position(player[cond])[1] > 0 && query_position(player[cond])[1] < 550){
            update_position(player[cond], [query_position(player[cond])[0], query_position(player[cond])[1] + g]);
        }
    last_dir = DOWN;//gravity
    
    
    if(origin_HP < 0){
        player1_alive = false;
    }
   // Update GameObjects within update_loop(...)wda
   //update_position(player[cond], new_position);
});
build_game();