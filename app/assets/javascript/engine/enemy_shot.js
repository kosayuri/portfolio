
class EnemyShotStatus {
  flag;
  knd;
  cnt;
  num;
  base_angle;
  base_spd;
  basex;
  basey;
  bullet;

  input(shot_bullet_max) {
    this.flag = 0;
    this.knd;
    this.cnt;
    this.num;
    this.base_angle;
    this.base_spd;
    this.basex;
    this.basey;
    this.bullet = [];

    for (let i = 0; i < shot_bullet_max; i++) {
      this.bullet[i] = new Bullet();
    }
  }
}

class EnemyShot extends Game {
  shots;

  input() {
    this.shots = [];

    for (let i = 0; i < this.SHOT_MAX; i++) {
      this.shots[i] = new EnemyShotStatus();
      this.shots[i].input(this.SHOT_BULLET_MAX);
    }
  }

  enemy_shot_process(character, enemys, sound) {
    for (let i = 0; i < this.SHOT_MAX; i++) {
      if (this.shots[i].flag > 0) {
        let cnt = 0;

        this["shot_bullet_H" + this.shots[i].knd](character, enemys, sound, this.shots[i]);
        this.shots[i].cnt++;

        for (let knd = 0; knd < this.SHOT_BULLET_MAX; knd++) {
          if (this.shots[i].bullet[knd].flag > 0) {
            cnt++;
            this.shots[i].bullet[knd].x += Math.cos(this.shots[i].bullet[knd].angle) * this.shots[i].bullet[knd].spd;
            this.shots[i].bullet[knd].y += Math.sin(this.shots[i].bullet[knd].angle) * this.shots[i].bullet[knd].spd;
            this.shots[i].bullet[knd].cnt++;

            if (this.flame_over_check(this.shots[i].bullet[knd].x, this.shots[i].bullet[knd].y) &&
              this.shots[i].bullet[knd].cnt > this.shots[i].bullet[knd].till) {
              this.shots[i].bullet[knd].flag = 0;
              this.shots[i].bullet[knd].till = 0;
            }
          }
        }

        if (cnt === 0 && this.shots[i].flag == 2) {
          this.shots[i].flag = 0;
        }
      }
    }
  }

  main(character, enemys, sound) {
    this.enemy_shot_process(character, enemys, sound);
  }

