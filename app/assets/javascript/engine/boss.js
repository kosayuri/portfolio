class Position {
  constructor() {
    this.flag = 0;
    this.cnt;
    this.set_t;
    this.ax;
    this.bx;
    this.ay;
    this.by;
    this.initial_x;
    this.initial_y;
  }
}

class Boss extends Game {
  flag;
  cnt;
  knd;
  wtime;
  hp;
  hp_max;
  item_n;
  pos;
  x;
  y;
  shot_base_angle;
  shot_base_spd;
  bullet;

  input() {
    this.flag = 0;
    this.cnt = 0;
    this.knd = 0;
    this.wtime = 0;
    this.shot_flag = 0;
    this.hp;
    this.hp_max;
    this.item_n = [];
    this.item_n[0] = 10;
    this.item_n[1] = 2;
    this.item_n[2] = 100000;
    this.pos = new Position();
    this.x;
    this.y;
    this.shot_base_angle;
    this.shot_base_spd;
    this.bullet = [];

    for (let i = 0; i < this.BOSS_BULLET_MAX; i++) {
      this.bullet[i] = new Bullet();
    }
  }

  input_fixed_pos(t) {
    let x = this.BOSS_POS_X - this.x, y = this.BOSS_POS_Y - this.y;

    this.pos.flag = 1;
    this.pos.cnt = 0;
    this.pos.set_t = t;
    this.pos.ax = 2 * x / t;
    this.pos.bx = x / (t * t);
    this.pos.ay = 2 * y / t;
    this.pos.by = y / (t * t);
    this.pos.initial_x = this.x;
    this.pos.initial_y = this.y;
  }

  input_phy_pos(x, y, t) {
    x -= this.x;
    y -= this.y;
    this.pos.flag = 1;
    this.pos.cnt = 0;
    this.pos.set_t = t;
    this.pos.ax = 2 * x / t;
    this.pos.bx = x / (t * t);
    this.pos.ay = 2 * y / t;
    this.pos.by = y / (t * t);
    this.pos.initial_x = this.x;
    this.pos.initial_y = this.y;
  }

  move_pos(x1, y1, x2, y2, dist, t) {
    let i;
    let ang, x, y;

    x1 -= this.x;
    x2 -= this.x;
    y1 -= this.y;
    y2 -= this.y;

    for (i = 0; i < 1000; i++) {
      ang = this.rang(Math.PI);
      x = Math.cos(ang) * dist;
      y = Math.sin(ang) * dist;

      if (x1 < x && x2 > x && y1 < y && y2 > y) {
        this.pos.initial_x = this.x;
        this.pos.initial_y = this.y;
        this.pos.flag = 1;
        this.pos.cnt = 0;
        this.pos.set_t = t;
        this.pos.ax = 2 * x / t;
        this.pos.bx = x / (t * t);
        this.pos.ay = 2 * y / t;
        this.pos.by = y / (t * t);
        return;
      }
    }
  }

  pos_calc() {
    if (this.pos.flag != 0) {
      if (this.pos.set_t < this.pos.cnt) {
        this.pos.flag = 0;
        return;
      }
      this.x = this.pos.ax * this.pos.cnt - this.pos.bx * this.pos.cnt * this.pos.cnt + this.pos.initial_x;
      this.y = this.pos.ay * this.pos.cnt - this.pos.by * this.pos.cnt * this.pos.cnt + this.pos.initial_y;
      this.pos.cnt++;
    }
  }

  bossbulletcalc() {
    for (let i = 0; i < this.BOSS_BULLET_MAX; i++) {
      if (this.bullet[i].flag > 0) {
        this.bullet[i].x += Math.cos(this.bullet[i].angle) * this.bullet[i].spd;
        this.bullet[i].y += Math.sin(this.bullet[i].angle) * this.bullet[i].spd;
        this.bullet[i].cnt++;

        if (this.flame_over_check(this.bullet[i].x, this.bullet[i].y) &&
          this.bullet[i].till < this.bullet[i].cnt)
          this.bullet[i].flag = 0;
      }
    }
  }

