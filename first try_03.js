import { gameobjects_overlap, update_scale, create_sprite, create_rectangle, query_position, update_position, update_loop, build_game, input_key_down } from "arcade_2d";

// Create GameObjects outside update_loop(...)
const inf = 999999; 
const movement_dist = 10;
const size_of_player = [0.15, 0.25];


const background = update_position(create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/Screenshot_20230717_181910_com.huawei.hinote.png"), [300, 300]);
const player_towards_right = update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/Screenshot_20230717_181659_com.huawei.hinote.png"),  size_of_player);
const player_towards_right2 = update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/7a9ae57ae73cdebd3c49bfe1e5f9232731e0f3a5/player_towars_right2.png"), size_of_player);
const player_towards_left  = update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/Screenshot_20230717_195411.png"), size_of_player );
const player_towards_left2  = update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/62abc972249c331bca6e0e98382e6aa0f3a2c67c/player_towars_left2.png"), size_of_player );
const barri = [create_rectangle(200, 50)];


update_position(player_towards_left , [-inf, -inf]);
update_position(player_towards_left2 , [-inf, -inf]);
update_position(player_towards_right, [-inf, -inf]);
update_position(player_towards_right2, [-inf, -inf]);
update_position(barri[0], [100, 200]);
function make_anim(mov, pos){
    return update_position(mov, pos);
}

let player = make_anim(player_towards_right, [300, 300]);


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


update_loop(game_state => {
    let new_position = query_position(player);
    const pre_position = query_position(player);
    let temp = player;
    
   if (input_key_down("w")) {
       update_position( player, [-inf, -inf] );
       add_vectors(new_position, [0, -1 * movement_dist]);
       update_position(player, new_position);
       //display(check_barri(player, barri));
       if( check_barri(player, barri) ){
            //const helloworld = create_text("Hello\nworld!");
            //update_position(helloworld, [300, 300]);
            new_position = query_position(player);
            add_vectors(new_position, [0, 2 * movement_dist]);
            update_position(player, new_position);
       }
   }
   
   if (input_key_down("a")) {
        player = update_position(player, [-inf, -inf]);
        if( player === player_towards_left){
            player = make_anim(player_towards_left2, query_position(player_towards_left2));
        }
        else {
            player = make_anim(player_towards_left, query_position(player_towards_left));
        }
        player = update_position(player, pre_position);
        add_vectors(new_position, [-1 * movement_dist, 0]);
        player = update_position(player, new_position);
        if( check_barri(player, barri) ){
            new_position = query_position(player);
            add_vectors(new_position, [2 * movement_dist, 0]);
            update_position(player, new_position);
       }
   }
   
    if (input_key_down("s")) {
       update_position(player, [-inf, -inf]);
       add_vectors(new_position, [0, movement_dist]);
       update_position(player, new_position);
       if( check_barri(player, barri) ){
           new_position = query_position(player);
           add_vectors(new_position, [0, -1 * 2 * movement_dist]);
           update_position(player, new_position);
       }
   }
   
   if (input_key_down("d")) {
       update_position(player, [-inf, -inf]);
       if( player === player_towards_right){
            player = player_towards_right2;
        }
        else {
            player = player_towards_right;
        }
        
        add_vectors(new_position, [movement_dist, 0]);
        update_position(player, new_position);
       if( check_barri(player, barri) ){
           new_position = query_position(player);
           add_vectors(new_position, [-1 * 2 * movement_dist, 0]);
           update_position(player, new_position);
       }
   }

   // Update GameObjects within update_loop(...)wda
   update_position(player, new_position);
});
build_game();