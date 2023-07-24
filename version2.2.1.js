import { update_rotation, query_pointer_position, update_text, create_text, gameobjects_overlap, update_scale, create_sprite, create_rectangle, query_position, update_position, update_loop, build_game, input_key_down } from "arcade_2d";

// Create GameObjects outside update_loop(...)

const SHOT_DIS = 15;
const SHOT_DEHP = 10;
const BULLET_SPEED = 30;

const SWORDS_APPEAR_LENGTH = 10000;
const GUNS_APPEAR_LENGTH = 10000;
let player1_alive = true;
let player2_alive = true;
const origin_HP = 100;
const origin_HP2 = 100;
const defense_origin_HP = 10;


const punched_dis = 30;
const waved_dis = 50;

const PUNCHED_DEHP = 3;
const WAVED_DEHP = 8;
const JUMP_HEIGHT = -30;
const BARRI_BOUNCE_DIS = 30;
const BOUNDRY_MIN = 0;
const BOUNDRY_MAX = 550;
const birth_place = [200, 400];
const birth_place2 = [400, 300];
const g = 5;
const inf = 999999; 
const movement_dist = 10;
const size_of_player = [0.15, 0.25];
const RIGHT = 1;
const LEFT = 0;
const UP = 2;
const DOWN = 3;

const background = update_position(create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/Screenshot_20230717_181910_com.huawei.hinote.png"), [300, 300]);

//const sword = update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/sword_new.jpg"), [0.2, 0.2]);
const swords = [update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/sword_new.jpg"), [0.2, 0.2]),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/sword_new.jpg"), [0.2, 0.2]),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/sword_new.jpg"), [0.2, 0.2]),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/sword_new.jpg"), [0.2, 0.2]),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/sword_new.jpg"), [0.2, 0.2])
                ];

//const gun = update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/gun.jpg"), [0.5, 0.5]);
const guns = [update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/new_gun.png"), [0.1, 0.1]),
            update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/new_gun.png"), [0.1, 0.1]),
            update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/new_gun.png"), [0.1, 0.1]),
            update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/new_gun.png"), [0.1, 0.1])
            ];

const bullets_towards_right1 = [update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/bullet_right.jpg"), [0.5, 0.5]),
                                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/bullet_right.jpg"), [0.5, 0.5]),
                                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/bullet_right.jpg"), [0.5, 0.5]),
                                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/bullet_right.jpg"), [0.5, 0.5]),
                                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/bullet_right.jpg"), [0.5, 0.5]),
                                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/bullet_right.jpg"), [0.5, 0.5])
                                ];
                                
const bullets_towards_right2 = [update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/bullet_right.jpg"), [0.5, 0.5]),
                                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/bullet_right.jpg"), [0.5, 0.5]),
                                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/bullet_right.jpg"), [0.5, 0.5]),
                                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/bullet_right.jpg"), [0.5, 0.5]),
                                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/bullet_right.jpg"), [0.5, 0.5]),
                                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/bullet_right.jpg"), [0.5, 0.5])
                                ];

const bullets_towards_left1 = [ update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/bullet_left.jpg"), [0.5, 0.5]),
                                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/bullet_left.jpg"), [0.5, 0.5]),
                                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/bullet_left.jpg"), [0.5, 0.5]),
                                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/bullet_left.jpg"), [0.5, 0.5]),
                                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/bullet_left.jpg"), [0.5, 0.5]),
                                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/bullet_left.jpg"), [0.5, 0.5])
                                ];
                                
const bullets_towards_left2 = [ update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/bullet_left.jpg"), [0.5, 0.5]),
                                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/bullet_left.jpg"), [0.5, 0.5]),
                                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/bullet_left.jpg"), [0.5, 0.5]),
                                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/bullet_left.jpg"), [0.5, 0.5]),
                                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/bullet_left.jpg"), [0.5, 0.5]),
                                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/bullet_left.jpg"), [0.5, 0.5])
                                ];
//update_position(bullets_towards_right[0], [250, 200]);
const swords_appeartime = [];

const guns_appeartime = [];

const is_sword_appear = [false, false, false, false, false];

const is_gun_appear = [false, false, false, false, false];

const is_bullet1_appear = [false, false, false, false, false, false];
const is_bullet2_appear = [false, false, false, false, false, false];

const bullet1_dire = [];
const bullet2_dire = [];

const player = [update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/Screenshot_20230717_181659_com.huawei.hinote.png"),  size_of_player),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/7a9ae57ae73cdebd3c49bfe1e5f9232731e0f3a5/player_towars_right2.png"), size_of_player),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/Screenshot_20230717_195411.png"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/62abc972249c331bca6e0e98382e6aa0f3a2c67c/player_towars_left2.png"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/punch.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/reverse_punch.png"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/punch2.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/reverse_punch2.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/attacked_left.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/attacked_right.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/sword_right.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/sword_left.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/wave_right.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/wave_left.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/defense_left.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/defense_right.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/sword_right2.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/sword_left2.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/gun_left1.png"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/gun_left2.png"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/gun_right1.png"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/gun_right2.png"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/gun_left_new.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/gun_right_new.jpg"), size_of_player )
                
                ];

const player2 = [update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/Screenshot_20230717_181659_com.huawei.hinote.png"),  size_of_player),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/7a9ae57ae73cdebd3c49bfe1e5f9232731e0f3a5/player_towars_right2.png"), size_of_player),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/Screenshot_20230717_195411.png"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/62abc972249c331bca6e0e98382e6aa0f3a2c67c/player_towars_left2.png"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/punch.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/reverse_punch.png"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/punch2.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/reverse_punch2.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/attacked_left.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/attacked_right.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/sword_right.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/sword_left.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/wave_right.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/wave_left.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/defense_left.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/defense_right.jpg"), size_of_player ),                
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/sword_right2.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/sword_left2.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/gun_left1.png"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/gun_left2.png"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/gun_right1.png"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/gun_right2.png"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/gun_left_new.jpg"), size_of_player ),
                update_scale( create_sprite("https://raw.githubusercontent.com/Sanchez-Jupiter/project_of_SWS/main/gun_right_new.jpg"), size_of_player )                
                ];

                
const player_towards_right = 0;
const player_towards_right2 = 1;
const player_towards_left  = 2;
const player_towards_left2  = 3;
const punch_right = 4;
const punch_left = 5;
const punch2_right = 6;
const punch2_left = 7;
const attacked_left = 8;
const attacked_right = 9;
const sword_right = 10;
const sword_left = 11;
const wave_right = 12;
const wave_left = 13;
const defense_left = 14;
const defense_right = 15;
const sword_right2 = 16;
const sword_left2 = 17;
const gun_left = 18;
const gun_left2 = 19;
const gun_right = 20;
const gun_right2 = 21;
const shoot_left = 22;
const shoot_right = 23;



const barri = [create_rectangle(200, 50), create_rectangle(200, 50)];
const barri_size = [[200, 50], [200, 50]];
const player_size = [[35, 70], [35, 70],  [80, 80]];
const boundry = [create_rectangle(20, 1200), create_rectangle(20, 1200), 
                create_rectangle(1200, 20), create_rectangle(1200, 20)];

update_position(player[player_towards_left] , [-inf, -inf]);
update_position(player[player_towards_left2], [-inf, -inf]);
update_position(player[player_towards_right], [-inf, -inf]);
update_position(player[player_towards_right2], [-inf, -inf]);

update_position(player2[player_towards_left] , [-inf, -inf]);
update_position(player2[player_towards_left2], [-inf, -inf]);
update_position(player2[player_towards_right], [-inf, -inf]);
update_position(player2[player_towards_right2], [-inf, -inf]);

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

function is_towards_right(cond){
    if(cond === player_towards_right2 || cond === player_towards_right
        || cond === punch_right || cond === punch2_right
        || cond === wave_right ||  cond === sword_right
        || cond === attacked_right || cond === defense_right
        || cond === sword_right2 || cond === gun_right
        || cond === gun_right2 || cond === shoot_right
        ){
            return true;
        }
    else {
        return false;
    }
}

function is_borderline(barri, posi, p_index){
    for(let i = 0; i < array_length(barri); i = i + 1){
        const x = query_position(barri[i])[0];
        const y = query_position(barri[i])[1];
        if(posi[0] >= x - (barri_size[i][0] + player_size[p_index][0] )/ 2 
            && posi[0] <= x + (barri_size[i][0] + player_size[p_index][0] )/ 2 
            && math_abs(posi[1] - (y - (barri_size[i][1] + player_size[p_index][1]) / 2)) <= g){
                return true;
            }
    }
    return false;
}
function is_beside_right(barri, posi, p_index){
    for(let i = 0; i < array_length(barri); i = i + 1){
        const x = query_position(barri[i])[0];
        const y = query_position(barri[i])[1];
        if(posi[1] >= y - (barri_size[i][1] + player_size[p_index][1] )/ 2 
            && posi[1] <= y + (barri_size[i][1] + player_size[p_index][1] )/ 2 
            && posi[0] <= x + (barri_size[i][0] + player_size[p_index][0]) / 2){
                return true;
            }
    }
    return false;
}

function is_beside_left(barri, posi, p_index){
    for(let i = 0; i < array_length(barri); i = i + 1){
        const x = query_position(barri[i])[0];
        const y = query_position(barri[i])[1];
        if(posi[1] >= y - (barri_size[i][1] + player_size[p_index][1] )/ 2 
            && posi[1] <= y + (barri_size[i][1] + player_size[p_index][1] )/ 2 
            && posi[0] >= x - (barri_size[i][0] + player_size[p_index][0]) / 2){
                return true;
            }
    }
    return false;
}

