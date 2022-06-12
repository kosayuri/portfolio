class CharacterBulletStatus {
  constructor() {
    this.x;
    this.y;
    this.angle;
    this.power;
    this.spd;
    this.flag = 0;
    this.cnt;
    this.knd;
  }
}

class CharacterBullet extends Game {
  bullet;

  input() {
    this.bullet = [];
    for (let i = 0; i < this.CHARACTER_BULLET_MAX; i++) {
      this.bullet[i] = new CharacterBulletStatus();
    }
  }

  main(character, enemys, boss, sound) {
    if (character.shot % 4 === 1 && character.flag == 1) {
      let knd;

      if (character.pow < 100) {
        for (let i = 0; i < 2; i++) {
          if ((knd = this.flag_check(this.bullet, this.CHARACTER_BULLET_MAX)) != -1) {
            this.bullet[knd].flag = 1;
            this.bullet[knd].knd = 0;
            this.bullet[knd].x = character.x + (character.slow > 0 ? 6 * i - 3 : 14 * i - 7);
            this.bullet[knd].y = character.y - 20;
            this.bullet[knd].angle = -Math.PI / 2;
            this.bullet[knd].power = 50;
            this.bullet[knd].spd = 20;
            this.bullet[knd].cnt = 0;
          }
        }
      } else
        if (character.pow < 200) {
          for (let i = 0; i < 2; i++) {
            if ((knd = this.flag_check(this.bullet, this.CHARACTER_BULLET_MAX)) != -1) {
              this.bullet[knd].flag = 1;
              this.bullet[knd].knd = 0;
              this.bullet[knd].x = character.x + (character.slow > 0 ? 6 * i - 3 : 14 * i - 7);
              this.bullet[knd].y = character.y - 20;
              this.bullet[knd].angle = -Math.PI / 2;
              this.bullet[knd].power = 40;
              this.bullet[knd].spd = 20;
              this.bullet[knd].cnt = 0;
            }
          }

          if ((knd = this.flag_check(this.bullet, this.CHARACTER_BULLET_MAX)) != -1) {
            this.bullet[knd].flag = 1;
            this.bullet[knd].knd = 1;
            this.bullet[knd].x = character.x;
            this.bullet[knd].y = character.y + 5;
            this.bullet[knd].angle = -Math.PI / 2;
            this.bullet[knd].power = 32;
            this.bullet[knd].spd = 20;
            this.bullet[knd].cnt = 0;
          }
        } else
          if (character.pow < 300) {
            for (let i = 0; i < 4; i++) {
              if ((knd = this.flag_check(this.bullet, this.CHARACTER_BULLET_MAX)) != -1) {
                this.bullet[knd].flag = 1;
                this.bullet[knd].knd = 0;
                this.bullet[knd].x = character.x + (character.slow == 0 ? (i < 2 ? 14 * i - 7 : 48 * (i - 2) - 24) : (i < 2 ? 10 * i - 5 : 28 * (i - 2) - 14));
                this.bullet[knd].y = character.y - (i < 2 ? 20 : 25);
                this.bullet[knd].angle = -Math.PI / 2;
                this.bullet[knd].power = 23;
                this.bullet[knd].spd = 20;
                this.bullet[knd].cnt = 0;
              }
            }

            if ((knd = this.flag_check(this.bullet, this.CHARACTER_BULLET_MAX)) != -1) {
              this.bullet[knd].flag = 1;
              this.bullet[knd].knd = 1;
              this.bullet[knd].x = character.x;
              this.bullet[knd].y = character.y + 15;
              this.bullet[knd].angle = -Math.PI / 2;
              this.bullet[knd].power = 34;
              this.bullet[knd].spd = 20;
              this.bullet[knd].cnt = 0;
            }
          } else
            if (character.pow < 400) {
              for (let i = 0; i < 4; i++) {
                if ((knd = this.flag_check(this.bullet, this.CHARACTER_BULLET_MAX)) != -1) {
                  this.bullet[knd].flag = 1;
                  this.bullet[knd].knd = 0;
                  this.bullet[knd].x = character.x + (character.slow == 0 ? (i < 2 ? 14 * i - 7 : 48 * (i - 2) - 24) : (i < 2 ? 10 * i - 5 : 28 * (i - 2) - 14));
                  this.bullet[knd].y = character.y - (i < 2 ? 20 : 25);
                  this.bullet[knd].angle = -Math.PI / 2;
                  this.bullet[knd].power = 24;
                  this.bullet[knd].spd = 20;
                  this.bullet[knd].cnt = 0;
                }
              }

              for (let i = 0; i < 2; i++) {
                if ((knd = this.flag_check(this.bullet, this.CHARACTER_BULLET_MAX)) != -1) {
                  this.bullet[knd].flag = 1;
                  this.bullet[knd].knd = 1;
                  this.bullet[knd].x = character.x + (-8 + 16 * i);
                  this.bullet[knd].y = character.y + 15;
                  this.bullet[knd].angle = -Math.PI / 2;
                  this.bullet[knd].power = 19;
                  this.bullet[knd].spd = 20;
                  this.bullet[knd].cnt = 0;
                }
              }
            } else {
              for (let i = 0; i < 4; i++) {
                if ((knd = this.flag_check(this.bullet, this.CHARACTER_BULLET_MAX)) != -1) {
                  this.bullet[knd].flag = 1;
                  this.bullet[knd].knd = 0;
                  this.bullet[knd].x = character.x + (character.slow == 0 ? (i < 2 ? 14 * i - 7 : 48 * (i - 2) - 24) : (i < 2 ? 10 * i - 5 : 28 * (i - 2) - 14));
                  this.bullet[knd].y = character.y - (i < 2 ? 20 : 25);
                  this.bullet[knd].angle = -Math.PI / 2;
                  this.bullet[knd].power = 25;
                  this.bullet[knd].spd = 20;
                  this.bullet[knd].cnt = 0;
                }
              }

              for (let i = 0; i < 2; i++) {
                if ((knd = this.flag_check(this.bullet, this.CHARACTER_BULLET_MAX)) != -1) {
                  this.bullet[knd].flag = 1;
                  this.bullet[knd].knd = 1;
                  this.bullet[knd].x = character.x + (-8 + 16 * i);
                  this.bullet[knd].y = character.y + 15;
                  this.bullet[knd].angle = -Math.PI / 2;
                  this.bullet[knd].power = 23;
                  this.bullet[knd].spd = 20;
                  this.bullet[knd].cnt = 0;
                }
              }
            }

      sound.character_shot.flag = 1;
    }

    for (let i = 0; i < this.CHARACTER_BULLET_MAX; i++) {
      if (this.bullet[i].flag > 0) {
        if (this.bullet[i].flag > 0 && this.bullet[i].knd == 1) {
          if (boss.flag != 2) {
            let x, y, distance, closest_enemy_flag, closest_enemy = -1;

            for (let k = 0; k < this.ENEMY_MAX; k++) {
              if (enemys[k].flag > 0) {
                x = enemys[k].x - this.bullet[i].x;
                y = enemys[k].y - this.bullet[i].y;
                if ((distance = x * x + y * y) < closest_enemy || closest_enemy == -1) {
                  closest_enemy = distance;
                  closest_enemy_flag = k;
                }
              }
            }

            if (closest_enemy != -1) {
              this.bullet[i].angle = Math.atan2(enemys[closest_enemy_flag].y - this.bullet[i].y, enemys[closest_enemy_flag].x - this.bullet[i].x);
            }

            closest_enemy = -1;
          } else
            this.bullet[i].angle = Math.atan2(boss.y - this.bullet[i].y, boss.x - this.bullet[i].x);
        }

        this.bullet[i].x += this.bullet[i].spd * Math.cos(this.bullet[i].angle);
        this.bullet[i].y += this.bullet[i].spd * Math.sin(this.bullet[i].angle);

        if (this.flame_over_check(this.bullet[i].x, this.bullet[i].y)) {
          this.bullet[i].flag = 0;
          continue;
        }

        this.bullet[i].cnt++;
      }
    }
  }
}
