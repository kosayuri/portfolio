class Menu extends Game {
  constructor() {
    super();
    this.flag = 0;
    this.cnt = 0;
    this.menu_cnt = 0;
    this.status = 0;
    this.menu = 0;
    this.up = 0;
    this.down = 0;
    this.decision = 0;
  }

  key_control(key) {
    if (key.Escape) {
      this.menu++;
    } else {
      this.menu = 0;
    }
    if (key.KeyZ) {
      this.decision++;
    } else {
      this.decision = 0;
    }
    if (key.ArrowUp) {
      this.up++;
    } else {
      this.up = 0;
    }
    if (key.ArrowDown) {
      this.down++;
    } else {
      this.down = 0;
    }
  }

  main(key, boss, enemy, enemy_shot, character, character_bullet, item, effect, flash_effect, endgame_effect, sound, play_cnt, shakee_effect) {
    this.key_control(key);

    if (this.flag) {
      switch (this.flag) {
        case 1:
          if (this.menu == 1) {
            this.status = 0;
            this.flag = 2;
            this.menu_cnt = this.cnt;
            this.cnt = 0;
          } else
            if (this.decision == 1) {
              if (this.menu != 1 && this.status != 0) {
                sound.bgm_stop_flag = true;
              }
              this.flag = 2;
              this.menu_cnt = this.cnt;
              this.cnt = 0;
            }

          if (this.up % 20 == 1 && this.down == 0) {
            this.status = (this.status + 2) % 3;
          } else
            if (this.down % 20 == 1 && this.up == 0) {
              this.status = (this.status + 1) % 3;
            }
          break;

        case 2:
          if (this.cnt == 30) {
            switch (this.status) {
              case 0:
                this.menu_cnt = 0;
                this.status = 0;
                this.menu = 0;
                this.up = 0;
                this.down = 0;
                this.decision = 0;
                break;

              case 1:
                this.menu_cnt = 0;
                this.status = 0;
                this.menu = 0;
                this.up = 0;
                this.down = 0;
                this.decision = 0;
                boss.input();
                enemy.input();
                enemy_shot.input();
                character.input();
                character_bullet.input();
                item.input();
                effect.input();
                flash_effect.input();
                endgame_effect.input();
                play_cnt[0] = 0;
                sound.stage_bgm.flag = 2;
                shakee_effect.input();
                break;

              case 2:
                break;
            }
          }
          break;
      }

      this.cnt++;
    }

    if (this.menu == 1 && this.flag == 0) {
      this.flag = 1;
    }
  }
}
