import { create_sprite, create_rectangle, query_position, update_position, update_loop, build_game, input_key_down } from "arcade_2d";

// Create GameObjects outside update_loop(...)
const player = update_position(create_sprite("https://raw.githubusercontent.com/photonstorm/phaser3-examples/master/public/assets/animations/cybercity/0.gif"), [300, 300]);
const movement_dist = 10;

function add_vectors(to, from) {
   to[0] = to[0] + from[0];
   to[1] = to[1] + from[1];
}

update_loop(game_state => {
   const new_position = query_position(player);

   if (input_key_down("w")) {
       add_vectors(new_position, [0, -1 * movement_dist]);
   }
   if (input_key_down("a")) {
       add_vectors(new_position, [-1 * movement_dist, 0]);
   }
   if (input_key_down("s")) {
       add_vectors(new_position, [0, movement_dist]);
   }
   if (input_key_down("d")) {
       add_vectors(new_position, [movement_dist, 0]);
   }

   // Update GameObjects within update_loop(...)
   update_position(player, new_position);
});
build_game();