  //1発だけ、自機に向かって直線発射
  shot_bullet_H0(character, enemys, sound, shot) {
    let knd;

    if (shot.cnt == 0) {
      if (shot.flag != 2 && (knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
        shot.bullet[knd].knd = enemys[shot.num].blknd2;
        shot.bullet[knd].angle = this.attack_atan2(character, enemys[shot.num]);
        shot.bullet[knd].flag = 1;
        shot.bullet[knd].x = enemys[shot.num].x;
        shot.bullet[knd].y = enemys[shot.num].y;
        shot.bullet[knd].col = enemys[shot.num].col;
        shot.bullet[knd].cnt = 0;
        shot.bullet[knd].spd = 3;
        sound.enemy_shot.flag = 1;
      }
    }
  }

  //100カウント中に10発、自機に向かって直線発射(常に自機狙い)
  shot_bullet_H1(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (t >= 0 && t < 95 && t % 10 == 0) {
      if (shot.flag != 2 && (knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
        shot.bullet[knd].knd = enemys[shot.num].blknd2;
        shot.bullet[knd].angle = this.attack_atan2(character, enemys[shot.num]);
        shot.bullet[knd].flag = 1;
        shot.bullet[knd].x = enemys[shot.num].x;
        shot.bullet[knd].y = enemys[shot.num].y;
        shot.bullet[knd].col = enemys[shot.num].col;
        shot.bullet[knd].cnt = 0;
        shot.bullet[knd].spd = 3;
        sound.enemy_shot.flag = 1;
      }
    }
  }

  //100カウント中に10発、自機に向かって直線発射(角度記憶)
  shot_bullet_H2(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (t >= 0 && t < 95 && t % 10 == 0) {
      if (t == 0) {
        shot.base_angle = this.attack_atan2(character, enemys[shot.num]);
      }

      if (shot.flag != 2 && (knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
        shot.bullet[knd].knd = enemys[shot.num].blknd2;
        shot.bullet[knd].angle = shot.base_angle;
        shot.bullet[knd].flag = 1;
        shot.bullet[knd].x = enemys[shot.num].x;
        shot.bullet[knd].y = enemys[shot.num].y;
        shot.bullet[knd].col = enemys[shot.num].col;
        shot.bullet[knd].cnt = 0;
        shot.bullet[knd].spd = 3;
        sound.enemy_shot.flag = 1;
      }
    }
  }

  //100カウント中に10発、自機に向かってスピード変化直線発射
  shot_bullet_H3(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (t >= 0 && t < 95 && t % 10 == 0) {
      if (shot.flag != 2 && (knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
        shot.bullet[knd].knd = enemys[shot.num].blknd2;
        shot.bullet[knd].angle = this.attack_atan2(character, enemys[shot.num]);
        shot.bullet[knd].flag = 1;
        shot.bullet[knd].x = enemys[shot.num].x;
        shot.bullet[knd].y = enemys[shot.num].y;
        shot.bullet[knd].col = enemys[shot.num].col;
        shot.bullet[knd].cnt = 0;
        shot.bullet[knd].spd = (2 + 5.0 / 100 * t);
        sound.enemy_shot.flag = 1;
      }
    }
  }

  //0.5秒に1回ずつ円形発射
  shot_bullet_H4(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (t >= 0 && t < 110 && t % 20 == 0) {
      let angle = this.attack_atan2(character, enemys[shot.num]);

      for (let i = 0; i < 20; i++) {
        if (shot.flag != 2 && (knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
          shot.bullet[knd].knd = enemys[shot.num].blknd2;
          shot.bullet[knd].angle = angle + Math.PI * 2 / 20 * i;
          shot.bullet[knd].flag = 1;
          shot.bullet[knd].x = enemys[shot.num].x;
          shot.bullet[knd].y = enemys[shot.num].y;
          shot.bullet[knd].col = enemys[shot.num].col;
          shot.bullet[knd].cnt = 0;
          shot.bullet[knd].spd = 4;
          sound.enemy_shot.flag = 1;
        }
      }
    }
  }

  //ばらまきショット
  shot_bullet_H5(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (t >= 0 && t < 119 && t % 2 == 0) {
      if (shot.flag != 2 && (knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
        shot.bullet[knd].knd = enemys[shot.num].blknd2;
        shot.bullet[knd].angle = this.attack_atan2(character, enemys[shot.num]) + this.rang(Math.PI / 4);
        shot.bullet[knd].flag = 1;
        shot.bullet[knd].x = enemys[shot.num].x;
        shot.bullet[knd].y = enemys[shot.num].y;
        shot.bullet[knd].col = enemys[shot.num].col;
        shot.bullet[knd].cnt = 0;
        shot.bullet[knd].spd = 3 + this.rang(1.5);
        sound.enemy_shot.flag = 1;
      }
    }
  }

  //ばらまきショット(減速)
  shot_bullet_H6(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (t >= 0 && t < 119 && t % 2 == 0) {
      if (shot.flag != 2 && (knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
        shot.bullet[knd].knd = enemys[shot.num].blknd2;
        shot.bullet[knd].angle = this.attack_atan2(character, enemys[shot.num]) + this.rang(Math.PI / 4);
        shot.bullet[knd].flag = 1;
        shot.bullet[knd].x = enemys[shot.num].x;
        shot.bullet[knd].y = enemys[shot.num].y;
        shot.bullet[knd].col = enemys[shot.num].col;
        shot.bullet[knd].cnt = 0;
        shot.bullet[knd].spd = 4 + this.rang(2);
        sound.enemy_shot.flag = 1;
      }
    }

    for (let i = 0; i < this.SHOT_BULLET_MAX; i++) {
      if (shot.bullet[i].spd > 1.7)
        shot.bullet[i].spd -= 0.04;
    }
  }

  shot_bullet_H7(character, enemys, sound, shot) {
    shot.flag = 0;
  }

  //3つ横並びにショット
  shot_bullet_H9(character, enemys, sound, shot) {
    let knd, t = shot.cnt,
      angle = this.attack_atan2(character, enemys[shot.num]) + Math.PI / 2,
      x = enemys[shot.num].x - Math.cos(angle) * 20,
      y = enemys[shot.num].y - Math.sin(angle) * 20;

    if (shot.flag != 2 && t % 40 < 21 && t % 7 == 0 && t < 110) {
      for (let i = 0; i < 3; i++) {
        if ((knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
          shot.bullet[knd].flag = 1;
          shot.bullet[knd].cnt = 0;
          shot.bullet[knd].col = enemys[shot.num].col;
          shot.bullet[knd].knd = enemys[shot.num].blknd2;
          shot.bullet[knd].x = x;
          shot.bullet[knd].y = y;
          shot.bullet[knd].angle = angle - Math.PI / 2;
          shot.bullet[knd].spd = 3.5;
          shot.bullet[knd].status = 0;
        }

        x += Math.cos(angle) * 20;
        y += Math.sin(angle) * 20;
      }

      sound.enemy_shot.flag = 1;
    }
  }

  //円状のまま一度止まってからショット
  shot_bullet_H10(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (t == 0) {
      for (let i = 0; i < 30; i++) {
        if ((knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
          shot.bullet[knd].flag = 1;
          shot.bullet[knd].cnt = 0;
          shot.bullet[knd].col = enemys[shot.num].col;
          shot.bullet[knd].knd = enemys[shot.num].blknd2;
          shot.bullet[knd].x = enemys[shot.num].x + Math.cos(Math.PI * 2 / 30 * i) * 120;
          shot.bullet[knd].y = enemys[shot.num].y + Math.sin(Math.PI * 2 / 30 * i) * 120;
          shot.bullet[knd].angle = Math.PI * 2 / 30 * i;
          shot.bullet[knd].status = 0;
          shot.bullet[knd].spd = 0;
          shot.bullet[knd].till = 200;
        }
      }

      sound.enemy_shot.flag = 1;
    }

    for (let i = 0; i < this.SHOT_BULLET_MAX; i++) {
      if (shot.bullet[i].flag > 0) {
        if (t == 60) {
          shot.bullet[i].spd = 3;
          shot.bullet[i].angle = this.attack_atan2(character, shot.bullet[i]);
        }
      }
    }
  }

  //江場のままショット
  shot_bullet_H11(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (t == 0) {
      for (let i = 0; i < 30; i++) {
        if ((knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
          shot.bullet[knd].flag = 1;
          shot.bullet[knd].cnt = 0;
          shot.bullet[knd].col = enemys[shot.num].col;
          shot.bullet[knd].knd = enemys[shot.num].blknd2;
          shot.bullet[knd].x = enemys[shot.num].x + Math.cos(Math.PI * 2 / 30 * i) * 120;
          shot.bullet[knd].y = enemys[shot.num].y + Math.sin(Math.PI * 2 / 30 * i) * 120;
          shot.bullet[knd].angle = this.attack_atan2(character, shot.bullet[knd]);
          shot.bullet[knd].status = 0;
          shot.bullet[knd].spd = 0;
          shot.bullet[knd].till = 200;
        }
      }

      sound.enemy_shot.flag = 1;
    }

    for (let i = 0; i < this.SHOT_BULLET_MAX; i++) {
      if (shot.bullet[i].flag > 0) {
        if (t < 90) {
          shot.bullet[i].spd += 0.05;
        }
      }
    }
  }

  //竜巻状のショット
  shot_bullet_H12(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (t == 0) {
      for (let i = 0; i < 50; i++) {
        if ((knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
          shot.bullet[knd].flag = 1;
          shot.bullet[knd].cnt = 0;
          shot.bullet[knd].col = enemys[shot.num].col;
          shot.bullet[knd].knd = enemys[shot.num].blknd2;
          shot.bullet[knd].x = enemys[shot.num].x + this.rang(40);
          shot.bullet[knd].y = enemys[shot.num].y + this.rang(40);
          shot.bullet[knd].base_angle = this.attack_atan2(character, enemys[shot.num]);
          shot.bullet[knd].angle = this.rang(Math.PI);
          shot.bullet[knd].rem_spd = 0;
          shot.bullet[knd].spd = 0;
          shot.bullet[knd].status = i % 2;
        }
      }

      sound.enemy_shot.flag = 1;
    }

    knd = t < 60 ? t : 60;

    for (let i = 0; i < this.SHOT_BULLET_MAX; i++) {
      if (shot.bullet[i].flag > 0) {
        shot.bullet[i].angle += shot.bullet[i].status ? Math.PI * 2 / (200 - knd) : Math.PI * 2 / (200 - knd);

        if (shot.bullet[i].spd < 6) {
          shot.bullet[i].spd += 0.01;
        }

        shot.bullet[i].rem_spd += 0.005;
        shot.bullet[i].x += Math.cos(shot.bullet[i].base_angle) * shot.bullet[i].rem_spd;
        shot.bullet[i].y += Math.sin(shot.bullet[i].base_angle) * shot.bullet[i].rem_spd;
      }
    }
  }

  //竜巻状から拡散ショット
  shot_bullet_H13(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (t == 0) {
      for (let i = 0; i < 50; i++) {
        if ((knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
          shot.bullet[knd].flag = 1;
          shot.bullet[knd].cnt = 0;
          shot.bullet[knd].col = enemys[shot.num].col;
          shot.bullet[knd].knd = enemys[shot.num].blknd2;
          shot.bullet[knd].x = enemys[shot.num].x + this.rang(60);
          shot.bullet[knd].y = enemys[shot.num].y + this.rang(60);
          shot.bullet[knd].angle = this.rang(Math.PI);
          shot.bullet[knd].spd = 0;
          shot.bullet[knd].status = i % 2;
        }
      }
      sound.enemy_shot.flag = 1;
    }

    knd = t < 60 ? t : 60;

    for (let i = 0; i < this.SHOT_BULLET_MAX; i++) {
      if (shot.bullet[i].flag > 0) {
        if (shot.bullet[i].cnt < 180) {
          shot.bullet[i].angle += shot.bullet[i].status ? Math.PI * 2 / (200 - knd) : Math.PI * 2 / (200 - knd);
        }
        shot.bullet[i].spd += 0.02;
      }
    }
  }

  //自機に対して水平状に出現して自機に向かってショット
  shot_bullet_H14(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (t == 0) {
      let angle = this.attack_atan2(character, enemys[shot.num]);
      let x = enemys[shot.num].x - Math.cos(angle + Math.PI / 2) * 90;
      let y = enemys[shot.num].y - Math.sin(angle + Math.PI / 2) * 90;

      for (let i = 0; i < 13; i++) {
        if ((knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
          shot.bullet[knd].flag = 1;
          shot.bullet[knd].cnt = 0;
          shot.bullet[knd].col = enemys[shot.num].col;
          shot.bullet[knd].knd = enemys[shot.num].blknd2;
          shot.bullet[knd].angle = angle;
          shot.bullet[knd].x = x;
          shot.bullet[knd].y = y;
          shot.bullet[knd].base_angle = this.attack_atan2(character, shot.bullet[knd]);
          shot.bullet[knd].spd = 0;
          shot.bullet[knd].status = 60;
        }

        x += Math.cos(angle + Math.PI / 2) * 180 / 12;
        y += Math.sin(angle + Math.PI / 2) * 180 / 12;
      }

      sound.enemy_shot.flag = 1;
    }

    for (let i = 0; i < this.SHOT_BULLET_MAX; i++) {
      if (shot.bullet[i].flag > 0) {
        if (shot.bullet[i].status == shot.bullet[i].cnt) {
          shot.bullet[i].spd = 5;
          shot.bullet[i].angle = shot.bullet[i].base_angle;
        }
      }
    }
  }

  //H14の5連バージョン
  shot_bullet_H15(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (shot.flag != 2 && t < 125 && t % 30 == 0) {
      let angle = this.attack_atan2(character, enemys[shot.num]);
      let x = enemys[shot.num].x - Math.cos(angle + Math.PI / 2) * 90;
      let y = enemys[shot.num].y - Math.sin(angle + Math.PI / 2) * 90;

      for (let i = 0; i < 13; i++) {
        if ((knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
          shot.bullet[knd].flag = 1;
          shot.bullet[knd].cnt = 0;
          shot.bullet[knd].col = enemys[shot.num].col;
          shot.bullet[knd].knd = enemys[shot.num].blknd2;
          shot.bullet[knd].angle = angle;
          shot.bullet[knd].x = x;
          shot.bullet[knd].y = y;
          shot.bullet[knd].base_angle = this.attack_atan2(character, shot.bullet[knd]);
          shot.bullet[knd].spd = 0;
          shot.bullet[knd].status = 60;
          x += Math.cos(angle + Math.PI / 2) * 180 / 12;
          y += Math.sin(angle + Math.PI / 2) * 180 / 12;
        }

        sound.enemy_shot.flag = 1;
      }
    }

    for (let i = 0; i < this.SHOT_BULLET_MAX; i++) {
      if (shot.bullet[i].flag > 0) {
        if (shot.bullet[i].status == shot.bullet[i].cnt) {
          shot.bullet[i].spd = 5;
          shot.bullet[i].angle = shot.bullet[i].base_angle;
        }
      }
    }
  }

  //無限状のショット
  shot_bullet_H16(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (shot.flag != 2 && t < 59) {
      if (t == 0) {
        shot.base_angle = this.attack_atan2(character, enemys[shot.num]) + Math.PI / 14 * 1.27;
      }

      for (let i = 0; i < 4; i++) {
        if ((knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
          shot.bullet[knd].flag = 1;
          shot.bullet[knd].cnt = 0;
          shot.bullet[knd].col = enemys[shot.num].col;
          shot.bullet[knd].knd = enemys[shot.num].blknd2;
          shot.bullet[knd].angle = shot.base_angle + Math.PI * 2 / 4 * i;
          shot.bullet[knd].x = enemys[shot.num].x;
          shot.bullet[knd].y = enemys[shot.num].y;
          shot.bullet[knd].spd = 6;
        }
      }

      if (t % 2) {
        sound.enemy_shot.flag = 1;
      }
    }

    for (let i = 0; i < this.SHOT_BULLET_MAX; i++) {
      if (shot.bullet[i].flag > 0) {
        shot.bullet[i].angle += Math.sin(Math.PI * 2 / 40 * shot.bullet[i].cnt) * Math.PI / 7;
        if (shot.bullet[i].cnt < 120)
          shot.bullet[i].spd += 0.02;
      }
    }
  }

  //花状のショット
  shot_bullet_H17(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (t == 0) {
      let direction = this.rand(1);
      let angle = this.rang(Math.PI);

      for (let i = 0; i < 60; i++) {
        let wave = Math.sin(Math.PI * 2 / 10 * i) * 20 + 90;

        if ((knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
          shot.bullet[knd].flag = 1;
          shot.bullet[knd].cnt = 0;
          shot.bullet[knd].col = enemys[shot.num].col;
          shot.bullet[knd].knd = enemys[shot.num].blknd2;
          shot.bullet[knd].angle = Math.PI * 2 / 60 * i + angle;
          shot.bullet[knd].x = Math.cos(shot.bullet[knd].angle) * wave + enemys[shot.num].x;
          shot.bullet[knd].y = Math.sin(shot.bullet[knd].angle) * wave + enemys[shot.num].y;
          shot.bullet[knd].status = direction;
          shot.bullet[knd].angle += (direction ? Math.PI / 2 : -Math.PI / 2);
          shot.bullet[knd].spd = 4;
        }
      }

      sound.enemy_shot.flag = 1;
    }

    for (let i = 0; i < this.SHOT_BULLET_MAX; i++) {
      if (shot.bullet[i].flag > 0) {
        if (t < 75) {
          shot.bullet[i].angle += shot.bullet[i].status ? Math.PI * 2 / 100 : -Math.PI * 2 / 100;
        }
      }
    }
  }

  //H17のcolがランダムバージョン
  shot_bullet_H18(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (t == 0) {
      let direction = this.rand(1), angle = this.rang(Math.PI);

      for (let i = 0; i < 60; i++) {
        let wave = Math.sin(Math.PI * 2 / 10 * i) * 20 + 90;

        if ((knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
          shot.bullet[knd].flag = 1;
          shot.bullet[knd].cnt = 0;
          shot.bullet[knd].col = this.rand(enemys[shot.num].col);
          shot.bullet[knd].knd = enemys[shot.num].blknd2;
          shot.bullet[knd].angle = Math.PI * 2 / 60 * i + angle;
          shot.bullet[knd].x = Math.cos(shot.bullet[knd].angle) * wave + enemys[shot.num].x;
          shot.bullet[knd].y = Math.sin(shot.bullet[knd].angle) * wave + enemys[shot.num].y;
          shot.bullet[knd].status = direction;
          shot.bullet[knd].angle += (direction ? Math.PI / 2 : -Math.PI / 2);
          shot.bullet[knd].spd = 4;
        }
      }

      sound.enemy_shot.flag = 1;
    }

    for (let i = 0; i < this.SHOT_BULLET_MAX; i++) {
      if (shot.bullet[i].flag > 0) {
        if (t < 75) {
          shot.bullet[i].angle += shot.bullet[i].status ? Math.PI * 2 / 100 : -Math.PI * 2 / 100;
        }
      }
    }
  }

  //2つの弾が寄った状態で円形にショット
  shot_bullet_H19(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (t == 0) {
      shot.base_angle = this.attack_atan2(character, enemys[shot.num]);
    } else {
      if (t == 60) {
        shot.base_angle += Math.PI / 5;
      }
    }

    if (shot.flag != 2 && t < 115 && t % 5 == 0) {
      for (let i = 0; i < 10; i++) {
        if ((knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
          shot.bullet[knd].flag = 1;
          shot.bullet[knd].cnt = 0;
          shot.bullet[knd].col = enemys[shot.num].col;
          shot.bullet[knd].knd = enemys[shot.num].blknd2;
          shot.bullet[knd].angle = shot.base_angle + Math.PI / 5 * i + (i % 2 ? Math.PI / 12 : -Math.PI / 12);
          shot.bullet[knd].x = enemys[shot.num].x;
          shot.bullet[knd].y = enemys[shot.num].y;
          shot.bullet[knd].spd = 2.4;
          shot.bullet[knd].status = 0;
        }
      }

      sound.enemy_shot.flag = 1;
    }
  }

  //十字上にショット
  shot_bullet_H20(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (shot.flag != 2 && t < 178 && t % 5 == 0) {
      for (let i = 0; i < 4; i++) {
        if ((knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
          shot.bullet[knd].flag = 1;
          shot.bullet[knd].cnt = 0;
          shot.bullet[knd].col = enemys[shot.num].col;
          shot.bullet[knd].knd = enemys[shot.num].blknd2;
          shot.bullet[knd].x = enemys[shot.num].x;
          shot.bullet[knd].y = enemys[shot.num].y;
          shot.bullet[knd].angle = Math.PI / 2 * i;
          shot.bullet[knd].status = 0;
          shot.bullet[knd].spd = (1.2 + 0.3 * (t / 5));
        }
      }
    }
  }

  //X状にショット
  shot_bullet_H21(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (t == 0) {
      shot.base_angle = this.rang(Math.PI);
    }

    if (shot.flag != 2 && t < 178 && t % 5 == 0) {
      for (let i = 0; i < 4; i++) {
        if ((knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
          shot.bullet[knd].flag = 1;
          shot.bullet[knd].cnt = 0;
          shot.bullet[knd].col = enemys[shot.num].col;
          shot.bullet[knd].knd = enemys[shot.num].blknd2;
          shot.bullet[knd].x = enemys[shot.num].x;
          shot.bullet[knd].y = enemys[shot.num].y;
          shot.bullet[knd].angle = shot.base_angle + Math.PI / 2 * i;
          shot.bullet[knd].status = 0;
          shot.bullet[knd].spd = (1 + 0.27 * (t / 5));
        }
      }
    }
  }

  //ランダムな角度で十字状ににショット
  shot_bullet_H22(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (shot.flag != 2 && t < 179 && t % 3 == 0) {
      let tilt = this.rand(1), angle = this.rang(Math.PI);

      for (let i = 0; i < 4; i++) {
        if ((knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
          shot.bullet[knd].flag = 1;
          shot.bullet[knd].cnt = 0;
          shot.bullet[knd].col = enemys[shot.num].col;
          shot.bullet[knd].knd = enemys[shot.num].blknd2;
          shot.bullet[knd].x = enemys[shot.num].x;
          shot.bullet[knd].y = enemys[shot.num].y;
          shot.bullet[knd].angle = angle + (tilt ? Math.PI / 160 * i : -Math.PI / 160 * i);
          shot.bullet[knd].status = 0;
          shot.bullet[knd].spd = (2 + 0.1 * i);
        }
      }

      sound.enemy_shot.flag = 1;
    }
  }

  //三角に並んだ状態の弾をショット
  shot_bullet_H23(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (shot.flag != 2 && t < 175 && t % 9 == 0) {
      let angle = this.rang(Math.PI);

      for (let i = 0; i < 10; i++) {
        if ((knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
          shot.bullet[knd].flag = 1;
          shot.bullet[knd].cnt = 0;
          shot.bullet[knd].col = enemys[shot.num].col;
          shot.bullet[knd].knd = enemys[shot.num].blknd2;
          shot.bullet[knd].x = enemys[shot.num].x + Math.cos(angle + (i % 2 ? Math.PI / 4 : -Math.PI / 4)) * 20 * (i == 0 ? 0 : (i / 2 | 0));
          shot.bullet[knd].y = enemys[shot.num].y + Math.sin(angle + (i % 2 ? Math.PI / 4 : -Math.PI / 4)) * 20 * (i == 0 ? 0 : (i / 2 | 0));
          shot.bullet[knd].angle = angle + Math.PI;
          shot.bullet[knd].status = 0;
          shot.bullet[knd].spd = 3;
          shot.bullet[knd].till = 120;
        }
      }

      sound.enemy_shot.flag = 1;
    }
  }

  //花火状にショット
  shot_bullet_H24(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (t == 0) {
      let angle = this.attack_atan2(character, enemys[shot.num]);

      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 30; j++) {
          if ((knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
            shot.bullet[knd].flag = 1;
            shot.bullet[knd].cnt = 0;
            shot.bullet[knd].col = this.rand(enemys[shot.num].col);
            shot.bullet[knd].knd = enemys[shot.num].blknd2;
            shot.bullet[knd].x = enemys[shot.num].x;
            shot.bullet[knd].y = enemys[shot.num].y;
            shot.bullet[knd].angle = Math.PI * 2 / 30 * j + Math.PI / 30 * i + angle;
            shot.bullet[knd].status = 0;
            shot.bullet[knd].spd = (2 + 0.8 * i);
          }
        }
      }

      sound.enemy_shot.flag = 1;
    }
  }

  //壁に跳ね返るショット
  shot_bullet_H25(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (shot.flag != 2 && t < 58 && t % 5 == 0) {
      if ((knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
        shot.bullet[knd].flag = 1;
        shot.bullet[knd].cnt = 0;
        shot.bullet[knd].col = enemys[shot.num].col;
        shot.bullet[knd].knd = enemys[shot.num].blknd2;
        shot.bullet[knd].x = enemys[shot.num].x;
        shot.bullet[knd].y = enemys[shot.num].y;
        shot.bullet[knd].angle = this.rang(Math.PI);
        shot.bullet[knd].status = 0;
        shot.bullet[knd].spd = 2;
      }

      sound.enemy_shot.flag = 1;
    }

    for (let i = 0; i < this.SHOT_BULLET_MAX; i++) {
      if (shot.bullet[i].flag > 0 && shot.bullet[i].status < 2) {
        if (shot.bullet[i].x < 5 || shot.bullet[i].x > this.FLAME_MAX_X - 5) {
          shot.bullet[i].angle = (Math.PI - shot.bullet[i].angle);
          shot.bullet[i].status++;
          shot.bullet[i].spd++;
          shot.bullet[i].col = (++shot.bullet[i].col % 3);
          sound.ricochet.flag = 1;
        }

        if (shot.bullet[i].y < 5 || shot.bullet[i].y > this.FLAME_MAX_Y - 5) {
          shot.bullet[i].angle = Math.PI * 2 - shot.bullet[i].angle;
          shot.bullet[i].status++;
          shot.bullet[i].spd++;
          shot.bullet[i].col = (++shot.bullet[i].col % 3);
          sound.ricochet.flag = 1;
        }
      }
    }
  }

  //4つ縦に並んだショット
  shot_bullet_H26(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (shot.flag != 2 && t < 119 && t % 3 == 0) {
      let angle = this.rang(Math.PI);

      for (let i = 0; i < 4; i++) {
        if ((knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
          shot.bullet[knd].flag = 1;
          shot.bullet[knd].cnt = 0;
          shot.bullet[knd].col = enemys[shot.num].col;
          shot.bullet[knd].knd = enemys[shot.num].blknd2;
          shot.bullet[knd].x = enemys[shot.num].x;
          shot.bullet[knd].y = enemys[shot.num].y;
          shot.bullet[knd].angle = angle;
          shot.bullet[knd].status = 0;
          shot.bullet[knd].spd = (3 + 0.3 * i);
        }
      }

      sound.enemy_shot.flag = 1;
    }
  }

  //H26の弾幕少ないバージョン
  shot_bullet_H27(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (shot.flag != 2 && t < 118 && t % 5 == 0) {
      let angle = this.rang(Math.PI);

      for (let i = 0; i < 4; i++) {
        if ((knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
          shot.bullet[knd].flag = 1;
          shot.bullet[knd].cnt = 0;
          shot.bullet[knd].col = enemys[shot.num].col;
          shot.bullet[knd].knd = enemys[shot.num].blknd2;
          shot.bullet[knd].x = enemys[shot.num].x;
          shot.bullet[knd].y = enemys[shot.num].y;
          shot.bullet[knd].angle = angle;
          shot.bullet[knd].status = 0;
          shot.bullet[knd].spd = (3 + 0.3 * i);
        }
      }

      sound.enemy_shot.flag = 1;
    }
  }

  //三つ網状のショット
  shot_bullet_H28(character, enemys, sound, shot) {
    let knd, move_x, move_y, t = shot.cnt;

    if (t == 0) {
      shot.base_spd = Math.sqrt((character.y - enemys[shot.num].y) *
        (character.y - enemys[shot.num].y) + (character.x - enemys[shot.num].x) *
        (character.x - enemys[shot.num].x)) / 2 / Math.PI / 2;
      shot.base_angle = shot.base_spd * 8 / 4;
      shot.basex = this.attack_atan2(character, enemys[shot.num]);
    }

    if (shot.flag != 2 && t < 30) {
      for (let i = 0; i < 3; i++) {
        if ((knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
          shot.bullet[knd].flag = 1;
          shot.bullet[knd].cnt = 1;
          shot.bullet[knd].col = enemys[shot.num].col;
          shot.bullet[knd].knd = enemys[shot.num].blknd2;
          shot.bullet[knd].basex = shot.bullet[knd].x = enemys[shot.num].x;
          shot.bullet[knd].basey = shot.bullet[knd].y = enemys[shot.num].y;
          shot.bullet[knd].vx = 0;
          shot.bullet[knd].vy = 0;
          if (i == 2) {
            shot.bullet[knd].angle = shot.basex;
            shot.bullet[knd].spd = 4;
          } else {
            shot.bullet[knd].spd = 0;
          }

          shot.bullet[knd].status = i;
        }
      }

      sound.enemy_shot.flag = 1;
    }

    for (let i = 0; i < this.SHOT_BULLET_MAX; i++) {
      if (shot.bullet[i].flag) {
        switch (shot.bullet[i].status) {
          case 0:
            move_x = shot.base_spd * (1 - Math.cos(Math.PI * 2 / shot.base_angle * shot.bullet[i].cnt));
            move_y = shot.base_spd * (Math.PI * 2 / shot.base_angle * shot.bullet[i].cnt - Math.sin(Math.PI * 2 / shot.base_angle * shot.bullet[i].cnt));
            shot.bullet[i].angle = Math.atan2(move_x - shot.bullet[i].vy, move_y - shot.bullet[i].vx) + shot.basex;
            shot.bullet[i].vy = move_x;
            shot.bullet[i].vx = move_y;
            shot.bullet[i].x = shot.bullet[i].basex + move_y * Math.cos(shot.basex) - move_x * Math.sin(shot.basex);
            shot.bullet[i].y = shot.bullet[i].basey + move_y * Math.sin(shot.basex) + move_x * Math.cos(shot.basex);
            break;

          case 1:
            move_x = -shot.base_spd * (1 - Math.cos(Math.PI * 2 / shot.base_angle * shot.bullet[i].cnt));
            move_y = shot.base_spd * (Math.PI * 2 / shot.base_angle * shot.bullet[i].cnt - Math.sin(Math.PI * 2 / shot.base_angle * shot.bullet[i].cnt));
            shot.bullet[i].angle = Math.atan2(move_x - shot.bullet[i].vy, move_y - shot.bullet[i].vx) + shot.basex;
            shot.bullet[i].vy = move_x;
            shot.bullet[i].vx = move_y;
            shot.bullet[i].x = shot.bullet[i].basex + move_y * Math.cos(shot.basex) - move_x * Math.sin(shot.basex);
            shot.bullet[i].y = shot.bullet[i].basey + move_y * Math.sin(shot.basex) + move_x * Math.cos(shot.basex);
            break;
        }
      }
    }
  }

  //自機に追跡するショット
  shot_bullet_H29(character, enemys, sound, shot) {
    let knd, angle, t = shot.cnt;

    if (t == 0) {
      angle = this.attack_atan2(character, enemys[shot.num]) - Math.PI / 3 * 1.5;

      for (let i = 0; i < 4; i++) {
        if ((knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
          shot.bullet[knd].flag = 1;
          shot.bullet[knd].cnt = 0;
          shot.bullet[knd].col = enemys[shot.num].col;
          shot.bullet[knd].knd = enemys[shot.num].blknd2;
          shot.bullet[knd].angle = angle + Math.PI / 3 * i;
          shot.bullet[knd].x = enemys[shot.num].x;
          shot.bullet[knd].y = enemys[shot.num].y;
          shot.bullet[knd].spd = 3;
          shot.bullet[knd].status = 0;
        }
      }

      sound.enemy_shot.flag = 1;
    }

    for (let i = 0; i < this.SHOT_BULLET_MAX; i++) {
      if (shot.bullet[i].flag > 0) {
        if (shot.bullet[i].cnt > 30 && shot.bullet[i].cnt < 300) {
          if (shot.bullet[i].angle < 0) {
            shot.bullet[i].angle += Math.PI * 2;
          } else {
            if (shot.bullet[i].angle > Math.PI * 2) {
              shot.bullet[i].angle -= Math.PI * 2;
            }
          }

          angle = this.attack_atan2(character, shot.bullet[i]);

          if (angle < 0) {
            angle += Math.PI * 2;
          }

          let difference_angle = angle - shot.bullet[i].angle

          if (Math.abs(difference_angle) <= Math.PI / 80) {
            shot.bullet[i].angle = angle;
          } else {
            if (difference_angle >= 0 && difference_angle <= Math.PI || difference_angle <= -Math.PI) {
              shot.bullet[i].angle += Math.PI / 80
            } else {
              shot.bullet[i].angle -= Math.PI / 80
            }
          }
        }
      }
    }
  }

  //三角形の形に弾を出現させランダムにばらけさせる
  shot_bullet_H30(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (t == 0) {
      shot.base_spd = 0;
      shot.base_angle = this.rang(Math.PI);
      shot.basex = Math.cos(shot.base_angle) * (60 + 0.1);
      shot.basey = Math.sin(shot.base_angle) * (60 + 0.1);
      shot.base_angle -= Math.PI / 6;
    }

    if (shot.base_spd < 4 && shot.flag != 2) {
      if (shot.basex * shot.basex + shot.basey * shot.basey >= 3600) {
        shot.base_angle += (Math.PI + Math.PI / 3);
        shot.base_spd++;
      }

      if (shot.base_spd < 4) {
        shot.basex += Math.cos(shot.base_angle) * 4.5;
        shot.basey += Math.sin(shot.base_angle) * 4.5;
        if ((knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
          shot.bullet[knd].flag = 1;
          shot.bullet[knd].cnt = 0;
          shot.bullet[knd].col = enemys[shot.num].col;
          shot.bullet[knd].knd = enemys[shot.num].blknd2;
          shot.bullet[knd].angle = shot.base_angle + Math.PI * 2 / 25 * t;
          shot.bullet[knd].x = shot.basex + enemys[shot.num].x;
          shot.bullet[knd].y = shot.basey + enemys[shot.num].y;
          shot.bullet[knd].spd = 0;
          shot.bullet[knd].till = 240;
        }

        sound.enemy_shot.flag = 1;
      }
    }

    for (let i = 0; i < this.SHOT_BULLET_MAX; i++) {
      if (shot.bullet[i].flag > 0) {
        if (shot.bullet[i].cnt > 120 && shot.bullet[i].spd < 2)
          shot.bullet[i].spd += 0.02;
      }
    }
  }

  //三角形の形に弾を出現させそのまま大きくなる
  shot_bullet_H31(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (t == 0) {
      shot.base_spd = 0;
      shot.base_angle = 0;
      shot.basex = Math.cos(shot.base_angle) * (60 + 0.1);
      shot.basey = Math.sin(shot.base_angle) * (60 + 0.1);
      shot.base_angle -= Math.PI / 6;
    }

    if (shot.base_spd < 4 && shot.flag != 2) {
      if (shot.basex * shot.basex + shot.basey * shot.basey >= 3600) {
        shot.base_angle += (Math.PI + Math.PI / 3);
        shot.base_spd++;
      }

      if (shot.base_spd < 4) {
        shot.basex += Math.cos(shot.base_angle) * 5;
        shot.basey += Math.sin(shot.base_angle) * 5;

        if ((knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
          shot.bullet[knd].flag = 1;
          shot.bullet[knd].cnt = 0;
          shot.bullet[knd].col = enemys[shot.num].col;
          shot.bullet[knd].knd = enemys[shot.num].blknd2;
          shot.bullet[knd].angle = Math.atan2(shot.basey, shot.basex);
          shot.bullet[knd].x = shot.basex + enemys[shot.num].x;
          shot.bullet[knd].y = shot.basey + enemys[shot.num].y;
          shot.bullet[knd].spd = 0;
          shot.bullet[knd].rem_spd = Math.sqrt(shot.basex * shot.basex + shot.basey * shot.basey) * Math.PI * 2 / 60;
          shot.bullet[knd].till = 240;
        }
      }
    }

    if (t == 180) {
      knd = this.rand(1);
    }

    for (let i = 0; i < this.SHOT_BULLET_MAX; i++) {
      if (shot.bullet[i].flag > 0) {
        if (t >= 180) {
          if (t == 180) {
            shot.bullet[i].status = knd ? 1 : -1;
            shot.bullet[i].angle += knd ? Math.PI / 2 : -Math.PI / 2;
            shot.bullet[i].spd = shot.bullet[i].rem_spd;
            sound.enemy_shot.flag = 1;
          }

          shot.bullet[i].angle += Math.PI / 240 * shot.bullet[i].status;
        }
      }
    }
  }

  //上に打った弾が自由落下で雨上に落ちてくる
  shot_bullet_H32(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (shot.flag != 2 && t < 179 && t % 3 == 0) {
      if ((knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
        shot.bullet[knd].rem_spd = (this.rang(1.5) + 1.5);
        shot.bullet[knd].flag = 1;
        shot.bullet[knd].cnt = 0;
        shot.bullet[knd].col = enemys[shot.num].col;
        shot.bullet[knd].knd = enemys[shot.num].blknd2;
        shot.bullet[knd].x = enemys[shot.num].x;
        shot.bullet[knd].y = enemys[shot.num].y;
        shot.bullet[knd].angle = this.rang(Math.PI / 3) + Math.PI * 1.5;
        shot.bullet[knd].spd = 0;
        shot.bullet[knd].vx = Math.cos(shot.bullet[knd].angle) * shot.bullet[knd].rem_spd;
        shot.bullet[knd].vy = Math.sin(shot.bullet[knd].angle) * shot.bullet[knd].rem_spd;
        shot.bullet[knd].status = 0;
      }

      sound.enemy_shot.flag = 1;
    }

    for (let i = 0; i < this.SHOT_BULLET_MAX; i++) {
      if (shot.bullet[i].flag > 0) {
        if (shot.bullet[i].cnt >= 30) {
          shot.bullet[i].vy += 0.03;
          shot.bullet[i].angle = Math.atan2(shot.bullet[i].vy, shot.bullet[i].vx);
        }
        shot.bullet[i].x += shot.bullet[i].vx;
        shot.bullet[i].y += shot.bullet[i].vy;
      }
    }
  }

  //H2の途中で角度再計算バージョン
  shot_bullet_H33(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (t >= 0 && t < 95 && t % 10 == 0) {
      if (t == 0 || t == 50) {
        shot.base_angle = this.attack_atan2(character, enemys[shot.num]);
      }

      if (shot.flag != 2 && (knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
        shot.bullet[knd].knd = enemys[shot.num].blknd2;
        shot.bullet[knd].angle = shot.base_angle;
        shot.bullet[knd].flag = 1;
        shot.bullet[knd].x = enemys[shot.num].x;
        shot.bullet[knd].y = enemys[shot.num].y;
        shot.bullet[knd].col = enemys[shot.num].col;
        shot.bullet[knd].cnt = 0;
        shot.bullet[knd].spd = 3;
        sound.enemy_shot.flag = 1;
      }
    }
  }

  //雨のようにマップから弾が落ちてくる
  shot_bullet_H34(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (shot.flag != 2 && t < 598 && t % 5 == 0) {
      if ((knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
        shot.bullet[knd].flag = 1;
        shot.bullet[knd].cnt = 0;
        shot.bullet[knd].col = enemys[shot.num].col;
        shot.bullet[knd].knd = enemys[shot.num].blknd2;
        shot.bullet[knd].x = this.rand(this.FLAME_MAX_X);
        shot.bullet[knd].y = -5;
        shot.bullet[knd].spd = (2 + this.rang(0.5));
      }
    }

    for (let i = 0; i < this.SHOT_BULLET_MAX; i++) {
      if (shot.bullet[i].flag > 0) {
        shot.bullet[i].angle = Math.PI / 2 + Math.sin(Math.PI * 2 / 180 * t) * Math.PI / 6;
      }
    }
  }

  //雨のように左下に向けてマップから弾が落ちてくる
  shot_bullet_H35(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (shot.flag != 2 && t < 599 && t % 3 == 0) {
      if ((knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
        shot.bullet[knd].flag = 1;
        shot.bullet[knd].cnt = 0;
        shot.bullet[knd].col = enemys[shot.num].col;
        shot.bullet[knd].knd = enemys[shot.num].blknd2;
        shot.bullet[knd].x = t % 2 ? this.rand(this.FLAME_MAX_X) : this.FLAME_MAX_X;
        shot.bullet[knd].y = t % 2 ? -5 : this.rand(this.FLAME_MAX_Y);
        shot.bullet[knd].spd = (2 + this.rang(0.5));
      }
    }

    for (let i = 0; i < this.SHOT_BULLET_MAX; i++) {
      if (shot.bullet[i].flag > 0) {
        shot.bullet[i].angle = Math.PI / 1.33 + Math.sin(Math.PI * 2 / 180 * t) * Math.PI / 6;
      }
    }
  }

  //雨のように右下に向けてマップから弾が落ちてくる
  shot_bullet_H36(character, enemys, sound, shot) {
    let knd, t = shot.cnt;

    if (shot.flag != 2 && t < 599 && t % 3 == 0) {
      if ((knd = this.flag_check(shot.bullet, this.SHOT_BULLET_MAX)) != -1) {
        shot.bullet[knd].flag = 1;
        shot.bullet[knd].cnt = 0;
        shot.bullet[knd].col = enemys[shot.num].col;
        shot.bullet[knd].knd = enemys[shot.num].blknd2;
        shot.bullet[knd].x = t % 2 ? this.rand(this.FLAME_MAX_X) : 0;
        shot.bullet[knd].y = t % 2 ? -5 : this.rand(this.FLAME_MAX_Y);
        shot.bullet[knd].spd = (2 + this.rang(0.5));
      }
    }

    for (let i = 0; i < this.SHOT_BULLET_MAX; i++) {
      if (shot.bullet[i].flag > 0) {
        shot.bullet[i].angle = Math.PI / 4 + Math.sin(Math.PI * 2 / 180 * t) * Math.PI / 6;
      }
    }
  }
}
