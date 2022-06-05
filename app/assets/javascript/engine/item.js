class ItemStatus {
  constructor() {
    this.flag = 0;
    this.cnt;
    this.knd;
    this.value;
    this.blend_cnt = 255;
    this.big_flag = false;
    this.x;
    this.y;
    this.vx;
    this.vy;
  }
}

class Item extends Game {
  items;

  input() {
    this.items = [];

    for (let i = 0; i < this.ITEM_MAX; i++) {
      this.items[i] = new ItemStatus();
    }
  }

  boss_die_bullet_item(boss) {
    let knd;

    for (let i = 0; i < this.BOSS_BULLET_MAX; i++) {
      if (boss.bullet[i].flag > 0) {
        boss.bullet[i].flag = 0;

        if ((knd = this.flag_check(this.items, this.ITEM_MAX)) != -1) {
          this.items[knd].flag = 2;
          this.items[knd].cnt = 0;
          this.items[knd].knd = 2;
          this.items[knd].x = boss.bullet[i].x;
          this.items[knd].y = boss.bullet[i].y;
          this.items[knd].vx = 0;
          this.items[knd].vy = -5;
          this.items[knd].value = 1000;
          this.items[knd].big_flag = false;
        }
      }
    }
  }

  boss_die_item(boss) {
    let knd;

    for (let i = 0; i < 3; i++) {
      let item_value = boss.item_n[i];

      while (item_value > 0 && (knd = this.flag_check(this.items, this.ITEM_MAX)) != -1) {
        switch (i) {
          case 0:
            if (item_value < 5) {
              this.items[knd].value = item_value;
              this.items[knd].big_flag = false;
            } else {
              if (this.rand(1))
                this.items[knd].value = 5, this.items[knd].big_flag = true;
              else
                this.items[knd].value = 3, this.items[knd].big_flag = false;
            }
            break;

          case 1:
            if (item_value < 2) {
              this.items[knd].value = item_value;
              this.items[knd].big_flag = false;
            } else {
              if (this.rand(1))
                this.items[knd].value = 2, this.items[knd].big_flag = true;
              else
                this.items[knd].value = 1, this.items[knd].big_flag = false;
            }
            break;

          case 2:
            if (item_value < 60000) {
              this.items[knd].value = item_value;
              this.items[knd].big_flag = false;
            } else {
              if (this.rand(1))
                this.items[knd].value = 60000, this.items[knd].big_flag = true;
              else
                this.items[knd].value = 30000, this.items[knd].big_flag = false;
            }
            break;
        }

        this.items[knd].flag = 1;
        this.items[knd].cnt = 0;
        this.items[knd].knd = i;
        this.items[knd].x = boss.x + this.rang(50);
        this.items[knd].y = boss.y + this.rang(50);
        this.items[knd].vx = 0;
        this.items[knd].vy = -5;
        item_value -= this.items[knd].value;
      }
    }
  }

  enemy_item(enemy) {
    let knd;

    for (let i = 0; i < 3; i++) {
      while (enemy.item_n[i] > 0 && (knd = this.flag_check(this.items, this.ITEM_MAX)) != -1) {
        switch (i) {
          case 0:
            if (enemy.item_n[i] < 5) {
              this.items[knd].value = enemy.item_n[i];
              this.items[knd].big_flag = false;
            } else {
              if (this.rand(1))
                this.items[knd].value = 5, this.items[knd].big_flag = true;
              else
                this.items[knd].value = 3, this.items[knd].big_flag = false;
            }
            break;

          case 1:
            if (enemy.item_n[i] < 2) {
              this.items[knd].value = enemy.item_n[i];
              this.items[knd].big_flag = false;
            } else {
              if (this.rand(1))
                this.items[knd].value = 2, this.items[knd].big_flag = true;
              else
                this.items[knd].value = 1, this.items[knd].big_flag = false;
            }
            break;

          case 2:
            if (enemy.item_n[i] < 60000) {
              this.items[knd].value = enemy.item_n[i];
              this.items[knd].big_flag = false;
            } else {
              if (this.rand(1))
                this.items[knd].value = 60000, this.items[knd].big_flag = true;
              else
                this.items[knd].value = 30000, this.items[knd].big_flag = false;
            }
            break;
        }

        this.items[knd].flag = 1;
        this.items[knd].cnt = 0;
        this.items[knd].knd = i;
        this.items[knd].x = enemy.x + this.rang(50);
        this.items[knd].y = enemy.y + this.rang(50);
        this.items[knd].vx = 0;
        this.items[knd].vy = -5;
        enemy.item_n[i] -= this.items[knd].value;
      }
    }
  }

  main(character, enemys, enemy_shots, boss, out, sound) {
    let angle, distance_x, distance_y, before_get_value;

    for (let i = 0; i < this.ITEM_MAX; i++) {
      if (this.items[i].flag > 0) {
        if (character.flag != 3) {
          if (character.y < 200 && this.items[i].cnt > 0) {
            this.items[i].flag = 2;
          }

          distance_x = character.x - this.items[i].x;
          distance_y = character.y - this.items[i].y;

          if (this.items[i].flag == 2 && character.flag == 1) {
            angle = Math.atan2(distance_y, distance_x);
            this.items[i].vx = Math.cos(angle) * 8;
            this.items[i].vy = Math.sin(angle) * 8;
          } else
            if (distance_x ** 2 + distance_y ** 2 < 2500 && character.slow > 0) {
              angle = Math.atan2(distance_y, distance_x);
              this.items[i].vx = Math.cos(angle) * 2;
              this.items[i].vy = Math.sin(angle) * 2;
            }
          if (this.items[i].flag == 2 && character.flag == 1) {
            angle = Math.atan2(distance_y, distance_x);
            this.items[i].vx = Math.cos(angle) * 8;
            this.items[i].vy = Math.sin(angle) * 8;
          }
        } else {
          if (character.cnt == 1) {
            this.items[i].vx = 0;
            this.items[i].vy = 0;
          }
        }

        this.items[i].x += this.items[i].vx;
        this.items[i].y += this.items[i].vy;
        this.items[i].cnt++;

        if ((this.items[i].flag == 1 || character.flag == 3) && this.items[i].vy <= 1.5) {
          this.items[i].vy += 0.07;
        }
        if (distance_x ** 2 + distance_y ** 2 <= (200 + this.items[i].big_flag ? 625 : 400) && character.flag != 3) {
          switch (this.items[i].knd) {
            case 0:
              if (character.pow < 400) {
                before_get_value = character.pow / 100 | 0;
                character.pow += this.items[i].value;

                if ((character.pow / 100 | 0) > before_get_value) {
                  sound.power_up.flag = 1;
                }
              }

              if (character.pow > 400) {
                character.pow = 400;
                character.scr += this.items[i].value;
              }
              break;

            case 1:
              character.life_point += this.items[i].value;

              if (character.life_point >= 100) {
                sound.power_up.flag = 1;
                character.life_point -= 100;
                character.life++;
              }
              break;

            case 2:
              character.scr += this.items[i].value;
              break;
          }
          sound.item_get.flag = 1;
          this.items[i].flag = 0;
        } else
          if (this.items[i].y > this.FLAME_MAX_Y + 50 && this.items[i].flag != 2) {
            this.items[i].flag = 0;
          } else
            if (out.item_enemy_out(this.items[i], enemys, enemy_shots, boss))
              this.items[i].blend_cnt = 70;
            else
              if (this.items[i].blend_cnt < 255)
                this.items[i].blend_cnt += 185 / 15;
      }
    }
  }
}
