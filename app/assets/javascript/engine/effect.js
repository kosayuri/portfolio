class EffectStatus {
  constructor() {
    this.flag = 0;
    this.cnt;
    this.knd;
    this.col;
    this.img;
    this.blend;
    this.blend_cnt;
    this.x;
    this.y;
    this.vx;
    this.vy;
    this.spd;
    this.angle = 0;
    this.siz;
    this.draw_angle;
  }
}

class Effect extends Game {
  effects;

  input() {
    this.effects = [];

    for (let i = 0; i < this.EFFECT_MAX; i++) {
      this.effects[i] = new EffectStatus();
    }
  }

  character_die_effect(character) {
    let knd;

    if (character.cnt == 0) {
      if ((knd = this.flag_check(this.effects, this.EFFECT_MAX)) != -1) {
        this.effects[knd].flag = 1;
        this.effects[knd].cnt = 0;
        this.effects[knd].x = character.x;
        this.effects[knd].y = character.y;
        this.effects[knd].siz = 0.01;
        this.effects[knd].blend = 2;
        this.effects[knd].blend_cnt = 255;
        this.effects[knd].knd = 0;
        this.effects[knd].col = this.rand(4);
        this.effects[knd].img = "die_effect0";
      }
    }

    for (let i = 0; i < 16; i++) {
      if ((knd = this.flag_check(this.effects, this.EFFECT_MAX)) != -1) {
        this.effects[knd].flag = 1;
        this.effects[knd].cnt = 0;
        this.effects[knd].angle = this.rang(Math.PI);
        this.effects[knd].draw_angle = this.effects[knd].angle - Math.PI / 2;
        this.effects[knd].vx = Math.cos(this.effects[knd].angle) * (this.rang(2.5));
        this.effects[knd].vy = Math.sin(this.effects[knd].angle) * (this.rang(2.5));
        this.effects[knd].x = character.x;
        this.effects[knd].y = character.y;
        this.effects[knd].blend = 2;
        this.effects[knd].blend_cnt = 255;
        this.effects[knd].siz = 0.3;
        this.effects[knd].knd = 1;
        this.effects[knd].col = this.rand(4);
        this.effects[knd].img = "die_effect1";
      }
    }
  }

  boss_die_effect(boss) {
    let i, knd;

    if (boss.cnt == 0) {
      if ((knd = this.flag_check(this.effects, this.EFFECT_MAX)) != -1) {
        this.effects[knd].flag = 1;
        this.effects[knd].cnt = 0;
        this.effects[knd].x = boss.x;
        this.effects[knd].y = boss.y;
        this.effects[knd].blend = 2;
        this.effects[knd].blend_cnt = 255;
        this.effects[knd].siz = 0.01;
        this.effects[knd].knd = 5;
        this.effects[knd].col = this.rand(4);
        this.effects[knd].img = "die_effect0";
      }
    }

    for (i = 0; i < 3; i++) {
      if ((knd = this.flag_check(this.effects, this.EFFECT_MAX)) != -1) {
        this.effects[knd].flag = 1;
        this.effects[knd].cnt = 0;
        this.effects[knd].angle = this.rang(Math.PI);
        this.effects[knd].draw_angle = this.effects[knd].angle - Math.PI / 2;
        this.effects[knd].vx = Math.cos(this.effects[knd].angle) * (9 + this.rang(4));
        this.effects[knd].vy = Math.sin(this.effects[knd].angle) * (4 + this.rang(2.5));
        this.effects[knd].x = boss.x + this.rang(10);
        this.effects[knd].y = boss.y + this.rang(10);
        this.effects[knd].blend = 2;
        this.effects[knd].blend_cnt = 255;
        this.effects[knd].siz = 0.3;
        this.effects[knd].knd = 1;
        this.effects[knd].col = this.rand(4);
        this.effects[knd].img = "die_effect1";
      }
    }
  }

  enemy_die_effect(enemy) {
    let knd;

    if ((knd = this.flag_check(this.effects, this.EFFECT_MAX)) != -1) {
      this.effects[knd].flag = 1;
      this.effects[knd].cnt = 0;
      this.effects[knd].x = enemy.x;
      this.effects[knd].y = enemy.y;
      this.effects[knd].blend = 2;
      this.effects[knd].blend_cnt = 255;
      this.effects[knd].siz = 0.01;
      this.effects[knd].knd = 0;
      this.effects[knd].col = enemy.back_col;
      this.effects[knd].img = "die_effect0";
    }

    for (let i = 0; i < 5; i++) {
      if ((knd = this.flag_check(this.effects, this.EFFECT_MAX)) != -1) {
        this.effects[knd].flag = 1;
        this.effects[knd].cnt = 0;
        this.effects[knd].angle = this.rang(Math.PI);
        this.effects[knd].draw_angle = this.effects[knd].angle - Math.PI / 2;
        this.effects[knd].vx = Math.cos(this.effects[knd].angle) * (0.75 + this.rang(0.5));
        this.effects[knd].vy = Math.sin(this.effects[knd].angle) * (0.75 + this.rang(0.5));
        this.effects[knd].x = enemy.x;
        this.effects[knd].y = enemy.y;
        this.effects[knd].blend = 2;
        this.effects[knd].blend_cnt = 255;
        this.effects[knd].siz = 0.3;
        this.effects[knd].knd = 3;
        this.effects[knd].col = enemy.back_col;
        this.effects[knd].img = "die_effect1";
      }
    }
  }

