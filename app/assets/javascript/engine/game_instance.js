class Game {
  constructor() {
    this.BOARD_MAX_COUNT = 4;
    this.FLAME_X = 32;
    this.FLAME_Y = 16;
    this.FLAME_MAX_X = 384;
    this.FLAME_MAX_Y = 448;
    this.FPS = 60;
    this.CHARACTER_SPD = 3.8;
    this.BOOSTER_MAX_COUNT = 3;
    this.CHARACTER_BULLET_MAX = 200;
    this.OVER_FLAME = 50;
    this.ENEMY_MAX = 30;
    this.SHOT_MAX = 30;
    this.SHOT_BULLET_MAX = 1000;
    this.BULLET_KND_MAX = 12;
    this.CHARACTER_OUT = 2;
    this.EFFECT_MAX = 100;
    this.ITEM_MAX = 1000;
    this.ENEMY_OUT0 = 14;
    this.ENEMY_OUT1 = 21;
    this.BOSS_POS_X = (this.FLAME_MAX_X / 2);
    this.BOSS_POS_Y = 100;
    this.BOSS_BULLET_MAX = 3000;
    this.BOSS_OUT = 30;
  }

  flag_check(object, max_count) {
    for (let i = 0; i < max_count; i++) {
      if (object[i].flag === 0) {
        return i;
      }
    }
    return -1;
  }

  flame_over_check(x, y) {
    if (-this.OVER_FLAME > x || this.FLAME_MAX_X + this.OVER_FLAME < x || -this.OVER_FLAME > y || this.FLAME_MAX_Y + this.OVER_FLAME < y) {
      return true;
    }
    return false;
  }

  flame_under_check(x, y) {
    if (this.FLAME_X - this.OVER_FLAME < x && this.FLAME_MAX_X + this.OVER_FLAME > x && this.FLAME_Y - this.OVER_FLAME < y && this.FLAME_MAX_Y + this.OVER_FLAME > y) {
      return true;
    }
    return false;
  }

  rang(value) {
    return value * (10000 - Math.random() * 20000) / 10000;
  }

  rand(value) {
    return Math.floor(Math.random() * (value + 1));
  }

  attack_atan2(hit, attack) {
    return Math.atan2(hit.y - attack.y, hit.x - attack.x);
  }

  coordinate_attack_atan2(attack, x, y) {
    return Math.atan2(y - attack.y, x - attack.x);
  }
}

class Img {
  constructor(img, one_width = 0, one_height = 0) {
    this.img = img;
    this.one_width = one_width;
    this.one_height = one_height;
  }
}

class Bullet {
  constructor() {
    this.flag = 0;
    this.knd;
    this.cnt;
    this.col;
    this.status;
    this.till = 0;
    this.x;
    this.y;
    this.vx;
    this.vy;
    this.angle;
    this.spd;
    this.base_angle;
    this.rem_spd;
    this.basex;
    this.basey;
  }
}

Math.fmod = function (a, b) { return Number((a - (Math.floor(a / b) * b)).toPrecision(8)); };

function sleep(time) {
  if (time > 0) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
};

function post(path, params, method='post') {

  // The rest of this code assumes you are not using a library.
  // It can be made less wordy if you use one.
  const form = document.createElement('form');
  form.method = method;
  form.action = path;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = key;
      hiddenField.value = params[key];

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}