  main(cnt, flash_effect, endgame_effect, character, character_bullet, effect, sound) {
    switch (this.flag) {
      case 0:
        if (cnt == 15000) {
          this.flag = 1;
          this.cnt = 0;
          flash_effect.flag = true;
          this.x = this.BOSS_POS_X;
          this.y = this.BOSS_POS_Y;
          sound.boss_advent.flag = 1;
          sound.bgm_stop_flag = true;
        }
        break;
      case 1:
        if (this.cnt == 120) {
          if (this.knd == 0) {
            sound.boss_bgm.flag = 2;
          }

          let set_hp = [30000, 100000, 42000, 32000, 45000];
          this.hp = this.hp_max = set_hp[this.knd];
          this.flag = 2;
          this.cnt = 0;
        } else {
          this.cnt++;
        }

        this.pos_calc();
        break;
      case 2:
        this.pos_calc();
        this.bossbulletcalc();
        this["boss_shot_bulletH" + this.knd](character, character_bullet, sound);
        this.cnt++;
        break;
      case 3:
        if (this.cnt < 60) {
          effect.boss_die_effect(this);

          if (this.cnt == 0) {
            flash_effect.flag = true;
            sound.bgm_stop_flag = true;
          }
        } else {
          if (this.cnt == 220) {
            this.flag = 4;
            this.cnt = 0;
            endgame_effect.flag = true;
            break;
          }
        }

        this.cnt++;
        break;
    }
  }

