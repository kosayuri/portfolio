class OutShaft {
  constructor() {
    this.x;
    this.y;
  }
}

class Out extends Game {
  outbullet;
  boss_out;

  out_input() {
    this.outbullet = [];

    for (let i = 0; i < this.BULLET_KND_MAX; i++) {
      this.outbullet[i] = new OutShaft();
    }

    this.outbullet[0].x = 15;
    this.outbullet[0].y = 15;
    this.outbullet[1].x = 4;
    this.outbullet[1].y = 4;
    this.outbullet[2].x = 45;
    this.outbullet[2].y = 3;
    this.outbullet[3].x = 7;
    this.outbullet[3].y = 4;
    this.outbullet[4].x = 6;
    this.outbullet[4].y = 6;
    this.outbullet[5].x = 2;
    this.outbullet[5].y = 2;
    this.outbullet[6].x = 3;
    this.outbullet[6].y = 3;
    this.outbullet[7].x = 4;
    this.outbullet[7].y = 4;
    this.outbullet[8].x = 5;
    this.outbullet[8].y = 2;
    this.outbullet[9].x = 3;
    this.outbullet[9].y = 3;
    this.outbullet[10].x = 3;
    this.outbullet[10].y = 3;
    this.outbullet[11].x = 16;
    this.outbullet[11].y = 16;
  }
  out(hit_x, hit_y, attack_x, attack_y, attack_spd, attack_angle, out) {
    let x, y, out_pow = out * out;

    if (attack_spd > out) {
      let loop_count = Math.trunc(attack_spd / out);

      x = attack_x - Math.cos(attack_angle) * attack_spd;
      y = attack_y - Math.sin(attack_angle) * attack_spd;

      for (let i = 0; i < loop_count; i++) {
        if (out_pow >= (hit_x - x) ** 2 + (hit_y - y) ** 2)
          return true;
        x += Math.cos(attack_angle) * out;
        y += Math.sin(attack_angle) * out;
      }
    }

    x = hit_x - attack_x;
    y = hit_y - attack_y;

    if (out_pow >= x * x + y * y)
      return true;
    return false;
  }

  circle_ellipse_out(hit_x, hit_y, hit_out, attack_x, attack_y, attack_angle, attack_out) {
    let pow_attack_out_x = attack_out.x * attack_out.x;
    let pow_attack_out_y = attack_out.y * attack_out.y;
    let distance_x = hit_x - attack_x;
    let distance_y = hit_y - attack_y;
    let rotate_x = distance_x * Math.cos(attack_angle) + distance_y * Math.sin(attack_angle);
    let rotate_y = distance_y * Math.cos(attack_angle) - distance_x * Math.sin(attack_angle);

    if (rotate_y == 0) {
      if (rotate_x * rotate_x <= pow_attack_out_x + hit_out * hit_out) {
        return true;
      }
    } else {
      if (rotate_x == 0) {
        if (rotate_y * rotate_y <= pow_attack_out_y + hit_out * hit_out) {
          return true;
        }
      }
    }

    let tilt = (rotate_y / rotate_x) ** 2;
    let ellipse_out = ((pow_attack_out_x * pow_attack_out_y)
      / (pow_attack_out_y + pow_attack_out_x * tilt)) * (1 + tilt);

    if (distance_x * distance_x + distance_y * distance_y <= hit_out * hit_out + ellipse_out) {
      return true;
    }
    return false;
  }

  circle_move_ellipse_out(hit_x, hit_y, hit_out, attack_x, attack_y, attack_spd, attack_angle, attack_out) {
    if (attack_out.x === attack_out.y) {
      return this.out(hit_x, hit_y, attack_x, attack_y, attack_spd, attack_angle, hit_out + attack_out.x);
    }

    let x, y, add_out = (attack_out.x < attack_out.y ? attack_out.x : attack_out.y) + hit_out;

    if (attack_spd > add_out) {
      let loop_count = Math.trunc(attack_spd / add_out);
      x = attack_x - Math.cos(attack_angle) * attack_spd;
      y = attack_y - Math.sin(attack_angle) * attack_spd;
      for (let i = 0; i < loop_count; i++) {
        if (this.circle_ellipse_out(hit_x, hit_y, hit_out, x, y, attack_angle, attack_out)) {
          return true;
        }

        x += Math.cos(attack_angle) * add_out;
        y += Math.sin(attack_angle) * add_out;
      }
    }

    if (this.circle_ellipse_out(hit_x, hit_y, hit_out, attack_x, attack_y, attack_angle, attack_out)) {
      return true;
    }
    return false;
  }

