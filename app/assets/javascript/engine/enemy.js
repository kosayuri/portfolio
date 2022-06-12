class EnemyStatus {
  flag;
  cnt;
  pattern;
  knd;
  hp;
  item_n;
  back_col;
  x;
  y;
  vx;
  vy;
  sp;
  ang;
  base_sp;
  bltime;
  blknd;
  blknd2;
  col;
  wait;

  input() {
    this.flag = 0;
    this.cnt;
    this.pattern;
    this.knd;
    this.hp;
    this.item_n = [];
    this.back_col;
    this.x;
    this.y;
    this.vx;
    this.vy;
    this.sp;
    this.ang;
    this.base_sp;
    this.bltime;
    this.blknd;
    this.blknd2;
    this.col;
    this.wait;
  }
}

class Enemy extends Game {
  enemys;

  input() {
    this.enemys = [];

    for (let i = 0; i < this.ENEMY_MAX; i++) {
      this.enemys[i] = new EnemyStatus();
      this.enemys[i].input();
    }
  }
  enemy_process(character, enemy_shots) {
    let knd;

    for (let i = 0; i < this.ENEMY_MAX; i++) {
      if (this.enemys[i].flag > 0) {
        if (this.enemys[i].cnt == this.enemys[i].bltime) {
          if ((knd = this.flag_check(enemy_shots, this.SHOT_MAX)) != -1) {
            enemy_shots[knd].flag = 1;
            enemy_shots[knd].cnt = 0;
            enemy_shots[knd].num = i;
            enemy_shots[knd].knd = this.enemys[i].blknd;
          }
        }

        this["enemy_pattern" + this.enemys[i].pattern](this.enemys[i], character);
        this.enemys[i].x += Math.cos(this.enemys[i].ang) * this.enemys[i].sp;
        this.enemys[i].y += Math.sin(this.enemys[i].ang) * this.enemys[i].sp;
        this.enemys[i].x += this.enemys[i].vx;
        this.enemys[i].y += this.enemys[i].vy;
        this.enemys[i].cnt++;

        if (this.flame_over_check(this.enemys[i].x, this.enemys[i].y)) {
          this.enemys[i].flag = 0;

          for (knd = 0; knd < this.SHOT_MAX; knd++) {
            if (i == enemy_shots[knd].num && enemy_shots[knd].flag == 1) {
              enemy_shots[knd].flag = 2;
              break;
            }
          }
        }
      }
    }
  }

  main(character, enemy_shots) {
    this.enemy_process(character, enemy_shots);
  }

  //下がってきて停滞して上に行く
  enemy_pattern0(enemy) {
    let t = enemy.cnt;

    if (t == 0) {
      enemy.ang = Math.PI / 2;
      enemy.base_sp = enemy.sp;
    }

    if (t >= 5 && t < 40) {
      enemy.sp -= enemy.base_sp / 45;
    }

    if (t == 40) {
      enemy.sp = 0;
    }
    if (t >= 40 + enemy.wait && t < 75 + enemy.wait) {
      enemy.sp -= 0.1;
    }
  }

  //下がってきて停滞して左下に行く
  enemy_pattern1(enemy) {
    let t = enemy.cnt;

    if (t == 0) {
      enemy.ang = Math.PI / 2;
      enemy.base_sp = enemy.sp;
    }

    if (t >= 5 && t < 40) {
      enemy.sp -= enemy.base_sp / 45;
    }

    if (t == 40) {
      enemy.sp = 0;
    }

    if (t >= 40 + enemy.wait && t < 75 + enemy.wait) {
      enemy.vx -= 0.03334;
      enemy.vy += 0.06667;
      enemy.ang = Math.atan2(enemy.vy, enemy.vx);
    }
  }

  //下がってきて停滞して右下に行く
  enemy_pattern2(enemy) {
    let t = enemy.cnt;

    if (t == 0) {
      enemy.ang = Math.PI / 2;
      enemy.base_sp = enemy.sp;
    }

    if (t >= 5 && t < 40) {
      enemy.sp -= enemy.base_sp / 45;
    }

    if (t == 40) {
      enemy.sp = 0;
    }

    if (t >= 40 + enemy.wait && t < 75 + enemy.wait) {
      enemy.vx += 0.03334;
      enemy.vy += 0.06667;
      enemy.ang = Math.atan2(enemy.vy, enemy.vx);
    }
  }

  //すばやく降りてきて左へ
  enemy_pattern3(enemy) {
    let t = enemy.cnt;

    if (t == 0) {
      enemy.vy = 5;
      enemy.ang = Math.PI / 2;
    }

    if (t < 100) {
      enemy.vx -= 5 / 100.0;
      enemy.vy -= 5 / 100.0;
      enemy.ang = Math.atan2(enemy.vy, enemy.vx);
    }
  }