  boss_shot_bulletH0(character, character_bullet, sound) {
    let i, j, n, m, knd, t = this.cnt % 950;
    let angle, x, y;

    if (t == 0) {
      angle = this.attack_atan2(character, this);

      for (i = 1; i < 4; i++) {
        if ((knd = this.flag_check(this.bullet, this.BOSS_BULLET_MAX)) != -1) {
          this.bullet[knd].flag = 1;
          this.bullet[knd].cnt = 0;
          this.bullet[knd].col = 1;
          this.bullet[knd].knd = 0;
          this.bullet[knd].angle = angle - Math.PI / 5 + Math.PI / 5 * (i - 1);
          this.bullet[knd].x = this.x;
          this.bullet[knd].y = this.y;
          this.bullet[knd].status = 0;
          this.bullet[knd].spd = 1.5;
          this.bullet[knd].rem_spd = 20;
        }
      }

      sound.enemy_shot.flag = 1;
      this.move_pos(30, 0, this.FLAME_MAX_X - 30, 200, 100, 20);
    }

    if (t >= 30 && t % 5 == 0 && t < 400) {
      if ((t - 30) == 0) {
        this.shot_base_angle = this.attack_atan2(character, this);
      }

      if ((t - 30) % 40 == 0) {
        this.shot_base_angle += Math.PI * 2 / 20;
      }

      for (i = 0; i < 20; i++) {
        if ((knd = this.flag_check(this.bullet, this.BOSS_BULLET_MAX)) != -1) {
          this.bullet[knd].flag = 1;
          this.bullet[knd].cnt = 0;
          this.bullet[knd].angle = this.shot_base_angle + Math.PI * 2 / 10 * i + (i < 10 ? Math.PI / 1.5 : -Math.PI / 1.5);
          this.bullet[knd].knd = 8;
          this.bullet[knd].col = 4;
          this.bullet[knd].x = this.x;
          this.bullet[knd].y = this.y;
          this.bullet[knd].spd = 3;
          this.bullet[knd].status = 10;
          this.bullet[knd].rem_spd = -1;
        }
      }

      if ((t - 30) % 40 == 20) {
        for (i = 0; i < 10; i++) {
          if ((knd = this.flag_check(this.bullet, this.BOSS_BULLET_MAX)) != -1) {
            this.bullet[knd].flag = 1;
            this.bullet[knd].cnt = 0;
            this.bullet[knd].col = i % 2 ? 1 : 2;
            this.bullet[knd].knd = 0;
            this.bullet[knd].x = this.x;
            this.bullet[knd].y = this.y;
            this.bullet[knd].angle = Math.PI * 2 / 10 * i;
            this.bullet[knd].spd = 3;
            this.bullet[knd].status = 0;
            this.bullet[knd].rem_spd = -1;
          }
        }
      }

      sound.enemy_shot.flag = 1;

      if ((t - 30) % 120 == 0) {
        this.move_pos(30, 0, this.FLAME_MAX_X - 30, 200, 100, 20);
      }
    }

    if (t >= 450 && t < 700 && (t - 450) % 2 == 0) {
      if (t == 450) {
        this.input_phy_pos(this.FLAME_MAX_X / 2, this.FLAME_MAX_Y / 2, 20);
      }

      if ((knd = this.flag_check(this.bullet, this.BOSS_BULLET_MAX)) != -1) {
        this.bullet[knd].flag = 1;
        this.bullet[knd].status = 12;
        this.bullet[knd].cnt = 0;
        this.bullet[knd].col = this.rand(4);
        this.bullet[knd].knd = this.rand(5) == 0 ? 0 : 3;
        this.bullet[knd].angle = this.rang(Math.PI);
        this.bullet[knd].x = this.x;
        this.bullet[knd].y = this.y;
        this.bullet[knd].spd = 4;
        this.bullet[knd].base_angle = this.rand(1) ? Math.PI / 200 : -Math.PI / 200;
        this.bullet[knd].rem_spd = -1;
      }

      if (t % 4 == 0) {
        sound.enemy_shot.flag = 1;
      }
    }

    if (t >= 800 && t % 20 == 0 && t < 900) {
      angle = this.attack_atan2(character, this);

      for (i = 0; i < 5; i++) {
        if ((knd = this.flag_check(this.bullet, this.BOSS_BULLET_MAX)) != -1) {
          this.bullet[knd].flag = 1;
          this.bullet[knd].cnt = 0;
          this.bullet[knd].col = this.rand(4);
          this.bullet[knd].knd = 0;
          this.bullet[knd].x = this.x + Math.cos(angle - Math.PI / 3 + Math.PI / 6 * i + Math.PI) * 200;
          this.bullet[knd].y = this.y + Math.sin(angle - Math.PI / 3 + Math.PI / 6 * i + Math.PI) * 200;
          this.bullet[knd].angle = this.coordinate_attack_atan2(this.bullet[knd], (this.x - character.x) / 2 + character.x, (this.y - character.y) / 2 + character.y);
          this.bullet[knd].angle = this.coordinate_attack_atan2(this.bullet[knd], (this.x - character.x) / 2 + character.x, (this.y - character.y) / 2 + character.y);
          this.bullet[knd].status = 0;
          this.bullet[knd].spd = 5;
          this.bullet[knd].rem_spd = 10;
        }
      }

      sound.enemy_shot.flag = 1;
    }

    for (i = 0; i < this.BOSS_BULLET_MAX; i++) {
      if (this.bullet[i].flag > 0) {
        if (this.bullet[i].rem_spd > -1) {
          for (j = 0; j < this.CHARACTER_BULLET_MAX; j++) {
            if (character_bullet[j].flag > 0) {
              x = this.bullet[i].x - character_bullet[j].x;
              y = this.bullet[i].y - character_bullet[j].y;

              if (x * x + y * y < 800) {
                this.bullet[i].rem_spd--;
                character_bullet[j].flag = 0;

                if (this.bullet[i].rem_spd <= 0) {
                  this.bullet[i].flag = 0;
                  sound.enemy_shot.flag = 1;
                  for (m = 0; m < 3; m++) {
                    for (n = 0; n < 30; n++) {
                      if ((knd = this.flag_check(this.bullet, this.BOSS_BULLET_MAX)) != -1) {
                        this.bullet[knd].flag = 1;
                        this.bullet[knd].cnt = 0;
                        this.bullet[knd].col = n % 9;
                        this.bullet[knd].knd = 8;
                        this.bullet[knd].angle = Math.PI * 2 / 30 * n;
                        this.bullet[knd].x = this.bullet[i].x;
                        this.bullet[knd].y = this.bullet[i].y;
                        this.bullet[knd].status = 1 + n % 2;
                        this.bullet[knd].spd = 2 + 0.3 * m;
                        this.bullet[knd].rem_spd = -1;
                      }
                    }
                  }
                  break;
                }
              }
            }
          }
        }

        if (this.bullet[i].status == 12) {
          this.bullet[i].angle += this.bullet[i].base_angle;
          this.bullet[i].spd += 0.02;
        }

        if (this.bullet[i].status < 3 && this.bullet[i].status > 0 && this.bullet[i].cnt > 10 && this.bullet[i].cnt < 60) {
          this.bullet[i].angle += Math.PI / 200 * (this.bullet[i].status - 1 ? 1 : -1);
        }
      }
    }
  }

