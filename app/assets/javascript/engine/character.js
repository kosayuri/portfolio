
class Character extends Game {
  input() {
    this.scr = 0;
    this.flag = 1;
    this.cnt = 0;
    this.pow = 0;
    this.invincible = 0;
    this.life = 5;
    this.life_point = 0;
    this.x = this.FLAME_MAX_X / 2;
    this.y = this.FLAME_MAX_Y / 5 * 4;
    this.booster_siz;
    this.up = 0;
    this.right = 0;
    this.left = 0;
    this.down = 0;
    this.shot = 0;
    this.slow = 0;
  }

  constructor() {
    super();
    this.input();
  }

  key_control(key) {
    if (key.KeyZ) {
      this.shot++;
    } else {
      this.shot = 0;
    }
    if (key.ShiftLeft) {
      this.slow++;
    } else {
      this.slow = 0;
    }
    if (key.ArrowUp) {
      this.up++;
    } else {
      this.up = 0;
    }
    if (key.ArrowLeft) {
      this.left++;
    } else {
      this.left = 0;
    }
    if (key.ArrowDown) {
      this.down++;
    } else {
      this.down = 0;
    }
    if (key.ArrowRight) {
      this.right++;
    } else {
      this.right = 0;
    }
  }

  damage(shakee_effect) {
    if (this.life > 1) {
      this.life--;
      this.invincible = 130;
      this.flag = 2;
      shakee_effect.setting(40, 6);
    } else {
      this.flag = 3;
      shakee_effect.setting(80, 16);
    }
  }

  main(endgame_effect, key) {
    let x = 0;
    let y = 0;
    this.key_control(key);

    if (this.left !== 0 ^ this.right !== 0) {
      x = this.left ? - this.CHARACTER_SPD : this.CHARACTER_SPD;
    }

    if (this.up !== 0 ^ this.down !== 0) {
      y = this.up ? - this.CHARACTER_SPD : this.CHARACTER_SPD;
    }

    if (x && y) {
      x /= Math.sqrt(2);
      y /= Math.sqrt(2);
    }

    if (this.slow) {
      x /= 2;
      y /= 2;
    }

    if (this.x + x > this.FLAME_MAX_X) {
      this.x = this.FLAME_MAX_X;
    } else if (this.x + x < 0) {
      this.x = 0;
    } else {
      this.x += x;
    }

    if (this.y + y > this.FLAME_MAX_Y) {
      this.y = this.FLAME_MAX_Y;
    } else if (this.y + y < 0) {
      this.y = 0;
    } else {
      this.y += y;
    }

    if (this.flag == 2) {
      this.x = this.FLAME_MAX_X / 2;

      if (this.y >= this.FLAME_MAX_Y / 5 * 4 || this.cnt == 0) {
        this.y = this.FLAME_MAX_Y + 20 - (this.FLAME_MAX_Y + 20 - this.FLAME_MAX_Y / 5 * 4) * this.cnt / 60;
      }
      if (this.cnt > 120 || (this.y < this.FLAME_MAX_Y - 10 && (x != 0 || y != 0))) {
        this.flag = 1;
        this.cnt = 0;
      }
    } else {
      if (this.flag == 3 && this.cnt == 60) {
        endgame_effect.flag = 2;
      }
    }

    this.cnt++;

    if (this.invincible) {
      this.invincible--;
    }
  }
}