  //すばやく降りてきて右へ
  enemy_pattern4(enemy) {
    let t = enemy.cnt;

    if (t == 0) {
      enemy.vy = 5;
      enemy.ang = Math.PI / 2;
    }

    if (t < 100) {
      enemy.vx += 5 / 100.0;
      enemy.vy -= 5 / 100.0;
      enemy.ang = Math.atan2(enemy.vy, enemy.vx);
    }
  }

  //斜め左下へ
  enemy_pattern5(enemy) {
    let t = enemy.cnt;

    if (t == 0) {
      enemy.vx -= 1;
      enemy.vy = 2;
      enemy.ang = Math.atan2(enemy.vy, enemy.vx);
    }
  }

  //斜め右下へ
  enemy_pattern6(enemy) {
    let t = enemy.cnt;

    if (t == 0) {
      enemy.vx += 1;
      enemy.vy = 2;
      enemy.ang = Math.atan2(enemy.vy, enemy.vx);
    }
  }

  //停滞してそのまま左上に
  enemy_pattern7(enemy) {
    let t = enemy.cnt;

    if (t == 0) {
      enemy.ang = Math.PI / 2;
    }

    if (t >= enemy.wait && t < enemy.wait + 35) {
      enemy.vx -= 0.023334;
      enemy.vy -= 0.01;
      enemy.ang = Math.atan2(enemy.vy, enemy.vx);
    }
  }

  //停滞してそのまま右上に
  enemy_pattern8(enemy) {
    let t = enemy.cnt;

    if (t == 0) {
      enemy.ang = Math.PI / 2;
    }

    if (t >= enemy.wait && t < enemy.wait + 35) {
      enemy.vx += 0.023334;
      enemy.vy -= 0.01;
      enemy.ang = Math.atan2(enemy.vy, enemy.vx);
    }
  }

  //停滞してそのまま上に
  enemy_pattern9(enemy) {
    let t = enemy.cnt;

    if (t == 0) {
      enemy.ang = Math.PI / 2;
    }

    if (t >= enemy.wait && t < enemy.wait + 35) {
      enemy.vy -= 0.03334;
    }
  }

  //下がってきてウロウロして上がっていく
  enemy_pattern10(enemy) {
    let t = enemy.cnt;

    if (t == 0) {
      enemy.vy = 4.5;
      enemy.ang = Math.PI / 2;
    }

    if (t >= 10 && t < 40) {
      enemy.vy -= 0.13334;
    }

    if (t == 40) {
      enemy.vy = 0;
    }

    if (t >= 40) {
      if (t % 60 == 0) {
        let r = Math.cos(enemy.ang) < 0 ? 0 : 1;

        enemy.sp = 6 + this.rang(2);
        enemy.ang = this.rang(Math.PI / 4) + Math.PI * r;
      }
      enemy.sp *= 0.95;
    }

    if (t >= 40 + enemy.wait) {
      enemy.vy -= 0.05;
    }
  }

  //途中で180度左回転
  enemy_pattern11(enemy) {
    let t = enemy.cnt;

    if (t == 0) {
      enemy.ang = 0;
    } else {
      if (t >= 70 && t < 120) {
        enemy.ang += Math.PI / 50;
        enemy.sp += 0.04;
      }
    }
  }

  //途中で180度右回転
  enemy_pattern12(enemy) {
    let t = enemy.cnt;

    if (t == 0) {
      enemy.ang = Math.PI;
    } else {
      if (t >= 70 && t < 120) {
        enemy.ang -= Math.PI / 50;
        enemy.sp += 0.04;
      }
    }
  }

  //下に突っ込んできて水から浮くように途中で上がる
  enemy_pattern13(enemy) {
    let t = enemy.cnt;

    if (t == 0) {
      enemy.ang = Math.PI / 2 + this.rang(Math.PI / 7);
    } else {
      if (t > 20) {
        enemy.vy -= 0.12;
      }
    }
  }

  //右に直進
  enemy_pattern14(enemy) {
    let t = enemy.cnt;

    if (t == 0) {
      enemy.ang = 0;
    }
  }

  //上に直進
  enemy_pattern15(enemy) {
    let t = enemy.cnt;

    if (t == 0) {
      enemy.ang = Math.PI / 2;
    }
  }

  //左に直進
  enemy_pattern16(enemy) {
    let t = enemy.cnt;

    if (t == 0) {
      enemy.ang = Math.PI;
    }
  }

  //下に直進
  enemy_pattern17(enemy) {
    let t = enemy.cnt;

    if (t == 0) {
      enemy.ang = Math.PI * 1.5;
    }
  }

  //自機に直進
  enemy_pattern18(enemy, character) {
    let t = enemy.cnt, x, y;

    if (t == 0 || t == 120 || t == 240) {
      enemy.ang = Math.atan2(y = character.y - enemy.y, x = character.x - enemy.x);
      enemy.sp = Math.sqrt(x * x + y * y) / 50;
    } else {
      if (t == 60 || t == 180) {
        enemy.sp = 0;
      }
    }
  }
}