  boss_shot_bulletH1(character, character_bullet, sound) {
    let i, j, knd, n, t = this.cnt % 1050;

    if (t == 0) {
      if (this.cnt == 0)
        this.input_phy_pos(this.FLAME_MAX_X / 2, 30, 20);
      this.shot_base_spd = 0;
      this.shot_base_angle = 120;
    }

    if (t == this.shot_base_angle) {
      j = this.shot_base_spd % 2 ? 12 : 14;
      n = this.shot_base_spd >= 7 ? 5 + this.rand(j - 10) : 4 + this.rand(j - 8);

      for (i = 0; i < j; i++) {
        if ((knd = this.flag_check(this.bullet, this.BOSS_BULLET_MAX)) != -1 && n != i) {
          this.bullet[knd].flag = 1;
          this.bullet[knd].cnt = 0;
          this.bullet[knd].col = j == 14 ? 0 : 1;
          this.bullet[knd].knd = 11;
          this.bullet[knd].x = this.shot_base_spd % 2 ? 32 * i + 16 : this.shot_base_spd % 4 == 0 ? this.FLAME_MAX_X : 0;
          this.bullet[knd].y = this.shot_base_spd % 2 ? this.shot_base_spd % 4 == 1 ? this.FLAME_MAX_Y : 0 : 32 * i + 16;
          this.bullet[knd].angle = Math.PI + Math.PI / 2 * (this.shot_base_spd % 4);
          this.bullet[knd].spd = 6;
        }
      }

      this.shot_base_spd++;
      n = this.shot_base_spd < 8 ? this.shot_base_spd * 10 : 70;
      this.shot_base_angle += 120 - n;
      sound.enemy_shot.flag = 1;
    }

    for (i = 0; i < this.BOSS_BULLET_MAX; i++) {
      if (this.bullet[i].flag > 0) {
        if (this.bullet[i].cnt < 20) {
          this.bullet[i].spd -= 0.3;
        }

        if (this.bullet[i].cnt >= 60) {
          if (this.bullet[i].spd < 4) {
            this.bullet[i].spd += 0.07;
          }
        }
      }
    }
  }

  boss_shot_bulletH2(character, character_bullet, sound) {
    let i, knd, s, t = this.cnt % 500, num = this.cnt / 500 % 2;

    if (t == 0) {
      this.shot_base_angle = this.rang(Math.PI);

      if ((knd = this.flag_check(this.bullet, this.BOSS_BULLET_MAX)) != -1) {
        this.bullet[knd].flag = 1;
        this.bullet[knd].cnt = 0;
        this.bullet[knd].x = this.x;
        this.bullet[knd].y = this.y;
        this.bullet[knd].vx = (num ? this.FLAME_MAX_X / 2 : -this.FLAME_MAX_X / 2) / 30;
        this.bullet[knd].vy = 0;
        this.bullet[knd].angle = num ? Math.PI / 5 * 4 : Math.PI / 5;
        this.bullet[knd].base_angle = 0;
        this.bullet[knd].spd = 0;
        this.bullet[knd].knd = 0;
        this.bullet[knd].col = num ? 0 : 2;
        this.bullet[knd].status = num;
      }
    }

    for (i = 0; i < this.BOSS_BULLET_MAX; i++) {
      if (this.bullet[i].flag) {
        if (this.bullet[i].status < 2) {
          if (this.bullet[i].cnt == 30) {
            this.bullet[i].vx = 0;
            this.bullet[i].vy = 0.4;
            this.bullet[i].spd = 4;
            this.bullet[i].base_angle = this.bullet[i].status ? Math.PI / 200 : -Math.PI / 200;
          }

          if (this.bullet[i].x >= this.FLAME_MAX_X && this.bullet[i].cnt < 300) {
            this.bullet[i].base_angle = Math.PI / 200;
            this.bullet[i].angle = Math.PI / 4 * 3;
          } else {
            if (this.bullet[i].x <= 0 && this.bullet[i].cnt < 300) {
              this.bullet[i].base_angle = -Math.PI / 200;
              this.bullet[i].angle = Math.PI / 4;
            }
          }

          if (this.bullet[i].cnt < 400) {
            this.bullet[i].x += this.bullet[i].vx;
            this.bullet[i].y += this.bullet[i].vy;
            this.bullet[i].angle += this.bullet[i].base_angle;
          }

          if (this.bullet[i].cnt > 30 && this.bullet[i].cnt % 6 == 0 && this.bullet[i].cnt < 360) {
            for (s = 0; s < 10; s++) {
              if ((knd = this.flag_check(this.bullet, this.BOSS_BULLET_MAX)) != -1) {
                this.bullet[knd].flag = 1;
                this.bullet[knd].cnt = 0;
                this.bullet[knd].knd = 8;
                this.bullet[knd].col = (t + s) % 9;
                this.bullet[knd].x = this.bullet[i].x + Math.cos(this.bullet[i].angle + (this.bullet[i].base_angle > 0 ? -Math.PI / 2 : Math.PI / 2)) * (50 + 50 * Math.sin(Math.PI / 20 * ((this.bullet[i].cnt - 30) % 20))) / 10 * s;
                this.bullet[knd].y = this.bullet[i].y + Math.sin(this.bullet[i].angle + (this.bullet[i].base_angle > 0 ? -Math.PI / 2 : Math.PI / 2)) * (50 + 50 * Math.sin(Math.PI / 20 * ((this.bullet[i].cnt - 30) % 20))) / 10 * s;
                this.bullet[knd].spd = 0;
                this.bullet[knd].angle = Math.PI * 2 / 60 * (t + s) + this.shot_base_angle;
                this.bullet[knd].status = 2;
              }
            }

            sound.enemy_shot.flag = 1;
          }

        } else {
          if (this.bullet[i].status == 2 && this.bullet[i].cnt == 60)
            this.bullet[i].spd = 3;
        }
      }
    }
  }