function is_armed(p_index){
    if(with_sword[p_index] || with_gun[p_index]){
        return true;
    }
    return false;
}
function random_under_x(x){
    return x * math_random();
}

let cond = player_towards_right;
let cond2 = player_towards_left;

let dir = RIGHT;
let dir2 = LEFT;

let last_dir = -1;
let last_dir2 = -1;

let hp1 = origin_HP;
let hp2 = origin_HP2;

let defense_hp1 = defense_origin_HP;
let defense_hp2 = defense_origin_HP;

make_anim(player[cond], birth_place);
make_anim(player2[cond2], birth_place2);



const with_sword = [false, false];
const with_gun = [false, false];

for(let i = 0; i < array_length(swords); i = i + 1){
    update_position(swords[i], [inf, inf]);
    is_sword_appear[i] = false;
}

for(let i = 0; i < array_length(guns); i = i + 1){
    update_position(guns[i], [inf, inf]);
    is_gun_appear[i] = false;
}
for(let i = 0; i < array_length(bullets_towards_right1); i = i + 1){
    update_position(bullets_towards_right1[i], [inf, inf]);
    update_position(bullets_towards_right2[i], [inf, inf]);
    update_position(bullets_towards_left1[i], [inf, inf]);
    update_position(bullets_towards_left2[i], [inf, inf]);
    is_bullet1_appear[i] = false;
    is_bullet2_appear[i] = false;
}

const find_xy = create_text(stringify(query_position(player[cond])[0]) + "," + stringify(query_position(player[cond])[1]));
const find_xy2 = create_text(stringify(query_position(player2[cond2])[0]) + "," + stringify(query_position(player2[cond2])[1]));

const print_hp = create_text("player1 origin_HP : " + stringify(origin_HP));
const print_hp2 = create_text("player2 origin_HP : " + stringify(origin_HP2));

const print_point = create_text("0 , 0");
const game_text = create_text("Stickman Fight");
const rule_text = create_text("p1 keys:q w e r t y");
const rule_text1 = create_text("p2 keys:, . / 1 2 3");

update_scale(update_position(game_text, [150, 25]), [2, 2]);
update_position(print_point, [250, 55]);
update_position(rule_text, [410, 25]);
update_position(rule_text1, [410, 40]);

let last_time_jump = get_time();