  ellipse_move_circle_out(attack_x, attack_y, attack_spd, attack_angle, attack_out, hit_x, hit_y, hit_angle, hit_out) {//kubi
    if (hit_out.x === hit_out.y) {
      return this.out(hit_x, hit_y, attack_x, attack_y, attack_spd, attack_angle, hit_out + attack_out.x);
    }

    let x, y, add_out = (hit_out.x < hit_out.y ? hit_out.x : hit_out.y) + attack_out;
    if (attack_spd > add_out) {
      let loop_count = Math.trunc(attack_spd / add_out);

      x = attack_x - Math.cos(attack_angle) * attack_spd;
      y = attack_y - Math.sin(attack_angle) * attack_spd;
      for (let i = 0; i < loop_count; i++) {
        if (this.circle_ellipse_out(x, y, attack_out, hit_x, hit_y, hit_angle, hit_out)) {
          return true;
        }

        x += Math.cos(attack_angle) * add_out;
        y += Math.sin(attack_angle) * add_out;
      }
    }

    if (this.circle_ellipse_out(attack_x, attack_y, attack_out, hit_x, hit_y, hit_angle, hit_out)) {
      return true;
    }
    return false;
  }

  out_chbullet(character, character_bullet, enemys, enemy_shots, boss, effect, item, sound, shakee_effect) {
    let enemy_out = [this.ENEMY_OUT0, this.ENEMY_OUT1];

    if (boss.flag == 0) {
      for (let i = 0; i < this.CHARACTER_BULLET_MAX; i++) {
        if (character_bullet.bullet[i].flag > 0) {
          for (let k = 0; k < this.ENEMY_MAX; k++) {
            if (enemys[k].flag > 0) {
              if (this.out(enemys[k].x, enemys[k].y, character_bullet.bullet[i].x, character_bullet.bullet[i].y,
                character_bullet.bullet[i].spd, character_bullet.bullet[i].angle, enemy_out[enemys[k].knd] + 3)) {
                character.scr += character_bullet.bullet[i].knd ? 400 : 800;

                if (character.scr > 9999999999)
                  character.scr = 9999999999;

                enemys[k].hp -= character_bullet.bullet[i].power;
                character_bullet.bullet[i].flag = 0;

                if (enemys[k].hp <= 0) {
                  effect.enemy_die_effect(enemys[k]);
                  item.enemy_item(enemys[k]);
                  enemys[k].flag = 0;
                  sound.enemy_die.flag = 1;

                  for (let j = 0; j < this.SHOT_MAX; j++) {
                    if (enemy_shots[j].flag == 1 && k == enemy_shots[j].num) {
                      enemy_shots[j].flag = 2;
                      break;
                    }
                  }
                }
                break;
              }
            }
          }
        }
      }
    } else
      if (boss.flag == 2)
        for (let i = 0; i < this.CHARACTER_BULLET_MAX; i++) {
          if (character_bullet.bullet[i].flag > 0) {
            if (this.out(boss.x, boss.y, character_bullet.bullet[i].x, character_bullet.bullet[i].y,
              character_bullet.bullet[i].spd, character_bullet.bullet[i].angle, this.BOSS_OUT + 3)) {
              character.scr += character_bullet.bullet[i].knd ? 400 : 800;

              if (character.scr > 9999999999)
                character.scr = 9999999999;

              boss.hp -= character_bullet.bullet[i].power;
              character_bullet.bullet[i].flag = 0;

              if (boss.hp <= 0) {
                item.boss_die_item(boss);
                item.boss_die_bullet_item(boss);
                boss.knd++;
                boss.cnt = 0;

                if (boss.knd == 5) {
                  boss.flag = 3;
                  sound.boss_die.flag = 1;
                  shakee_effect.setting(80, 16);
                } else {
                  boss.flag = 1;
                  sound.enemy_die.flag = 1;
                  boss.input_fixed_pos(30);
                  shakee_effect.setting(40, 6);
                }
                return;
              }
            }
          }
        }
  }

  out_enemy_bullet(character, enemy_shots, effect, sound, shakee_effect) {
    if (character.flag == 1 && character.invincible == 0)
      for (let i = 0; i < this.SHOT_MAX; i++) {
        if (enemy_shots[i].flag > 0) {
          for (let k = 0; k < this.SHOT_BULLET_MAX; k++) {
            if (enemy_shots[i].bullet[k].flag > 0) {
              if (this.circle_move_ellipse_out(character.x, character.y, this.CHARACTER_OUT,
                enemy_shots[i].bullet[k].x, enemy_shots[i].bullet[k].y,
                enemy_shots[i].bullet[k].spd, enemy_shots[i].bullet[k].angle,
                this.outbullet[enemy_shots[i].bullet[k].knd])) {
                enemy_shots[i].bullet[k].flag = 0;
                character.damage(shakee_effect);
                sound.character_die.flag = 1;
                character.cnt = 0;
                effect.character_die_effect(character);
                if (character.flag == 3) {
                  sound.bgm_stop_flag = true;
                }
                return;
              }
            }
          }
        }
      }
  }