  boss_shot_bulletH3(character, character_bullet, sound) {
    let i, knd, s, t2 = this.cnt, nned = 20;

    if (t2 % nned == 0) {
      for (i = 0; i < 4; i++) {
        for (s = 0; s < 30; s++) {
          if ((knd = this.flag_check(this.bullet, this.BOSS_BULLET_MAX)) != -1) {
            this.bullet[knd].flag = 1;
            this.bullet[knd].cnt = 0;
            this.bullet[knd].knd = 5;
            this.bullet[knd].col = t2 / nned % 2;
            this.bullet[knd].base_angle = t2 / nned % 2 ? Math.PI * 2 / 16 + (((t2 / (nned * 6)) | 10) % 2 ? Math.PI * 2 / 4 * i : Math.PI * 2 / 4 * i - Math.PI * 2 / 8) : (((t2 / (nned * 6)) | 10) % 2 ? Math.PI * 2 / 4 * i : Math.PI * 2 / 4 * i - Math.PI * 2 / 8);
            this.bullet[knd].x = this.x + Math.cos(this.bullet[knd].base_angle) * 20;
            this.bullet[knd].y = this.y + Math.sin(this.bullet[knd].base_angle) * 20;
            this.bullet[knd].spd = 2;
            this.bullet[knd].angle = this.bullet[knd].base_angle - Math.PI * 2 / 8 + Math.PI * 2 / 8 / 30 * s;
            this.bullet[knd].status = 0;
          }
        }
      }

      sound.enemy_shot.flag = 1;
    }
  }

  boss_shot_bulletH4(character, character_bullet, sound) {
    let i, knd, s, t = this.cnt;

    if ((t > 400 ? t % 15 : t % 20) == 0) {
      let ang = t > 200 ? this.rang(Math.PI / 5) : 0;

      for (i = 0; i < 2; i++) {
        for (s = 0; s < 15; s++) {
          if ((knd = this.flag_check(this.bullet, this.BOSS_BULLET_MAX)) != -1) {
            this.bullet[knd].flag = 1;
            this.bullet[knd].cnt = 0;
            this.bullet[knd].knd = 2;
            this.bullet[knd].col = i ? 0 : 4;
            this.bullet[knd].base_angle = Math.PI * 2 / 15 * s + Math.PI / 10 * (t / (t > 400 ? 15 : 20)) + ang;
            this.bullet[knd].x = this.x + Math.cos(this.bullet[knd].base_angle) * 100;
            this.bullet[knd].y = this.y + Math.sin(this.bullet[knd].base_angle) * 100;
            this.bullet[knd].spd = 0;
            this.bullet[knd].status = i;
          }
        }
      }

      sound.enemy_shot.flag = 1;
    }

    for (i = 0; i < this.BOSS_BULLET_MAX; i++) {
      if (this.bullet[i].flag) {
        if (this.bullet[i].status < 2) {
          this.bullet[i].base_angle += this.bullet[i].status ? Math.PI / 180 : -Math.PI / 180;
          this.bullet[i].angle = this.bullet[i].base_angle + (this.bullet[i].status ? Math.PI / 3 : -Math.PI / 3);
          this.bullet[i].x = this.x + Math.cos(this.bullet[i].base_angle) * 100;
          this.bullet[i].y = this.y + Math.sin(this.bullet[i].base_angle) * 100;

          if (this.bullet[i].cnt > 120) {
            this.bullet[i].status = 2;
          }
        } else {
          if (this.bullet[i].status == 2 && this.bullet[i].cnt < 180) {
            this.bullet[i].spd += t > 400 ? 0.02 : 0.04;

          }
        }
      }
    }
  }
}