update_loop(game_state => {
    //-----------------------------player1--------------------------------------
    //update_text(game_text, stringify(query_position(bullets_towards_right1[0])[0]) + "," + stringify(query_position(bullets_towards_right1[0])[1]));
    
    //-----------------------------trial----------------------------------------
    //update_text(game_text, stringify(get_time()));
    //--------------------------------------------------------------------------
    
    //----------------------------bullets---------------------------------------
    for(let i = 0; i < array_length(is_bullet1_appear); i = i + 1){
        if(is_bullet1_appear[i]){
            if(bullet1_dire[i] === RIGHT){
                const xbu = query_position(bullets_towards_right1[i])[0];
                const ybu = query_position(bullets_towards_right1[i])[1];
                if(check_barri(bullets_towards_right1[i], barri)){
                    update_position(bullets_towards_right1[i], [inf, inf]);
                    is_bullet1_appear[i] = false;
                }
                else if(xbu < BOUNDRY_MIN || xbu > BOUNDRY_MAX  || ybu < BOUNDRY_MIN  || ybu > BOUNDRY_MAX ){
                    update_position(bullets_towards_right1[i], [inf, inf]);
                    is_bullet1_appear[i] = false;
                }
               else {
               
                   update_position(bullets_towards_right1[i], [xbu + BULLET_SPEED, ybu]);
                }
            }
            else{
                const xbu = query_position(bullets_towards_left1[i])[0];
                const ybu = query_position(bullets_towards_left1[i])[1];
                if(check_barri(bullets_towards_left1[i], barri)){
                    update_position(bullets_towards_left1[i], [inf, inf]);
                    is_bullet1_appear[i] = false;
                }
                else if(xbu < BOUNDRY_MIN || xbu > BOUNDRY_MAX || ybu < BOUNDRY_MIN || ybu > BOUNDRY_MAX ){
                    update_position(bullets_towards_left1[i], [inf, inf]);
                    is_bullet1_appear[i] = false;
                }
                else {
                    update_position(bullets_towards_left1[i], [xbu - BULLET_SPEED, ybu]);
                }
            }
        }
    }
    
    
    
    
    //--------------------------------------------------------------------------
    
    
    
    
    
    
    //---------------------------random falling weapons-------------------------
    
    // swords
    if(get_time() % 500 === 0){
        for(let i = 0; i < array_length(is_sword_appear); i = i + 1){
            if(!is_sword_appear[i]){
                update_position(swords[i], [random_under_x(BOUNDRY_MAX - 10), 0]);
                is_sword_appear[i] = true;
                swords_appeartime[i] = get_time();
                break;
            }
        }
    }
    
    // guns
    if(get_time() % 500 === 0){
        for(let i = 0; i < array_length(is_gun_appear); i = i + 1){
            if(!is_gun_appear[i]){
                update_position(guns[i], [random_under_x(BOUNDRY_MAX - 10), 0]);
                is_gun_appear[i] = true;
                guns_appeartime[i] = get_time();
                break;
            }
        }
    }
    
    //--------------------------------------------------------------------------
    
    //-----------------------------defense recover------------------------------
    if(cond !== defense_right && cond !== defense_left && defense_hp1 < defense_origin_HP){
        defense_hp1 = defense_hp1 + 1;
    }
    
    //--------------------------------------------------------------------------
    
    
    
    //-----------------------------guns-----------------------------------------
    
    
    const present_time_gun = get_time();
    for(let i = 0; i < array_length(guns_appeartime); i = i + 1){
        //swords dispear check
        if(!is_gun_appear[i]){
            continue;
        }
        if(present_time_gun - guns_appeartime[i] > GUNS_APPEAR_LENGTH){
            update_position(guns[i], [inf, inf]);
            is_gun_appear[i] = false;
            continue;
        }
        update_rotation(guns[i], (get_time() % 2 === 1) ? math_PI / 50 : -1 * math_PI / 50);
        //boundry check
        const gun_posi_x = query_position(guns[i])[0];
        const gun_posi_y = query_position(guns[i])[1];
        
        if( gameobjects_overlap(boundry[LEFT], guns[i])){
            update_position(guns[i], [gun_posi_x + 6, gun_posi_y]);
        }
        else if( gameobjects_overlap(boundry[RIGHT], guns[i])){
            update_position(guns[i], [gun_posi_x - 6, gun_posi_y]);
        }
        else if( gameobjects_overlap(boundry[UP], guns[i])){
            update_position(guns[i], [gun_posi_x, gun_posi_y + 6 ]);
        }
        else if( gameobjects_overlap(boundry[DOWN], guns[i])){
            update_position(guns[i], [gun_posi_x, gun_posi_y - 6 ]);
        }
        //gravity
        if(! is_borderline(barri, query_position(guns[i]), 2)){
            if(query_position(guns[i])[0] > 0 && query_position(guns[i])[0] < 550 
            && query_position(guns[i])[1] > 0 && query_position(guns[i])[1] < 550){
                update_position(guns[i], [query_position(guns[i])[0], query_position(guns[i])[1] + g]);
            }
        }
    }
    //
    
    
    //--------------------------------------------------------------------------
    
    //-----------------------------swords---------------------------------------
    
    
    const present_time = get_time();
    for(let i = 0; i < array_length(swords_appeartime); i = i + 1){
        //swords dispear check
        if(!is_sword_appear[i]){
            continue;
        }
        if(present_time - swords_appeartime[i] > SWORDS_APPEAR_LENGTH){
            update_position(swords[i], [inf, inf]);
            is_sword_appear[i] = false;
            continue;
        }
        update_rotation(swords[i], (get_time() % 2 === 1) ? math_PI / 40 : -1 * math_PI / 40);
        //boundry check
        const sword_posi_x = query_position(swords[i])[0];
        const sword_posi_y = query_position(swords[i])[1];
        
        if( gameobjects_overlap(boundry[LEFT], swords[i])){
            update_position(swords[i], [sword_posi_x + 10 * movement_dist, sword_posi_y]);
        }
        else if( gameobjects_overlap(boundry[RIGHT], swords[i])){
            update_position(swords[i], [sword_posi_x - 10 * movement_dist, sword_posi_y]);
        }
        else if( gameobjects_overlap(boundry[UP], swords[i])){
            update_position(swords[i], [sword_posi_x, sword_posi_y + 10 * movement_dist]);
        }
        else if( gameobjects_overlap(boundry[DOWN], swords[i])){
            update_position(swords[i], [sword_posi_x, sword_posi_y - 10 * movement_dist]);
        }
        //gravity
        if(! is_borderline(barri, query_position(swords[i]), 0)){
            if(query_position(swords[i])[0] > 0 && query_position(swords[i])[0] < 550 
            && query_position(swords[i])[1] > 0 && query_position(swords[i])[1] < 550){
                update_position(swords[i], [query_position(swords[i])[0], query_position(swords[i])[1] + g]);
            }
        }
    }
    //
    
    
    //--------------------------------------------------------------------------
    
    
    //----------------------pick up gun check---------------------------------
    if(!is_armed(0)){
        for(let i = 0; i < array_length(guns); i = i + 1){
        if(gameobjects_overlap(guns[i], player[cond])){
            update_position(guns[i], [inf, inf]);
            is_gun_appear[i] = false;
            if(!is_towards_right(cond)){
                const x = query_position(player[cond])[0];
                const y = query_position(player[cond])[1];
                update_position(player[cond], [-inf, -inf]);
                cond = gun_left;
                update_position(player[cond], [x, y]);
                with_gun[0] = true;/////////////////////////////////
            }
            else {
                const x = query_position(player[cond])[0];
                const y = query_position(player[cond])[1];
                update_position(player[cond], [-inf, -inf]);
                cond = gun_right;
                update_position(player[cond], [x, y]);
                with_gun[0] = true;////////////////////////////////
            }
            break;
        }
    }
    }
    
    
    //--------------------------------------------------------------------------
    
    
    
    //----------------------pick up sword check---------------------------------
    if(!is_armed(0)){
        for(let i = 0; i < array_length(swords); i = i + 1){
        if(gameobjects_overlap(swords[i], player[cond])){
            update_position(swords[i], [inf, inf]);
            is_sword_appear[i] = false;
            if(!is_towards_right(cond)){
                const x = query_position(player[cond])[0];
                const y = query_position(player[cond])[1];
                update_position(player[cond], [-inf, -inf]);
                cond = sword_left;
                update_position(player[cond], [x, y]);
                with_sword[0] = true;
            }
            else {
                const x = query_position(player[cond])[0];
                const y = query_position(player[cond])[1];
                update_position(player[cond], [-inf, -inf]);
                cond = sword_right;
                update_position(player[cond], [x, y]);
                with_sword[0] = true;
            }
            break;
        }
    }
    }
    
    
    //--------------------------------------------------------------------------
    
    
    
    
    //-------------after being attacked, no need to be updated------------------
    
    if(cond === attacked_left){
        const x = query_position(player[cond])[0];
        const y = query_position(player[cond])[1];
        update_position(player[cond], [-inf, -inf]);
        cond = player_towards_left;
        update_position(player[cond], [x, y]);
    }
    if(cond === attacked_right){
        const x = query_position(player[cond])[0];
        const y = query_position(player[cond])[1];
        update_position(player[cond], [-inf, -inf]);
        cond = player_towards_right;
        update_position(player[cond], [x, y]);
    }
    //--------------------------------------------------------------------------
    
    
    
    
    //--------being attacked, need to be updated every time we change-----------
    
    // get shot
    
    for(let i = 0; i < array_length(is_bullet1_appear); i = i + 1){
        if(!is_bullet2_appear[i]){
            //update_text(game_text,stringify(i));
            continue;
        }
        else { 
            //update_text(game_text, stringify(gameobjects_overlap(player[cond], bullets_towards_right2[i])));
            if(gameobjects_overlap(player[cond], bullets_towards_right2[i])){
                let flag = false;
                update_position(bullets_towards_right2[i], [inf, inf]);
                is_bullet2_appear[i] = false;
                //update_text(game_text, "SHOT");
                const x = query_position(player[cond])[0] + SHOT_DIS;
                const y = query_position(player[cond])[1];
                if(cond === defense_left){
                    if(defense_hp1 - SHOT_DEHP >= 0){
                        defense_hp1 = defense_hp1 - SHOT_DEHP;
                    }
                    else {
                        hp1 = hp1 + defense_hp1 - SHOT_DEHP;
                        defense_hp1 = 0;
                        flag = true;
                    }
                }
                else {
                    hp1 = hp1 - SHOT_DEHP;
                    if(is_armed(0)){
                        if(with_sword[0]){
                            const x = query_position(player[cond])[0];
                            const y = query_position(player[cond])[1];
                            for(let i = 0; i < array_length(is_sword_appear); i = i + 1){
                                if(!is_sword_appear[i]){
                                    update_position(swords[i], [random_under_x(BOUNDRY_MAX - 10), 0]);
                                    is_sword_appear[i] = true;
                                    swords_appeartime[i] = get_time();
                                    with_sword[0] = false;
                                    break;
                                }
                            }
                        }
                        else if(with_gun[0]){
                            for(let i = 0; i < array_length(is_gun_appear); i = i + 1){
                                if(!is_gun_appear[i]){
                                    update_position(guns[i], [random_under_x(BOUNDRY_MAX - 10), 0]);
                                    is_gun_appear[i] = true;
                                    guns_appeartime[i] = get_time();
                                    with_gun[0] = false;
                                    break;
                                }
                            }
                        }
                    }
                }
            if(!flag){
                    update_position(player[cond], [-inf, -inf]);
                    cond = attacked_left;
                    update_position(player[cond], [x, y]);
                }
                else{
                    update_position(player[cond], [-inf, -inf]);
                    cond = attacked_left;
                    update_position(player[cond], [x + SHOT_DIS, y]);
                }
            }
            if(gameobjects_overlap(player[cond], bullets_towards_left2[i])){
                let flag = false;
                update_position(bullets_towards_left2[i], [inf, inf]);
                is_bullet2_appear[i] = false;
                const x = query_position(player[cond])[0] - SHOT_DIS;
                const y = query_position(player[cond])[1];
                if(cond === defense_right){
                    if(defense_hp1 - SHOT_DEHP >= 0){
                        defense_hp1 = defense_hp1 - SHOT_DEHP;
                    }
                    else {
                        hp1 = hp1 + defense_hp1 - SHOT_DEHP;
                        defense_hp1 = 0;
                        flag = true;
                    }
                }
                else {
                    hp1 = hp1 - SHOT_DEHP;
                    if(is_armed(0)){
                        if(with_sword[0]){
                            for(let i = 0; i < array_length(is_sword_appear); i = i + 1){
                                if(!is_sword_appear[i]){
                                    update_position(swords[i], [random_under_x(BOUNDRY_MAX - 10), 0]);
                                    is_sword_appear[i] = true;
                                    swords_appeartime[i] = get_time();
                                    with_sword[0] = false;
                                    break;
                                }
                            }
                        }
                        else if(with_gun[0]){
                            for(let i = 0; i < array_length(is_gun_appear); i = i + 1){
                                if(!is_gun_appear[i]){
                                    update_position(guns[i], [random_under_x(BOUNDRY_MAX - 10), 0]);
                                    is_gun_appear[i] = true;
                                    with_gun[0] = false;
                                    break;
                                }
                            }
                        }
                    }
                }
                if(!flag){
                    update_position(player[cond], [-inf, -inf]);
                    cond = attacked_right;
                    update_position(player[cond], [x, y]);
                }
                else{
                    update_position(player[cond], [-inf, -inf]);
                    cond = attacked_right;
                    update_position(player[cond], [x - SHOT_DIS, y]);
                }
            }
        }
    }
    
    //sword-ed
    
    if(gameobjects_overlap(player[cond], player2[cond2])){
        if((cond2 === punch2_left || cond2 === punch_left)
        && query_position(player[cond])[0] < query_position(player2[cond2])[0]
        && math_abs(query_position(player2[cond2])[0] - query_position(player[cond])[0]) < 32
        && math_abs(query_position(player[cond])[1] - query_position(player2[cond2])[1]) < 30
        ){
            let flag = false;
            const x = query_position(player[cond])[0] - punched_dis;
            const y = query_position(player[cond])[1];
            if(cond === defense_right){
                if(defense_hp1 - PUNCHED_DEHP >= 0){
                    defense_hp1 = defense_hp1 - PUNCHED_DEHP;
                }
                else {
                    hp1 = hp1 + defense_hp1 - PUNCHED_DEHP;
                    defense_hp1 = 0;
                    flag = true;
                }
            }
           else {
               hp1 = hp1 - PUNCHED_DEHP;
               if(is_armed(0)){
                   if(with_sword[0]){
                        for(let i = 0; i < array_length(is_sword_appear); i = i + 1){
                            if(!is_sword_appear[i]){
                                update_position(swords[i], [random_under_x(BOUNDRY_MAX - 10), 0]);
                                is_sword_appear[i] = true;
                                swords_appeartime[i] = get_time();
                                with_sword[0] = false;
                                break;
                            }
                        }
                    }
               }
                if(!flag){
                    update_position(player[cond], [-inf, -inf]);
                    cond = attacked_right;
                    update_position(player[cond], [x, y]);
                }
                else{
                    update_position(player[cond], [-inf, -inf]);
                cond = attacked_right;
                update_position(player[cond], [x - punched_dis, y]);
                }
           }
        }    
        else if((cond2 === punch2_right || cond2 === punch_right)
            && query_position(player[cond])[0] > query_position(player2[cond2])[0]
            && math_abs(query_position(player2[cond2])[0] - query_position(player[cond])[0]) < 32
            && math_abs(query_position(player[cond])[1] - query_position(player2[cond2])[1]) < 30
            ){
                let flag = false;
                const x = query_position(player[cond])[0] + punched_dis;
                const y = query_position(player[cond])[1];
                if(cond === defense_left){
                    if(defense_hp1 - PUNCHED_DEHP >= 0){
                        defense_hp1 = defense_hp1 - PUNCHED_DEHP;
                    }
                    else {
                        hp1 = hp1 + defense_hp1 - PUNCHED_DEHP;
                        defense_hp1 = 0;
                        flag = true;
                    }
                }
                else {
                    hp1 = hp1 - PUNCHED_DEHP;
                    if(is_armed(0)){
                        if(with_sword[0]){
                            for(let i = 0; i < array_length(is_sword_appear); i = i + 1){
                                if(!is_sword_appear[i]){
                                    update_position(swords[i], [random_under_x(BOUNDRY_MAX - 10), 0]);
                                    is_sword_appear[i] = true;
                                    swords_appeartime[i] = get_time();
                                    with_sword[0] = false;
                                    break;
                                }
                            }
                        }
                    }
                }
                if(!flag){
                    update_position(player[cond], [-inf, -inf]);
                    cond = attacked_right;
                    update_position(player[cond], [x, y]);
                }
                else{
                    update_position(player[cond], [-inf, -inf]);
                    cond = attacked_right;
                    update_position(player[cond], [x + punched_dis, y]);
                }
        }
        else if( (cond2 === wave_left )
            && query_position(player[cond])[0] < query_position(player2[cond2])[0]
            && math_abs(query_position(player2[cond2])[0] - query_position(player[cond])[0]) < 38
            && math_abs(query_position(player[cond])[1] - query_position(player2[cond2])[1]) < 30
            ){
                let flag = false;
                const x = query_position(player[cond])[0] - waved_dis;
                const y = query_position(player[cond])[1];
                if(cond === defense_right){
                    if(defense_hp1 - WAVED_DEHP >= 0){
                        defense_hp1 = defense_hp1 - WAVED_DEHP;
                    }
                    else {
                        hp1 = hp1 + defense_hp1 - WAVED_DEHP;
                        defense_hp1 = 0;
                        flag = true;
                    }
                }
                else {
                    hp1 = hp1 - WAVED_DEHP;
                    if(is_armed(0)){
                        if(with_sword[0]){
                            for(let i = 0; i < array_length(is_sword_appear); i = i + 1){
                                if(!is_sword_appear[i]){
                                    update_position(swords[i], [random_under_x(BOUNDRY_MAX - 10), 0]);
                                    is_sword_appear[i] = true;
                                    swords_appeartime[i] = get_time();
                                    with_sword[0] = false;
                                    break;
                                }
                            }
                        }
                    }
                }
                if(!flag){
                    update_position(player[cond], [-inf, -inf]);
                    cond = attacked_right;
                    update_position(player[cond], [x, y]);
                }
                else{
                    update_position(player[cond], [-inf, -inf]);
                    cond = attacked_right;
                    update_position(player[cond], [x - waved_dis, y]);
                }
        }
        else if((cond2 === wave_right)
            && query_position(player[cond])[0] > query_position(player2[cond2])[0]
            && math_abs(query_position(player2[cond2])[0] - query_position(player[cond])[0]) < 38
            && math_abs(query_position(player[cond])[1] - query_position(player2[cond2])[1]) < 30
            ){
                let flag = false;
                const x = query_position(player[cond])[0] + waved_dis;
                const y = query_position(player[cond])[1];
                if(cond === defense_left){
                    if(defense_hp1 - WAVED_DEHP >= 0){
                        defense_hp1 = defense_hp1 - WAVED_DEHP;
                    }
                    else {
                        hp1 = hp1 + defense_hp1 - WAVED_DEHP;
                        defense_hp1 = 0;
                        flag = true;
                    }
                }
                else {
                    hp1 = hp1 - WAVED_DEHP;
                    if(is_armed(0)){
                        if(with_sword[0]){
                            for(let i = 0; i < array_length(is_sword_appear); i = i + 1){
                                if(!is_sword_appear[i]){
                                    update_position(swords[i], [random_under_x(BOUNDRY_MAX - 10), 0]);
                                    is_sword_appear[i] = true;
                                    swords_appeartime[i] = get_time();
                                    with_sword[0] = false;
                                    break;
                                }
                            }
                        }
                    }
                }
                if(!flag){
                    update_position(player[cond], [-inf, -inf]);
                    cond = attacked_right;
                    update_position(player[cond], [x, y]);
                }
                else{
                    update_position(player[cond], [-inf, -inf]);
                    cond = attacked_right;
                    update_position(player[cond], [x + waved_dis, y]);
                }
        }
    }
    
    //--------------------------------------------------------------------------
    
    //---------------------------after defense----------------------------------
    
    if(cond === defense_left){
        const x = query_position(player[cond])[0];
        const y = query_position(player[cond])[1];
        update_position(player[cond], [-inf, -inf]);
        if(with_sword[0]){
            cond = sword_left;
        }
        else {
            cond = player_towards_left;
        }
        update_position(player[cond], [x, y]);
    }
    if(cond === defense_right){
        const x = query_position(player[cond])[0];
        const y = query_position(player[cond])[1];
        update_position(player[cond], [-inf, -inf]);
        if(with_sword[0]){
            cond = sword_right;
        }
        else {
            cond = player_towards_right;
        }
        update_position(player[cond], [x, y]);
    }
    
    //--------------------------------------------------------------------------
    
    const new_position = query_position(player[cond]);
    const pre_position = query_position(player[cond]);
    const posi = query_position(player[cond]);
    
    const point_xy = query_pointer_position();
    
    let temp = player;//seems useless
    
    //---------------------judge the end of one game----------------------------
    
    if ( !player1_alive) {
       update_text(game_text, "Player2 Win !");
       return undefined;
    }
    if( !player2_alive){
        update_text(game_text, "Player1 Win !");
        return undefined;
    }
    
    //--------------------------------------------------------------------------
    
    
    
    
    //----------------------------after punch-----------------------------------
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
    
    //--------------------------------------------------------------------------
    
    //--------------------------after wave--------------------------------------
    if(with_sword[0]){
        if(cond === wave_right){
            update_position(player[cond], [-inf, -inf]);
            cond = sword_right;
            update_position(player[cond], pre_position);
        }
        if(cond === wave_left){
            update_position(player[cond], [-inf, -inf]);
            cond = sword_left;
            update_position(player[cond], pre_position);
        }
    }
    //--------------------------------------------------------------------------
    
    //--------------------------after shoot--------------------------------------
    if(with_gun[0]){
        if(cond === shoot_right){
            update_position(player[cond], [-inf, -inf]);
            cond = gun_right;
            update_position(player[cond], pre_position);
        }
        if(cond === shoot_left){
            update_position(player[cond], [-inf, -inf]);
            cond = gun_left;
            update_position(player[cond], pre_position);
        }
    }
    //--------------------------------------------------------------------------
    
    
    
    //--------------------------updadte text------------------------------------
    
    update_text(find_xy, "player1 at: " + stringify(posi[0]) + "," + stringify(posi[1]));
    update_position(find_xy, [120, 90]);
    
    update_text(print_hp, "HP of player1 : " + stringify(hp1));
    update_position(print_hp, [420, 90]);
    
    update_text(print_point, "position of pointer : " + stringify(point_xy[0]) + "," + stringify(point_xy[1]));
    
    //--------------------------------------------------------------------------
    
    
    
    //--------------------------boudry check------------------------------------
    
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
    
    //--------------------------------------------------------------------------
    
    
    //--------------------------barrier check-----------------------------------
    /*
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
    */
    //--------------------------------------------------------------------------
    
    
    //-------------------drag back those who are out of rage--------------------
    
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

    //--------------------------------------------------------------------------
    
    
    
    
    //-----------------------------jump-----------------------------------------
   
   if (input_key_down("t") ) { // && get_time() - last_time_jump > 60 （another version）
       if( check_barri(player[cond], barri) &&(!is_borderline(barri, query_position(player[cond]), 0))){
            add_vectors(new_position, [0, BARRI_BOUNCE_DIS]);
            update_position(player[cond], new_position);
       }
       add_vectors(new_position, [0, JUMP_HEIGHT]);
       update_position(player[cond], new_position);
       //last_time_jump = get_time();
       last_dir = UP;
   }
   
   //---------------------------------------------------------------------------
   
   
   //-----------------------------move left-------------------------------------
   
   else if (input_key_down("q") && cond !== defense_right && cond !== defense_left) {
        if(check_barri(player[cond], barri)){
            if(is_beside_right(barri, query_position(player[cond]), 0) && (!is_borderline(barri, query_position(player[cond]), 0))){
                add_vectors(new_position, [BARRI_BOUNCE_DIS, 0]);
                update_position(player[cond], new_position);
            }
       }
       else {
           update_position(player[cond], [-inf, -inf]);
           if(is_armed(0)){
                if(with_sword[0]){
                    if(cond === sword_left ){
                        cond = player_towards_left;
                    }
                    else {
                        cond = sword_left;
                    }
                }
                else if(with_gun[0]){
                    if(cond === gun_left ){
                        cond = gun_left2;
                    }
                    else {
                        cond = gun_left;
                    }
                }
           }
            else {
                if(cond === player_towards_left ){
                    cond = player_towards_left2;
                }
                else {
                    cond = player_towards_left;
                }
            }
            update_position(player[cond], new_position);
            add_vectors(new_position, [-1 * movement_dist, 0]);
            update_position(player[cond], new_position);
       }
        last_dir = LEFT;
   }
   
   //---------------------------------------------------------------------------
   
   
   //--------------------------------move right---------------------------------
   
   else if (input_key_down("e") && cond !== defense_right && cond !== defense_left) {
       if(check_barri(player[cond], barri)){
            if(is_beside_left(barri, query_position(player[cond]), 0) && (!is_borderline(barri, query_position(player[cond]), 0))){
                add_vectors(new_position, [-BARRI_BOUNCE_DIS, 0]);
                update_position(player[cond], new_position);
            }
       }
       else{
            update_position(player[cond], [-inf, -inf]);
            if(is_armed(0)){
                if(with_sword[0]){
                    if(cond === sword_right ){
                        cond = player_towards_right;
                    }
                    else {
                        cond = sword_right;
                    }
                }
                else if(with_gun[0]){
                    if(cond === gun_right ){
                        cond = gun_right2;
                    }
                    else {
                        cond = gun_right;
                    }
                }
            }
            else {
                if(cond === player_towards_right ){
                    cond = player_towards_right2;
                }
                else {
                    cond = player_towards_right;
                }
            }
            update_position(player[cond], pre_position);
            add_vectors(new_position, [movement_dist, 0]);
            update_position(player[cond], new_position);
       }
       
       last_dir = RIGHT;
       
   }
   
   //---------------------------------------------------------------------------
   
   //-----------------------------to attack-------------------------------------
   
   else if(input_key_down("r") && cond !== defense_right && cond !== defense_left){
       if(is_towards_right(cond)){
           //cond = punch_right;
           if(check_barri(player[cond], barri)){
                if(is_beside_left(barri, query_position(player[cond]), 0) && (!is_borderline(barri, query_position(player[cond]), 0))){
                    add_vectors(new_position, [-BARRI_BOUNCE_DIS, 0]);
                    update_position(player[cond], new_position);
                }
            }
            else{
                if(with_sword[0]){
                    if(cond === wave_right){
                        update_position(player[cond], [-inf, -inf]);
                        cond = sword_right;
                    }
                    else {
                        update_position(player[cond], [-inf, -inf]);
                        cond = wave_right;
                    }
                }
                else if(with_gun[0]){
                    const x = query_position(player[cond])[0];
                    const y = query_position(player[cond])[1];
                    for(let i = 0; i < array_length(is_bullet1_appear); i = i + 1){
                        if(!is_bullet1_appear[i]){
                            is_bullet1_appear[i] = true;
                            bullet1_dire[i] = RIGHT;
                            update_position(bullets_towards_right1[i], [x + 100, y]);
                            break;
                        }
                    }
                    update_position(player[cond], [-inf, -inf]);
                    cond = shoot_right;
                }
                else {
                    if(cond === punch_right){
                        update_position(player[cond], [-inf, -inf]);
                        cond = punch2_right;
                    }
                    else {
                        update_position(player[cond], [-inf, -inf]);
                        cond = punch_right;
                    }
                }
                
                update_position(player[cond], pre_position);
            /*    add_vectors(new_position, [movement_dist, 0]);
                update_position(player[cond], new_position);
            */
            }
            last_dir = RIGHT;
       
       }
       else {
            if(check_barri(player[cond], barri)){
                if(is_beside_right(barri, query_position(player[cond]), 0) && (!is_borderline(barri, query_position(player[cond]), 0))){
                    add_vectors(new_position, [BARRI_BOUNCE_DIS, 0]);
                    update_position(player[cond], new_position);
                }
            }
            else {
                if(with_sword[0]){
                    if(cond === wave_left){
                        update_position(player[cond], [-inf, -inf]);
                        cond = sword_left;
                    }
                    else {
                        update_position(player[cond], [-inf, -inf]);
                        cond = wave_left;
                    }
                }
                else if(with_gun[0]){
                    const x = query_position(player[cond])[0];
                    const y = query_position(player[cond])[1];
                    for(let i = 0; i < array_length(bullets_towards_left1); i = i + 1){
                        if(!is_bullet1_appear[i]){
                            is_bullet1_appear[i] = true;
                            bullet1_dire[i] = LEFT;
                            update_position(bullets_towards_left1[i], [x -100, y ]);
                            break;
                        }
                    }
                    update_position(player[cond], [-inf, -inf]);
                    cond = shoot_left;
                }
                else {
                    if(cond === punch_left){
                        update_position(player[cond], [-inf, -inf]);
                        cond = punch2_left;
                    }
                    else {
                        update_position(player[cond], [-inf, -inf]);
                        cond = punch_left;
                    }
                }
                update_position(player[cond], new_position);
            /*    add_vectors(new_position, [-1 * movement_dist, 0]);
                update_position(player[cond], new_position);
            */
            }
            last_dir = LEFT;
       }
       
       //update_position(player[cond], pre_position);
   }
   
   //---------------------------------------------------------------------------
   
   //-----------------------------to defense------------------------------------
   
   else if(defense_hp1 > 0 && input_key_down("w")){
       if(is_towards_right(cond)){
           //cond = punch_right;
            if(check_barri(player[cond], barri)){
                if(is_beside_left(barri, query_position(player[cond]), 0) && (!is_borderline(barri, query_position(player[cond]), 0))){
                    add_vectors(new_position, [-BARRI_BOUNCE_DIS, 0]);
                    update_position(player[cond], new_position);
                }
            }
            else{
                update_position(player[cond], [-inf, -inf]);
                cond = defense_right;
                update_position(player[cond], pre_position);
                add_vectors(new_position, [0, 0]);
                update_position(player[cond], new_position);
            }
            last_dir = RIGHT;
       
       }
       else {
           //cond = punch_left;
            if(check_barri(player[cond], barri)){
                if(is_beside_right(barri, query_position(player[cond]), 0) && (!is_borderline(barri, query_position(player[cond]), 0))){
                    add_vectors(new_position, [BARRI_BOUNCE_DIS, 0]);
                    update_position(player[cond], new_position);
                }
            }
            else {
                update_position(player[cond], [-inf, -inf]);
                cond = defense_left;
                update_position(player[cond], new_position);
                add_vectors(new_position, [0, 0]);
                update_position(player[cond], new_position);
            }
            last_dir = LEFT;
       }
       
       //update_position(player[cond], pre_position);
   }
   //------------------------------ditch weapon---------------------------------
   
   else if(input_key_down("y")){
       if(is_armed(0)){
            if(with_sword[0]){
                const x = query_position(player[cond])[0];
                const y = query_position(player[cond])[1];
                    for(let i = 0; i < array_length(is_sword_appear); i = i + 1){
                        if(!is_sword_appear[i]){
                            update_position(swords[i], [random_under_x(BOUNDRY_MAX - 10), 0]);
                            is_sword_appear[i] = true;
                            swords_appeartime[i] = get_time();
                            with_sword[0] = false;
                            update_position(player[cond], [-inf, -inf]);
                            if(is_towards_right(cond)){
                                cond = player_towards_right;
                            }
                            else {
                                cond = player_towards_left;
                            }
                            update_position(player[cond], [x, y]);
                            break;
                        }
                }
            }
            if(with_gun[0]){
                const x = query_position(player[cond])[0];
                const y = query_position(player[cond])[1];
                    for(let i = 0; i < array_length(is_gun_appear); i = i + 1){
                        if(!is_gun_appear[i]){
                            update_position(guns[i], [random_under_x(BOUNDRY_MAX - 10), 0]);
                            is_gun_appear[i] = true;
                            guns_appeartime[i] = get_time();
                            with_gun[0] = false;
                            update_position(player[cond], [-inf, -inf]);
                            if(is_towards_right(cond)){
                                cond = player_towards_right;
                            }
                            else {
                                cond = player_towards_left;
                            }
                            update_position(player[cond], [x, y]);
                            break;
                        }
                }
            }
        }
   }
   
   //---------------------------------------------------------------------------
   
   //------------------------------gravity--------------------------------------
   if(! is_borderline(barri, query_position(player[cond]), 0)){
       if(query_position(player[cond])[0] > 0 && query_position(player[cond])[0] < 550 
        && query_position(player[cond])[1] > 0 && query_position(player[cond])[1] < 550){
            update_position(player[cond], [query_position(player[cond])[0], query_position(player[cond])[1] + g]);
        }
        last_dir = DOWN;
   }
   
    
    //--------------------------------------------------------------------------
    
    //HP check
    if(hp1 <= 0){
        player1_alive = false;
    }
    
    
    //-----------------------------player2--------------------------------------



    //----------------------------bullets_2-------------------------------------
    for(let i = 0; i < array_length(is_bullet2_appear); i = i + 1){
        if(is_bullet2_appear[i]){
            if(bullet2_dire[i] === RIGHT){
                const xbu = query_position(bullets_towards_right2[i])[0];
                const ybu = query_position(bullets_towards_right2[i])[1];
                if(check_barri(bullets_towards_right2[i], barri)){
                    update_position(bullets_towards_right2[i], [inf, inf]);
                    is_bullet2_appear[i] = false;
                }
                else if(xbu < BOUNDRY_MIN || xbu > BOUNDRY_MAX  || ybu < BOUNDRY_MIN  || ybu > BOUNDRY_MAX ){
                    update_position(bullets_towards_right2[i], [inf, inf]);
                    is_bullet2_appear[i] = false;
                }
               else {
                   update_position(bullets_towards_right2[i], [xbu + BULLET_SPEED, ybu]);
                }
            }
            else{
                const xbu = query_position(bullets_towards_left2[i])[0];
                const ybu = query_position(bullets_towards_left2[i])[1];
                if(check_barri(bullets_towards_left2[i], barri)){
                    update_position(bullets_towards_left2[i], [inf, inf]);
                    is_bullet2_appear[i] = false;
                }
                else if(xbu < BOUNDRY_MIN || xbu > BOUNDRY_MAX || ybu < BOUNDRY_MIN || ybu > BOUNDRY_MAX ){
                    update_position(bullets_towards_left2[i], [inf, inf]);
                    is_bullet2_appear[i] = false;
                }
                else {
                    update_position(bullets_towards_left2[i], [xbu - BULLET_SPEED, ybu]);
                }
            }
        }
    }

    
    //-----------------------------defense recover------------------------------
    if(cond2 !== defense_right && cond2 !== defense_left && defense_hp1 < defense_origin_HP){
        defense_hp2 = defense_hp2 + 1;
    }
    //--------------------------------------------------------------------------
    
    
    //----------------------pick up gun check---------------------------------
    if(!is_armed(1)){
        for(let i = 0; i < array_length(guns); i = i + 1){
        if(gameobjects_overlap(guns[i], player2[cond2])){
            update_position(guns[i], [inf, inf]);
            is_gun_appear[i] = false;
            if(!is_towards_right(cond2)){
                const x = query_position(player2[cond2])[0];
                const y = query_position(player2[cond2])[1];
                update_position(player2[cond2], [-inf, -inf]);
                cond2 = gun_left;
                update_position(player2[cond2], [x, y]);
                with_gun[1] = true;
            }
            else {
                const x = query_position(player2[cond2])[0];
                const y = query_position(player2[cond2])[1];
                update_position(player2[cond2], [-inf, -inf]);
                cond2 = gun_right;
                update_position(player2[cond2], [x, y]);
                with_gun[1] = true;
            }
            break;
        }
    }
    }
    
    
    //--------------------------------------------------------------------------
    
    
    
    //----------------------pick up sword check---------------------------------
    if(!is_armed(1)){
        for(let i = 0; i < array_length(swords); i = i + 1){
        if(gameobjects_overlap(swords[i], player2[cond2])){
            update_position(swords[i], [inf, inf]);
            is_sword_appear[i] = false;
            if(!is_towards_right(cond2)){
                const x = query_position(player2[cond2])[0];
                const y = query_position(player2[cond2])[1];
                update_position(player2[cond2], [-inf, -inf]);
                cond2 = sword_left;
                update_position(player2[cond2], [x, y]);
                with_sword[1] = true;
            }
            else {
                const x = query_position(player2[cond2])[0];
                const y = query_position(player2[cond2])[1];
                update_position(player2[cond2], [-inf, -inf]);
                cond2 = sword_right;
                update_position(player[cond], [x, y]);
                with_sword[1] = true;
            }
            break;
        }
    }
}
    
    
    //--------------------------------------------------------------------------
    
    
    
    
    //-------------after being attacked, no need to be updated------------------
    
    if(cond2 === attacked_left){
        const x = query_position(player2[cond2])[0];
        const y = query_position(player2[cond2])[1];
        update_position(player2[cond2], [-inf, -inf]);
        cond2 = player_towards_left;
        update_position(player2[cond2], [x, y]);
    }
    if(cond2 === attacked_right){
        const x = query_position(player2[cond2])[0];
        const y = query_position(player2[cond2])[1];
        update_position(player2[cond2], [-inf, -inf]);
        cond2 = player_towards_right;
        update_position(player2[cond2], [x, y]);
    }
    //--------------------------------------------------------------------------
    
    
    //--------being attacked, need to be updated every time we change-----------
    
    // get shot
    
    for(let i = 0; i < array_length(is_bullet2_appear); i = i + 1){
        if(!is_bullet1_appear[i]){
            continue;
        }
        else { 
            if(gameobjects_overlap(player2[cond2], bullets_towards_right1[i])){
                let flag = false;
                update_position(bullets_towards_right1[i], [inf, inf]);
                is_bullet1_appear[i] = false;
                const x = query_position(player2[cond2])[0] + SHOT_DIS;
                const y = query_position(player2[cond2])[1];
                if(cond2 === defense_left){
                    if(defense_hp2 - SHOT_DEHP >= 0){
                        defense_hp2 = defense_hp2 - SHOT_DEHP;
                    }
                    else {
                        hp2 = hp2 + defense_hp2 - SHOT_DEHP;
                        defense_hp2 = 0;
                        flag = true;
                    }
                }
                else {
                    hp2 = hp2 - SHOT_DEHP;
                    if(is_armed(1)){
                        if(with_sword[1]){
                            const x = query_position(player2[cond2])[0];
                            const y = query_position(player2[cond2])[1];
                            for(let i = 0; i < array_length(is_sword_appear); i = i + 1){
                                if(!is_sword_appear[i]){
                                    update_position(swords[i], [random_under_x(BOUNDRY_MAX - 10), 0]);
                                    is_sword_appear[i] = true;
                                    swords_appeartime[i] = get_time();
                                    with_sword[1] = false;
                                    break;
                                }
                            }
                        }
                        else if(with_gun[1]){
                            for(let i = 0; i < array_length(is_gun_appear); i = i + 1){
                                if(!is_gun_appear[i]){
                                    update_position(guns[i], [random_under_x(BOUNDRY_MAX - 10), 0]);
                                    is_gun_appear[i] = true;
                                    guns_appeartime[i] = get_time();
                                    with_gun[1] = false;
                                    break;
                                }
                            }
                        }
                    }
                }
                if(!flag){
                    update_position(player2[cond2], [-inf, -inf]);
                    cond2 = attacked_left;
                    update_position(player2[cond2], [x, y]);
                }
                else{
                    update_position(player2[cond2], [-inf, -inf]);
                    cond2 = attacked_left;
                    update_position(player2[cond2], [x + SHOT_DIS, y]);
                }
                
            }
            if(gameobjects_overlap(player2[cond2], bullets_towards_left1[i])){
                let flag = false;
                update_position(bullets_towards_left1[i], [inf, inf]);
                is_bullet1_appear[i] = false;
                const x = query_position(player2[cond2])[0] - SHOT_DIS;
                const y = query_position(player2[cond2])[1];
                if(cond2 === defense_right){
                    if(defense_hp2 - SHOT_DEHP >= 0){
                        defense_hp2 = defense_hp2 - SHOT_DEHP;
                    }
                    else {
                        hp2 = hp2 + defense_hp2 - SHOT_DEHP;
                        defense_hp2 = 0;
                        flag = true;
                    }
                }
                else {
                    hp2 = hp2 - SHOT_DEHP;
                    if(is_armed(1)){
                        if(with_sword[1]){
                            for(let i = 0; i < array_length(is_sword_appear); i = i + 1){
                                if(!is_sword_appear[i]){
                                    update_position(swords[i], [random_under_x(BOUNDRY_MAX - 10), 0]);
                                    is_sword_appear[i] = true;
                                    swords_appeartime[i] = get_time();
                                    with_sword[1] = false;
                                    break;
                                }
                            }
                        }
                        else if(with_gun[1]){
                            for(let i = 0; i < array_length(is_gun_appear); i = i + 1){
                                if(!is_gun_appear[i]){
                                    update_position(guns[i], [random_under_x(BOUNDRY_MAX - 10), 0]);
                                    is_gun_appear[i] = true;
                                    with_gun[1] = false;
                                    break;
                                }
                            }
                        }
                    }
                }
                if(!flag){
                    update_position(player2[cond2], [-inf, -inf]);
                    cond2 = attacked_left;
                    update_position(player2[cond2], [x, y]);
                }
                else{
                    update_position(player2[cond2], [-inf, -inf]);
                    cond2 = attacked_left;
                    update_position(player2[cond2], [x - SHOT_DIS, y]);
                }
            }
        }
    }
    
    //sword_ed
    
    if(gameobjects_overlap(player2[cond2], player[cond])){
        if((cond === punch2_left || cond === punch_left)
        && query_position(player2[cond2])[0] < query_position(player[cond])[0]
        && math_abs(query_position(player2[cond2])[0] - query_position(player[cond])[0]) < 32
        && math_abs(query_position(player2[cond2])[1] - query_position(player[cond])[1]) < 30
        ){
            let flag = false;
            const x = query_position(player2[cond2])[0] - punched_dis;
            const y = query_position(player2[cond2])[1];
            if(cond2 === defense_right){
                if(defense_hp2 - PUNCHED_DEHP >= 0){
                    defense_hp2 = defense_hp2 - PUNCHED_DEHP;
                }
                else {
                    hp2 = hp2 + defense_hp2 - PUNCHED_DEHP;
                    defense_hp2 = 0;
                    flag = true;
                }
            }
           else {
               hp2 = hp2 - PUNCHED_DEHP;
               if(is_armed(1)){
                   if(with_sword[1]){
                        for(let i = 0; i < array_length(is_sword_appear); i = i + 1){
                            if(!is_sword_appear[i]){
                                update_position(swords[i], [random_under_x(BOUNDRY_MAX - 10), 0]);
                                is_sword_appear[i] = true;
                                swords_appeartime[i] = get_time();
                                with_sword[1] = false;
                                break;
                            }
                        }
                    }
               }
               if(!flag){
                    update_position(player2[cond2], [-inf, -inf]);
                    cond2 = attacked_left;
                    update_position(player2[cond2], [x, y]);
               }
               else{
                    update_position(player2[cond2], [-inf, -inf]);
                    cond2 = attacked_left;
                    update_position(player2[cond2], [x - punched_dis, y]);
               }
           }
        }    
        else if((cond === punch2_right || cond === punch_right)
            && query_position(player2[cond2])[0] > query_position(player[cond])[0]
            && math_abs(query_position(player2[cond2])[0] - query_position(player[cond])[0]) < 32
            && math_abs(query_position(player2[cond2])[1] - query_position(player[cond])[1]) < 30
            ){
                let flag = false;
                const x = query_position(player2[cond2])[0] + punched_dis;
                const y = query_position(player2[cond2])[1];
                if(cond2 === defense_left){
                    if(defense_hp2 - PUNCHED_DEHP >= 0){
                        defense_hp2 = defense_hp2 - PUNCHED_DEHP;
                    }
                    else {
                        hp2 = hp2 + defense_hp2 - PUNCHED_DEHP;
                        defense_hp2 = 0;
                        flag = true;
                    }
                }
                else {
                    hp2 = hp2 - PUNCHED_DEHP;
                    if(is_armed(1)){
                        if(with_sword[1]){
                            for(let i = 0; i < array_length(is_sword_appear); i = i + 1){
                                if(!is_sword_appear[i]){
                                    update_position(swords[i], [random_under_x(BOUNDRY_MAX - 10), 0]);
                                    is_sword_appear[i] = true;
                                    swords_appeartime[i] = get_time();
                                    with_sword[1] = false;
                                    break;
                                }
                            }
                        }
                    }
                }
                if(!flag){
                    update_position(player2[cond2], [-inf, -inf]);
                    cond2 = attacked_left;
                    update_position(player2[cond2], [x, y]);
                }
                else{
                    update_position(player2[cond2], [-inf, -inf]);
                    cond2 = attacked_left;
                    update_position(player2[cond2], [x + punched_dis, y]);
                }
        }
        else if( (cond === wave_left )
            && query_position(player2[cond2])[0] < query_position(player[cond])[0]
            && math_abs(query_position(player2[cond2])[0] - query_position(player[cond])[0]) < 38
            && math_abs(query_position(player2[cond2])[1] - query_position(player[cond])[1]) < 30
            ){  
                let flag = false;
                const x = query_position(player2[cond2])[0] - waved_dis;
                const y = query_position(player2[cond2])[1];
                if(cond2 === defense_right){
                    if(defense_hp2 - WAVED_DEHP >= 0){
                        defense_hp2 = defense_hp2 - WAVED_DEHP;
                    }
                    else {
                        hp2 = hp2 + defense_hp2 - WAVED_DEHP;
                        defense_hp2 = 0;
                        flag = true;
                    }
                }
                else {
                    hp2 = hp2 - WAVED_DEHP;
                    if(is_armed(1)){
                        if(with_sword[1]){
                            for(let i = 0; i < array_length(is_sword_appear); i = i + 1){
                                if(!is_sword_appear[i]){
                                    update_position(swords[i], [random_under_x(BOUNDRY_MAX - 10), 0]);
                                    is_sword_appear[i] = true;
                                    swords_appeartime[i] = get_time();
                                    with_sword[1] = false;
                                    break;
                                }
                            }
                        }
                    }
                }
                if(!flag){
                    update_position(player2[cond2], [-inf, -inf]);
                    cond2 = attacked_left;
                    update_position(player2[cond2], [x, y]);
                }
                else{
                    update_position(player2[cond2], [-inf, -inf]);
                    cond2 = attacked_left;
                    update_position(player2[cond2], [x - waved_dis, y]);
                }
        }
        else if((cond  === wave_right)
            && query_position(player2[cond2])[0] > query_position(player[cond])[0]
            && math_abs(query_position(player2[cond2])[0] - query_position(player[cond])[0]) < 38
            && math_abs(query_position(player2[cond2])[1] - query_position(player[cond])[1]) < 30
            ){
                let flag = false;
                const x = query_position(player[cond])[0] + waved_dis;
                const y = query_position(player[cond])[1];
                if(cond2 === defense_left){
                    if(defense_hp2 - WAVED_DEHP >= 0){
                        defense_hp2 = defense_hp2 - WAVED_DEHP;
                    }
                    else {
                        hp2 = hp2 + defense_hp2 - WAVED_DEHP;
                        defense_hp2 = 0;
                        flag = true;
                    }
                }
                else {
                    hp2 = hp2 - WAVED_DEHP;
                    if(is_armed(1)){
                        if(with_sword[1]){
                            for(let i = 0; i < array_length(is_sword_appear); i = i + 1){
                                if(!is_sword_appear[i]){
                                    update_position(swords[i], [random_under_x(BOUNDRY_MAX - 10), 0]);
                                    is_sword_appear[i] = true;
                                    swords_appeartime[i] = get_time();
                                    with_sword[1] = false;
                                    break;
                                }
                            }
                        }
                    }
                }
                if(!flag){
                    update_position(player2[cond2], [-inf, -inf]);
                    cond2 = attacked_left;
                    update_position(player2[cond2], [x, y]);
                }
                else{
                    update_position(player2[cond2], [-inf, -inf]);
                    cond2 = attacked_left;
                    update_position(player2[cond2], [x + waved_dis, y]);
                }
        }
    }
    
    //--------------------------------------------------------------------------
    
    //---------------------------after defense----------------------------------
    
    if(cond2 === defense_left){
        const x = query_position(player2[cond2])[0];
        const y = query_position(player2[cond2])[1];
        update_position(player2[cond2], [-inf, -inf]);
        if(with_sword[1]){
            cond2 = sword_left;
        }
        else {
            cond2 = player_towards_left;
        }
        update_position(player2[cond2], [x, y]);
    }
    if(cond2 === defense_right){
        const x = query_position(player2[cond2])[0];
        const y = query_position(player2[cond2])[1];
        update_position(player2[cond2], [-inf, -inf]);
        if(with_sword[1]){
            cond2 = sword_right;
        }
        else {
            cond2 = player_towards_right;
        }
        update_position(player2[cond2], [x, y]);
    }
    
    //--------------------------------------------------------------------------
    
    const new_position2 = query_position(player2[cond2]);
    const pre_position2 = query_position(player2[cond2]);
    const posi2 = query_position(player2[cond2]);

    let temp2 = player2;//seems useless
    
    //----------------------------after punch-----------------------------------
    if(cond2 === punch_right){
        update_position(player2[cond2], [-inf, -inf]);
        cond2 = player_towards_right;
        update_position(player2[cond2], pre_position2);
    }
    if(cond2 === punch_left){
        update_position(player2[cond2], [-inf, -inf]);
        cond2 = player_towards_left;
        update_position(player2[cond2], pre_position2);
    }
    
    //--------------------------------------------------------------------------
    
    //--------------------------after wave--------------------------------------
    if(with_sword[1]){
        if(cond2 === wave_right){
            update_position(player2[cond2], [-inf, -inf]);
            cond2 = sword_right;
            update_position(player2[cond2], pre_position2);
        }
        if(cond2 === wave_left){
            update_position(player2[cond2], [-inf, -inf]);
            cond2 = sword_left;
            update_position(player2[cond2], pre_position2);
        }
    }
    //--------------------------------------------------------------------------
    
    //--------------------------after shoot--------------------------------------
    if(with_gun[1]){
        if(cond2 === shoot_right){
            update_position(player2[cond2], [-inf, -inf]);
            cond2 = gun_right;
            update_position(player2[cond2], pre_position2);
        }
        if(cond2 === shoot_left){
            update_position(player2[cond2], [-inf, -inf]);
            cond2 = gun_left;
            update_position(player2[cond2], pre_position2);
        }
    }
    //--------------------------------------------------------------------------
    

    update_text(find_xy2, "player2 at: " + stringify(posi2[0]) + "," + stringify(posi2[1]));
    update_position(find_xy2, [120, 125]);
    
    update_text(print_hp2, "HP of player2 : " + stringify(hp2));
    update_position(print_hp2, [420, 125]);
    
    //--------------------------boudry check------------------------------------
    
    if( gameobjects_overlap(boundry[LEFT], player2[cond2])){
        update_position(player2[cond2], [new_position2[0] + 10 * movement_dist, new_position2[1]]);
    }
    else if( gameobjects_overlap(boundry[RIGHT], player2[cond2])){
        update_position(player2[cond2], [new_position2[0] - 10 * movement_dist, new_position2[1]]);
    }
    else if( gameobjects_overlap(boundry[UP], player2[cond2])){
        update_position(player2[cond2], [new_position2[0], new_position2[1] + 10 * movement_dist]);
    }
    else if( gameobjects_overlap(boundry[DOWN], player2[cond2])){
        update_position(player2[cond2], [new_position2[0], new_position2[1] - 10 * movement_dist]);
    }
    
    //--------------------------------------------------------------------------
    
    
    //--------------------------barrier check-----------------------------------
    /*
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
    */
    //--------------------------------------------------------------------------
    
    
    //-------------------drag back those who are out of rage--------------------
    
    if(posi2[0] < BOUNDRY_MIN ) {
        update_position(player2[cond2], [BOUNDRY_MIN + 35, posi2[1]]);
    }
    if(posi2[0] > BOUNDRY_MAX){
        update_position(player2[cond2], [BOUNDRY_MAX - 1  , posi2[1]]);
    }
    if(posi2[1] < BOUNDRY_MIN){
        update_position(player2[cond2], [posi2[0], BOUNDRY_MIN + 35]);
    }
    if(posi2[1] > BOUNDRY_MAX){
        update_position(player2[cond2], [posi2[0], BOUNDRY_MAX - 1 ]);
    }

    //--------------------------------------------------------------------------
    
    
    
    
    //-----------------------------jump-----------------------------------------
   
   if (input_key_down("2") ) { // && get_time() - last_time_jump > 60 （another version）
       if( check_barri(player2[cond2], barri) &&(!is_borderline(barri, query_position(player2[cond2]), 0))){
            add_vectors(new_position2, [0, BARRI_BOUNCE_DIS]);
            update_position(player2[cond2], new_position2);
       }
       add_vectors(new_position2, [0, JUMP_HEIGHT]);
       update_position(player2[cond2], new_position2);
       //last_time_jump = get_time();
       last_dir2 = UP;
   }
   
   //---------------------------------------------------------------------------
   
   
   //-----------------------------move left-------------------------------------
   
   else if (input_key_down(",") && cond2 !== defense_right && cond2 !== defense_left) {
        if(check_barri(player2[cond2], barri)){
            if(is_beside_right(barri, query_position(player2[cond2]), 0) && (!is_borderline(barri, query_position(player2[cond2]), 0))){
                add_vectors(new_position2, [BARRI_BOUNCE_DIS, 0]);
                update_position(player2[cond2], new_position2);
            }
       }
       else {
           update_position(player2[cond2], [-inf, -inf]);
           if(is_armed(1)){
                if(with_sword[1]){
                    if(cond2 === sword_left ){
                        cond2 = player_towards_left;
                    }
                    else {
                        cond2 = sword_left;
                    }
                }
                else if(with_gun[1]){
                    if(cond2 === gun_left ){
                        cond2 = gun_left2;
                    }
                    else {
                        cond2 = gun_left;
                    }
                }
           }
            else {
                if(cond2 === player_towards_left ){
                    cond2 = player_towards_left2;
                }
                else {
                    cond2 = player_towards_left;
                }
            }
            update_position(player2[cond2], new_position2);
            add_vectors(new_position2, [-1 * movement_dist, 0]);
            update_position(player2[cond2], new_position2);
       }
        last_dir2 = LEFT;
   }
   
   //---------------------------------------------------------------------------
   
   
   //--------------------------------move right---------------------------------
   
   else if (input_key_down("/") && cond2 !== defense_right && cond2 !== defense_left) {
       if(check_barri(player2[cond2], barri)){
            if(is_beside_left(barri, query_position(player2[cond2]), 0) && (!is_borderline(barri, query_position(player2[cond2]), 0))){
                add_vectors(new_position2, [-BARRI_BOUNCE_DIS, 0]);
                update_position(player2[cond2], new_position2);
            }
       }
       else{
            update_position(player2[cond2], [-inf, -inf]);
            if(is_armed(1)){
                if(with_sword[1]){
                    if(cond2 === sword_right ){
                        cond2 = player_towards_right;
                    }
                    else {
                        cond2 = sword_right;
                    }
                }
                else if(with_gun[1]){
                    if(cond2 === gun_right ){
                        cond2 = gun_right2;
                    }
                    else {
                        cond2 = gun_right;
                    }
                }
            }
            else {
                if(cond2 === player_towards_right ){
                    cond2 = player_towards_right2;
                }
                else {
                    cond2 = player_towards_right;
                }
            }
            update_position(player2[cond2], pre_position2);
            add_vectors(new_position2, [movement_dist, 0]);
            update_position(player2[cond2], new_position2);
       }
       
       last_dir2 = RIGHT;
       
   }
   
   //---------------------------------------------------------------------------
   
   //-----------------------------to attack-------------------------------------
   
   else if(input_key_down("1") && cond2 !== defense_right && cond2 !== defense_left){
       if(is_towards_right(cond2)){
           //cond = punch_right;
           if(check_barri(player2[cond2], barri)){
                if(is_beside_left(barri, query_position(player2[cond2]), 0) && (!is_borderline(barri, query_position(player2[cond2]), 0))){
                    add_vectors(new_position2, [-BARRI_BOUNCE_DIS, 0]);
                    update_position(player2[cond2], new_position2);
                }
            }
            else{
                if(with_sword[1]){
                    if(cond2 === wave_right){
                        update_position(player2[cond2], [-inf, -inf]);
                        cond2 = sword_right;
                    }
                    else {
                        update_position(player2[cond2], [-inf, -inf]);
                        cond2 = wave_right;
                    }
                }
                else if(with_gun[1]){
                    const x = query_position(player2[cond2])[0];
                    const y = query_position(player2[cond2])[1];
                    for(let i = 0; i < array_length(is_bullet2_appear); i = i + 1){
                        if(!is_bullet2_appear[i]){
                            is_bullet2_appear[i] = true;
                            bullet2_dire[i] = RIGHT;
                            update_position(bullets_towards_right2[i], [x + 100, y]);
                            break;
                        }
                    }
                    update_position(player2[cond2], [-inf, -inf]);
                    cond2 = shoot_right;
                }
                else {
                    if(cond2 === punch_right){
                        update_position(player2[cond2], [-inf, -inf]);
                        cond2 = punch2_right;
                    }
                    else {
                        update_position(player2[cond2], [-inf, -inf]);
                        cond2 = punch_right;
                    }
                }
                
                update_position(player2[cond2], pre_position2);
            /*    add_vectors(new_position, [movement_dist, 0]);
                update_position(player[cond], new_position);
            */
            }
            last_dir2 = RIGHT;
       
       }
       else {
            if(check_barri(player2[cond2], barri)){
                if(is_beside_right(barri, query_position(player2[cond2]), 0) && (!is_borderline(barri, query_position(player2[cond2]), 0))){
                    add_vectors(new_position2, [BARRI_BOUNCE_DIS, 0]);
                    update_position(player2[cond2], new_position2);
                }
            }
            else {
                if(with_sword[1]){
                    if(cond2 === wave_left){
                        update_position(player2[cond2], [-inf, -inf]);
                        cond2 = sword_left;
                    }
                    else {
                        update_position(player2[cond2], [-inf, -inf]);
                        cond2 = wave_left;
                    }
                }
                else if(with_gun[1]){
                    const x = query_position(player2[cond2])[0];
                    const y = query_position(player2[cond2])[1];
                    for(let i = 0; i < array_length(bullets_towards_left2); i = i + 1){
                        if(!is_bullet2_appear[i]){
                            is_bullet2_appear[i] = true;
                            bullet2_dire[i] = LEFT;
                            update_position(bullets_towards_left2[i], [x -100, y ]);
                            break;
                        }
                    }
                    update_position(player2[cond2], [-inf, -inf]);
                    cond2 = shoot_left;
                }
                else {
                    if(cond2 === punch_left){
                        update_position(player2[cond2], [-inf, -inf]);
                        cond2 = punch2_left;
                    }
                    else {
                        update_position(player2[cond2], [-inf, -inf]);
                        cond2 = punch_left;
                    }
                }
                update_position(player2[cond2], new_position2);
            /*    add_vectors(new_position, [-1 * movement_dist, 0]);
                update_position(player[cond], new_position);
            */
            }
            last_dir2 = LEFT;
       }
       
       //update_position(player[cond], pre_position);
   }
   
   //---------------------------------------------------------------------------
   
   //-----------------------------to defense------------------------------------
   
   else if(defense_hp2 > 0 && input_key_down(".")){
       if(is_towards_right(cond2)){
           //cond = punch_right;
            if(check_barri(player2[cond2], barri)){
                if(is_beside_left(barri, query_position(player2[cond2]), 0) && (!is_borderline(barri, query_position(player2[cond2]), 0))){
                    add_vectors(new_position2, [-BARRI_BOUNCE_DIS, 0]);
                    update_position(player2[cond2], new_position2);
                }
            }
            else{
                update_position(player2[cond2], [-inf, -inf]);
                cond2 = defense_right;
                update_position(player2[cond2], pre_position2);
                add_vectors(new_position2, [0, 0]);
                update_position(player2[cond2], new_position2);
            }
            last_dir2 = RIGHT;
       
       }
       else {
           //cond = punch_left;
            if(check_barri(player2[cond2], barri)){
                if(is_beside_right(barri, query_position(player2[cond2]), 0) && (!is_borderline(barri, query_position(player2[cond2]), 0))){
                    add_vectors(new_position2, [BARRI_BOUNCE_DIS, 0]);
                    update_position(player2[cond2], new_position2);
                }
            }
            else {
                update_position(player2[cond2], [-inf, -inf]);
                cond2 = defense_left;
                update_position(player2[cond2], new_position2);
                add_vectors(new_position2, [0, 0]);
                update_position(player2[cond2], new_position2);
            }
            last_dir2 = LEFT;
       }
       
       //update_position(player[cond], pre_position);
   }
   //------------------------------ditch weapon---------------------------------
   
   else if(input_key_down("3")){
       if(is_armed(1)){
            if(with_sword[1]){
                const x = query_position(player2[cond2])[0];
                const y = query_position(player2[cond2])[1];
                    for(let i = 0; i < array_length(is_sword_appear); i = i + 1){
                        if(!is_sword_appear[i]){
                            update_position(swords[i], [random_under_x(BOUNDRY_MAX - 10), 0]);
                            is_sword_appear[i] = true;
                            swords_appeartime[i] = get_time();
                            with_sword[1] = false;
                            update_position(player2[cond2], [-inf, -inf]);
                            if(is_towards_right(cond2)){
                                cond2 = player_towards_right;
                            }
                            else {
                                cond2 = player_towards_left;
                            }
                            update_position(player2[cond2], [x, y]);
                            break;
                        }
                }
            }
            if(with_gun[1]){
                const x = query_position(player2[cond2])[0];
                const y = query_position(player2[cond2])[1];
                    for(let i = 0; i < array_length(is_gun_appear); i = i + 1){
                        if(!is_gun_appear[i]){
                            update_position(guns[i], [random_under_x(BOUNDRY_MAX - 10), 0]);
                            is_gun_appear[i] = true;
                            guns_appeartime[i] = get_time();
                            with_gun[1] = false;
                            update_position(player2[cond2], [-inf, -inf]);
                            if(is_towards_right(cond2)){
                                cond2 = player_towards_right;
                            }
                            else {
                                cond2 = player_towards_left;
                            }
                            update_position(player2[cond2], [x, y]);
                            break;
                        }
                }
            }
        }
   }
   
   //---------------------------------------------------------------------------
   
   //------------------------------gravity--------------------------------------
   if(! is_borderline(barri, query_position(player2[cond2]), 0)){
       if(query_position(player2[cond2])[0] > 0 && query_position(player2[cond2])[0] < 550 
        && query_position(player2[cond2])[1] > 0 && query_position(player2[cond2])[1] < 550){
            update_position(player2[cond2], [query_position(player2[cond2])[0], query_position(player2[cond2])[1] + g]);
        }
        last_dir2 = DOWN;
   }
   
    
    //--------------------------------------------------------------------------
    
    //HP check
    if(hp2 <= 0){
        player2_alive = false;
    }
    
    
});
build_game();