  out_enemy(character, enemys, effect, sound, shakee_effect) {
    let enemy_out = [this.ENEMY_OUT0, this.ENEMY_OUT1];

    if (character.flag == 1 && character.invincible == 0)
      for (let i = 0; i < this.ENEMY_MAX; i++) {
        if (enemys[i].flag > 0)
          if (this.out(character.x, character.y, enemys[i].x, enemys[i].y,
            enemys[i].spd, enemys[i].angle, this.CHARACTER_OUT + enemy_out[enemys[i].knd])) {
            character.damage(shakee_effect);

            if (character.flag == 3) {
              sound.bgm_stop_flag = true;
            }

            sound.character_die.flag = 1;
            character.cnt = 0;
            effect.character_die_effect(character);
            return;
          }
      }
  }

  out_boss(character, boss, effect, sound, shakee_effect) {
    if (character.flag == 1 && character.invincible == 0 && boss.flag == 2) {
      if ((boss.x - character.x) ** 2 + (boss.y - character.y) ** 2 <= (this.BOSS_OUT + this.CHARACTER_OUT) ** 2) {
        character.damage(shakee_effect);
        sound.character_die.flag = 1;
        character.cnt = 0;

        if (character.flag == 3) {
          sound.bgm_stop_flag = true;
        }

        effect.character_die_effect(character);
        return;
      }

      for (let i = 0; i < this.BOSS_BULLET_MAX; i++) {
        if (boss.bullet[i].flag > 0) {
          if (this.circle_move_ellipse_out(character.x, character.y, this.CHARACTER_OUT,
            boss.bullet[i].x, boss.bullet[i].y,
            boss.bullet[i].spd, boss.bullet[i].angle,
            this.outbullet[boss.bullet[i].knd])) {
            boss.bullet[i].flag = 0;
            character.damage(shakee_effect);

            if (character.flag == 3) {
              sound.bgm_stop_flag = true;
            }

            sound.character_die.flag = 1;
            character.cnt = 0;
            effect.character_die_effect(character);
            return;
          }
        }
      }
    }
  }

  main(character, character_bullet, enemys, enemy_shots, boss, effect, item, sound, shakee_effect) {
    this.out_chbullet(character, character_bullet, enemys, enemy_shots, boss, effect, item, sound, shakee_effect);

    if (boss.flag == 0) {
      this.out_enemy_bullet(character, enemy_shots, effect, sound, shakee_effect);
      this.out_enemy(character, enemys, effect, sound, shakee_effect);
    } else {
      this.out_boss(character, boss, effect, sound, shakee_effect);
    }
  }

  item_enemy_out(item, enemys, enemy_shots, boss) {
    let enemy_out = [this.ENEMY_OUT0, this.ENEMY_OUT1];

    if (boss.flag == 0) {
      for (let i = 0; i < this.ENEMY_MAX; i++) {
        if (enemys[i].flag) {
          if ((enemys[i].x - item.x) ** 2 + (enemys[i].y - item.y) ** 2 <= (item.big_flag ? 625 : 400) +
            enemy_out[enemys[i].knd] ** 2) {
            return true;
          }
        }
      }

      for (let i = 0; i < this.SHOT_MAX; i++) {
        if (enemy_shots[i].flag > 0) {
          for (let k = 0; k < this.SHOT_BULLET_MAX; k++) {
            if (enemy_shots[i].bullet[k].flag > 0) {
              if ((item.x - enemy_shots[i].bullet[k].x) ** 2 + (item.y - enemy_shots[i].bullet[k].y) ** 2 <=
                ((item.big_flag ? 25 : 20) +
                  (this.outbullet[enemy_shots[i].bullet[k].knd].x > this.outbullet[enemy_shots[i].bullet[k].knd].y ?
                    this.outbullet[enemy_shots[i].bullet[k].knd].x : this.outbullet[enemy_shots[i].bullet[k].knd].y)) ** 2) {
                return true;
              }
            }
          }
        }
      }
      return false;
    } else if (boss.flag < 3) {
      if ((boss.x - item.x) ** 2 + (boss.y - item.y) ** 2 <= (item.big_flag ? 625 : 400) + this.BOSS_OUT ** 2) {
        return true;
      }

      for (let k = 0; k < this.BOSS_BULLET_MAX; k++) {
        if (boss.bullet[k].flag > 0) {
          if ((item.x - boss.bullet[k].x) ** 2 + (item.y - boss.bullet[k].y) ** 2 <=
            ((item.big_flag ? 25 : 20) +
              (this.outbullet[boss.bullet[k].knd].x > this.outbullet[boss.bullet[k].knd].y ?
                this.outbullet[boss.bullet[k].knd].x : this.outbullet[boss.bullet[k].knd].y)) ** 2) {
            return true;
          }
        }
      }
    }
  }
}