  warp_effect(stage_data) {
    let col, knd;

    for (let i = 0; i < 2; i++) {
      if ((knd = this.flag_check(this.effects, this.EFFECT_MAX)) != -1) {
        this.effects[knd].flag = 1;
        this.effects[knd].cnt = 0;
        this.effects[knd].vx = Number(stage_data[3]);
        this.effects[knd].vy = Number(stage_data[4]);
        this.effects[knd].angle = Math.PI / 4 * i + Math.PI / 4;
        this.effects[knd].draw_angle = this.effects[knd].angle - Math.PI / 2;
        this.effects[knd].knd = 6 + i;
        this.effects[knd].col = col = this.rand(4);
        this.effects[knd].img = "die_effect1";
        this.effects[knd].siz = 0.5;
        this.effects[knd].blend = 2;
        this.effects[knd].blend_cnt = 255;
      }
    }

    if (knd != -1) {
      col = this.effects[knd].col;
    }

    if ((knd = this.flag_check(this.effects, this.EFFECT_MAX)) != -1) {
      this.effects[knd].flag = 1;
      this.effects[knd].cnt = 0;
      this.effects[knd].x = Number(stage_data[3]);
      this.effects[knd].y = Number(stage_data[4]);
      this.effects[knd].knd = 8;
      this.effects[knd].siz = 0.3;
      this.effects[knd].blend = 2;
      this.effects[knd].blend_cnt = 255;
      this.effects[knd].img = "die_effect0";

      do {
        this.effects[knd].col = this.rand(4);
      } while (col == this.effects[knd].col);
    }
  }

  main() {
    for (let i = 0; i < this.EFFECT_MAX; i++) {
      if (this.effects[i].flag > 0) {
        switch (this.effects[i].knd) {
          case 0:
            if (this.effects[i].cnt > 15) {
              this.effects[i].blend_cnt -= 255 / 15;
              this.effects[i].siz += 0.08;
            } else {
              this.effects[i].siz += 0.04;
            }

            this.effects[i].cnt++;

            if (this.effects[i].cnt > 30) {
              this.effects[i].flag = 0;
            }
            break;

          case 1:
            if (this.effects[i].cnt > 10) {
              this.effects[i].blend_cnt -= 255 / 10;
            }

            this.effects[i].siz += 0.05;
            this.effects[i].x += this.effects[i].vx;
            this.effects[i].y += this.effects[i].vy;
            this.effects[i].cnt++;
            if (this.effects[i].cnt > 20) {
              this.effects[i].flag = 0;
            }
            break;

          case 2:
            if (this.effects[i].cnt > 15) {
              this.effects[i].blend_cnt -= 255 / 15;
              this.effects[i].siz += 0.06;
            } else {
              this.effects[i].siz += 0.03;
            }

            this.effects[i].cnt++;

            if (this.effects[i].cnt > 30) {
              this.effects[i].flag = 0;
            }
            break;

          case 3:
            if (this.effects[i].cnt > 10) {
              this.effects[i].blend_cnt -= 255 / 10;
            }

            this.effects[i].siz += 0.03;
            this.effects[i].x += this.effects[i].vx;
            this.effects[i].y += this.effects[i].vy;
            this.effects[i].cnt++;
            if (this.effects[i].cnt > 20) {
              this.effects[i].flag = 0;
            }
            break;

          case 5:
            if (this.effects[i].cnt > 30) {
              this.effects[i].blend_cnt -= 255 / 30;
              this.effects[i].siz += 0.08;
            } else {
              this.effects[i].siz += 0.04;
            }

            this.effects[i].cnt++;

            if (this.effects[i].cnt > 60) {
              this.effects[i].flag = 0;
            }
            break;

          case 6:
            this.effects[i].x = this.effects[i].vx + Math.cos(this.effects[i].angle) * -24;
            this.effects[i].y = this.effects[i].vy + Math.sin(this.effects[i].angle) * -24;
            this.effects[i].mangle = this.effects[i].angle;
            this.effects[i].angle += this.effects[i].cnt * Math.PI / 300;
            this.effects[i].draw_angle = this.effects[i].angle - Math.PI / 2;
            this.effects[i].blend_cnt = 200 + this.rand(55);

            if (this.effects[i].cnt >= 75) {
              if (this.effects[i].cnt == 75)
                this.effects[i].blend = 1;
              this.effects[i].blend_cnt = 12 * (90 - this.effects[i].cnt);
            }

            if (this.effects[i].cnt == 90) {
              this.effects[i].flag = 0;
            }

            this.effects[i].cnt++;
            break;

          case 7:
            this.effects[i].x = this.effects[i].vx + Math.cos(this.effects[i].angle);
            this.effects[i].y = this.effects[i].vy + Math.sin(this.effects[i].angle);
            this.effects[i].mangle = this.effects[i].angle;
            this.effects[i].angle -= this.effects[i].cnt * Math.PI / 300;
            this.effects[i].draw_angle = this.effects[i].angle - Math.PI / 2;
            this.effects[i].blend_cnt = 200 + this.rand(55);

            if (this.effects[i].cnt >= 75) {
              if (this.effects[i].cnt == 75) {
                this.effects[i].blend = 1;
              }

              this.effects[i].blend_cnt = 12 * (90 - this.effects[i].cnt);
            }

            if (this.effects[i].cnt == 90) {
              this.effects[i].flag = 0;
            }

            this.effects[i].cnt++;
            break;

          case 8:
            this.effects[i].blend_cnt = 200 + this.rand(55);
            this.effects[i].siz += 0.008;

            if (this.effects[i].cnt >= 70) {
              if (this.effects[i].cnt == 70) {
                this.effects[i].blend = 1;
              }

              this.effects[i].blend_cnt = 12 * (90 - this.effects[i].cnt);
            }

            if (this.effects[i].cnt == 90) {
              this.effects[i].flag = 0;
            }

            this.effects[i].cnt++;
            break;
        }
      }
    }
  }
}
