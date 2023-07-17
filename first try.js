import { update_scale, create_sprite, create_rectangle, query_position, update_position, update_loop, build_game, input_key_down } from "arcade_2d";

// Create GameObjects outside update_loop(...)
const inf = 999999; 
const background = update_position(create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/Screenshot_20230717_181910_com.huawei.hinote.png"), [300, 300]);

const player_towards_right = update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/Screenshot_20230717_181659_com.huawei.hinote.png"), [0.15, 0.25] );
const player_towards_right2 = update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/7a9ae57ae73cdebd3c49bfe1e5f9232731e0f3a5/player_towars_right2.png"), [0.15, 0.25]);
const player_towards_left  = update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/Screenshot_20230717_195411.png"), [0.15, 0.25] );
const player_towards_left2  = update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/62abc972249c331bca6e0e98382e6aa0f3a2c67c/player_towars_left2.png"), [0.15, 0.25] );
update_position(player_towards_left , [-inf, -inf]);
update_position(player_towards_left2 , [-inf, -inf]);
update_position(player_towards_right, [-inf, -inf]);
update_position(player_towards_right2, [-inf, -inf]);
function make_anim(mov, pos){
    return update_position(mov, pos);
}

let player = make_anim(player_towards_right, [300, 300]);

const movement_dist = 10;

function add_vectors(to, from) {
   to[0] = to[0] + from[0];
   to[1] = to[1] + from[1];
}

update_loop(game_state => {
   const new_position = query_position(player);
    let temp = player;
   if (input_key_down("w")) {
       update_position(temp, [-inf, -inf]);
       add_vectors(new_position, [0, -1 * movement_dist]);
   }
   if (input_key_down("a")) {
       update_position(temp, [-inf, -inf]);
       if( player === player_towards_left){
           player = player_towards_left2;
       }
       else {
           player = player_towards_left;
       }
       add_vectors(new_position, [-1 * movement_dist, 0]);
   }
   if (input_key_down("s")) {
       update_position(temp, [-inf, -inf]);
       add_vectors(new_position, [0, movement_dist]);
   }
   if (input_key_down("d")) {
       update_position(temp, [-inf, -inf]);
       if( player === player_towards_right){
           player = player_towards_right2;
       }
       else {
           player = player_towards_right;
       }
       
       add_vectors(new_position, [movement_dist, 0]);
   }

   // Update GameObjects within update_loop(...)wda
   update_position(player, new_position);
});
build_game();