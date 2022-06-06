class Draw extends Game {
  constructor(width, height) {
    super();
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.canvas.width = width || 320;
    this.canvas.height = height || 320;
  }

  board_graph(border_img) {
    this.draw_graph(this.FLAME_X, 0, border_img.img[1]);
    this.draw_graph(this.FLAME_X, this.FLAME_MAX_Y + this.FLAME_Y, border_img.img[2]);
    this.draw_graph(0, 0, border_img.img[0]);
    this.draw_graph(this.FLAME_MAX_X + this.FLAME_X, 0, border_img.img[3]);
  }

  character_graph(character_img, booster_img, character_hit_point_img, character_option_img, cnt, character, shakee_effect) {
    if (character.invincible % 2 == 0 && character.flag != 3) {
      let img_cnt = 1;
      const booster_y_correction = character.slow ? 37 : 46;

      if (character.left !== 0 ^ character.right !== 0) {
        img_cnt = character.left ? 0 : 2;
      }

      const booster_x_correction = img_cnt === 1 ? 6 : 4;

      this.draw_rota_graph_flame(
        character.x + booster_x_correction + shakee_effect.x, character.y + booster_y_correction + shakee_effect.y,
        1, - Math.PI / 2, booster_img.img, booster_img, cnt % 3);
      this.draw_rota_graph_flame(
        character.x - booster_x_correction + shakee_effect.x, character.y + booster_y_correction + shakee_effect.y,
        1, - Math.PI / 2, booster_img.img, booster_img, cnt % 3);

      if (character.pow >= 200) {
        this.draw_rota_graph_flame(character.x + (character.slow == 0 ? 24 : 14) + shakee_effect.x, character.y - 8 + shakee_effect.y, 1, - Math.PI / 2, character_option_img.img, character_option_img);
        this.draw_rota_graph_flame(character.x + (character.slow == 0 ? -24 : -14) + shakee_effect.x, character.y - 8 + shakee_effect.y, 1, - Math.PI / 2, character_option_img.img, character_option_img);
      }

      this.draw_rota_graph_flame(character.x + shakee_effect.x, character.y + shakee_effect.y, 1, - Math.PI / 2, character_img.img, character_img, img_cnt);
      this.draw_rota_graph_flame
        (character.x + shakee_effect.x, character.y + shakee_effect.y, 0.9 + Math.sin(Math.PI / 45 * cnt) * 0.1, - Math.PI / 75 * cnt, character_hit_point_img.img, character_hit_point_img);
    }
  }

  character_bullet_graph(character_bullet_img, character_bullet, shakee_effect) {
    for (let i = 0; i < this.CHARACTER_BULLET_MAX; i++) {
      if (character_bullet.bullet[i].flag > 0) {
        if (character_bullet.bullet[i].knd !== 1 || (character_bullet.bullet[i].knd === 1 && character_bullet.bullet[i].cnt > 1))
          this.draw_rota_graph_flame(
            character_bullet.bullet[i].x + shakee_effect.x, character_bullet.bullet[i].y + shakee_effect.y,
            1, character_bullet.bullet[i].angle, character_bullet_img.img[character_bullet.bullet[i].knd], character_bullet_img);
      }
    }
  }

  status_number_graph(y, digit, cnt, number_img) {
    let number;

    for (let i = 0; digit >= 1; i++) {
      number = cnt / digit | 0;
      cnt %= digit;
      this.drawg_raph2(this.FLAME_MAX_X + 50 + 20 * i, y, number_img.img, number_img, number);
      digit /= 10;
    }
  }

  status_graph(number_img, status_img, character) {
    this.draw_graph(this.FLAME_MAX_X + 50, 15, status_img.img[0]);
    this.status_number_graph(44, 100000000, character.hiscr, number_img);
    this.draw_graph(this.FLAME_MAX_X + 50, 15 + 60, status_img.img[1]);
    this.status_number_graph(44 + 60, 100000000, character.scr, number_img);

    this.draw_graph(this.FLAME_MAX_X + 50, 15 + 120, status_img.img[2]);
    this.status_number_graph(44 + 120, 1, character.life, number_img);

    this.draw_graph(this.FLAME_MAX_X + 50, 15 + 180, status_img.img[3]);
    this.status_number_graph(44 + 180, 100, character.life_point, number_img);
    this.draw_graph(this.FLAME_MAX_X + 50 + 55, 44 + 180, status_img.img[5]);
    this.drawg_raph2(this.FLAME_MAX_X + 50 + 75, 44 + 180, number_img.img, number_img, 1);
    this.drawg_raph2(this.FLAME_MAX_X + 50 + 95, 44 + 180, number_img.img, number_img, 0);
    this.drawg_raph2(this.FLAME_MAX_X + 50 + 115, 44 + 180, number_img.img, number_img, 0);

    this.draw_graph(this.FLAME_MAX_X + 50, 15 + 240, status_img.img[4]);
    this.status_number_graph(44 + 240, 100, character.pow, number_img);
    this.draw_graph(this.FLAME_MAX_X + 50 + 55, 45 + 240, status_img.img[5]);
    this.drawg_raph2(this.FLAME_MAX_X + 50 + 75, 45 + 240, number_img.img, number_img, 4);
    this.drawg_raph2(this.FLAME_MAX_X + 50 + 95, 45 + 240, number_img.img, number_img, 0);
    this.drawg_raph2(this.FLAME_MAX_X + 50 + 115, 45 + 240, number_img.img, number_img, 0);
  }

  boss_graph(boss_img, boss_hp_img, bullet_img, boss, shakee_effect) {
    if (boss.flag > 0) {
      if (boss.flag == 2) {
        for (let i = 0; i < this.BOSS_BULLET_MAX; i++) {
          if (boss.bullet[i].flag) {
            this.draw_rota_graph_flame(
              boss.bullet[i].x + shakee_effect.x, boss.bullet[i].y + shakee_effect.y,
              1, boss.bullet[i].angle, bullet_img[boss.bullet[i].knd].img, bullet_img[boss.bullet[i].knd], boss.bullet[i].col);
          }
        }
      }

      if (boss.knd < 5) {
        this.draw_rota_graph_flame(
          boss.x + shakee_effect.x, boss.y + shakee_effect.y,
          1, -Math.PI / 2, boss_img.img, boss_img);
      }

      if (boss.flag == 2) {
        this.draw_shrinkage_graph(this.FLAME_X + 12 + shakee_effect.x, this.FLAME_Y + 4 + shakee_effect.y, 360 * boss.hp / boss.hp_max, boss_hp_img.img.naturalHeight, boss_hp_img.img);
      }
    }
  }

  enemy_graph(enemy_img, enemys, shakee_effect) {
    for (let i = 0; i < this.ENEMY_MAX; i++) {
      if (enemys[i].flag) {
        this.draw_rota_graph_flame(
          enemys[i].x + shakee_effect.x, enemys[i].y + shakee_effect.y,
          1, enemys[i].ang, enemy_img[enemys[i].knd].img, enemy_img[enemys[i].knd], enemys[i].knd ? 0 : enemys[i].cnt % 3);
      }
    }
  }

  enemy_shot_graph(bullet_img, enemy_shots, shakee_effect) {
    for (let i = 0; i < this.SHOT_MAX; i++) {
      if (enemy_shots[i].flag) {
        for (let k = 0; k < this.SHOT_BULLET_MAX; k++) {
          if (enemy_shots[i].bullet[k].flag) {
            this.draw_rota_graph_flame(
              enemy_shots[i].bullet[k].x + shakee_effect.x, enemy_shots[i].bullet[k].y + shakee_effect.y,
              1, enemy_shots[i].bullet[k].angle, bullet_img[enemy_shots[i].bullet[k].knd].img, bullet_img[enemy_shots[i].bullet[k].knd], enemy_shots[i].bullet[k].col);
          }
        }
      }
    }
  }

  effect_graph(load_img, effects, shakee_effect) {
    for (let i = 0; i < this.EFFECT_MAX; i++) {
      if (effects[i].flag) {
        this.draw_rota_blend_graph_flame(
          effects[i].x + shakee_effect.x, effects[i].y + shakee_effect.y,
          effects[i].siz, effects[i].draw_angle, load_img[effects[i].img].img, load_img[effects[i].img], effects[i].blend, effects[i].blend_cnt, effects[i].col);
      }
    }
  }


  item_graph(item_img, items, shakee_effect) {
    for (let i = 0; i < this.ITEM_MAX; i++) {
      if (items[i].flag > 0) {
        this.draw_rota_blend_graph_flame(
          items[i].x + shakee_effect.x, items[i].y + shakee_effect.y,
          items[i].big_flag ? 0.8 : 0.5, -Math.PI / 2, item_img[0].img, item_img[0],
          1, items[i].blend_cnt, items[i].knd);
        this.draw_rota_blend_graph_flame(
          items[i].x + shakee_effect.x, items[i].y + shakee_effect.y,
          items[i].big_flag ? 0.8 : 0.5, -Math.PI / 2 + Math.PI * 2 * items[i].cnt / 60, item_img[1].img, item_img[1],
          1, items[i].blend_cnt, items[i].knd);

        if (items[i].big_flag)
          this.draw_rota_blend_graph_flame(
            items[i].x + shakee_effect.x, items[i].y + shakee_effect.y,
            items[i].big_flag ? 1 : 0.7, -Math.PI / 2 - Math.PI * 2 * items[i].cnt / 60, item_img[1].img, item_img[1],
            1, items[i].blend_cnt, items[i].knd);
      }
    }
  }


  flash_effect_graph(flash_effect) {
    if (flash_effect.flag) {
      const ctx = this.canvas.getContext('2d');
      ctx.save();
      ctx.fillStyle = "rgba(255,255,255," + (1 - 1 / 75 * flash_effect.cnt) + ")";
      ctx.fillRect(this.FLAME_X, this.FLAME_Y, this.FLAME_X + this.FLAME_MAX_X, this.FLAME_X + this.FLAME_MAX_Y);
      ctx.restore();
    }
  }

  endgame_effect_graph(endgame_effect, play_result_img) {
    if (endgame_effect.flag) {
      const ctx = this.canvas.getContext('2d');
      ctx.save();
      if (endgame_effect.cnt <= 120) {
        ctx.fillStyle = "rgba(0,0,0," + (1 / 120 * endgame_effect.cnt) + ")";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      } else {
        this.draw_graph(0, 0, play_result_img.img[endgame_effect.flag - 1]);

        if (endgame_effect.cnt < 150) {
          ctx.fillStyle = "rgba(0,0,0," + (1 - 1 / 30 * (endgame_effect.cnt - 120)) + ")";
          ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
      }
      ctx.restore();
    }
  }

  menu_graph(menu, arrow_img) {
    const menu_text = ["ゲームに戻る", "リスタート", "終了"];
    if (menu.flag) {
      const ctx = this.canvas.getContext('2d');
      ctx.save();
      if (menu.flag == 1) {
        ctx.fillStyle = "rgba(0,0,0," + (menu.cnt < 60 ? 0.5 / 60 * menu.cnt : 0.5) + ")";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = '20pt monospace';
        for (let i = 0; i < menu_text.length; i++) {
          ctx.fillText(menu_text[i], 70, 390 + 30 * i);
        }

        this.draw_graph(25 + menu.cnt % 30 * 10 / 30, 370 + 30 * menu.status, arrow_img.img);
      } else
        if (menu.flag == 2) {
          ctx.fillStyle = "rgba(0,0,0," + (0.5 + 0.5 / 30 * (menu.status == 0 ? -menu.cnt : menu.cnt)) + ")";
          ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
          if (menu.cnt > 30) {
            menu.flag = 0;
            menu.cnt = 0;
          }
        }
      ctx.restore();
    }
  }

  background_graph(background_img, cnt, shakee_effect) {
    this.draw_graph(this.FLAME_X - 33 + shakee_effect.x, cnt % 500 + shakee_effect.y, background_img.img);
    this.draw_graph(this.FLAME_X - 33 + shakee_effect.x, cnt % 500 - 500 + shakee_effect.y, background_img.img);
  }

  main(load_img, cnt, character, character_bullet, boss, enemys, enemy_shots, effects, items, flash_effect, endgame_effect, menu, shakee_effect) {
    if (endgame_effect.cnt < 120) {
      this.background_graph(load_img.background, cnt, shakee_effect);
      this.effect_graph(load_img, effects, shakee_effect)
      this.item_graph(load_img.item, items, shakee_effect);
      this.character_bullet_graph(load_img.character_bullet, character_bullet, shakee_effect);
      this.character_graph(load_img.character, load_img.booster, load_img.character_hit_point, load_img.character_option, cnt, character, shakee_effect);
      this.enemy_shot_graph(load_img.bullet, enemy_shots, shakee_effect);
      this.enemy_graph(load_img.enemy, enemys, shakee_effect);
      this.boss_graph(load_img.boss, load_img.boss_hp, load_img.bullet, boss, shakee_effect);
      this.flash_effect_graph(flash_effect);
      this.board_graph(load_img.board);
      this.status_graph(load_img.number, load_img.status, character);
    }

    this.endgame_effect_graph(endgame_effect, load_img.play_result);
    this.menu_graph(menu, load_img.arrow);
  }

  draw_graph(x, y, img) {
    const ctx = this.canvas.getContext('2d');
    ctx.drawImage(img, x, y);
  }

  draw_shrinkage_graph(x, y, sw, sh, img) {
    const ctx = this.canvas.getContext('2d');
    ctx.drawImage(img, x, y, sw, sh);
  }

  drawg_raph2(x, y, img, one_siz, cnt = 0) {
    let one_width_cnt = one_siz.one_width || cnt !== 0 ? cnt % (img.naturalWidth / one_siz.one_width) : 0;
    let one_height_cnt = one_siz.one_height || cnt !== 0 ? cnt / (img.naturalWidth / one_siz.one_width) % (img.naturalHeight / one_siz.one_height) : 0;
    const ctx = this.canvas.getContext('2d');
    ctx.save();

    ctx.drawImage(
      img,
      one_width_cnt === 0 ? 0 : one_siz.one_width * one_width_cnt,
      one_height_cnt === 0 ? 0 : one_siz.one_height * one_height_cnt,
      one_siz.one_width ? one_siz.one_width : img.naturalWidth,
      one_siz.one_height ? one_siz.one_height : img.naturalHeight,
      x,
      y,
      one_siz.one_width ? one_siz.one_width : img.naturalWidth,
      one_siz.one_height ? one_siz.one_height : img.naturalHeight);

    ctx.restore();
  }

  draw_rota_graph(x, y, ExtRate, Angle, img, one_siz, cnt = 0) {
    let one_width_cnt = one_siz.one_width || cnt !== 0 ? cnt % (img.naturalWidth / one_siz.one_width) : 0;
    let one_height_cnt = one_siz.one_height || cnt !== 0 ? cnt / (img.naturalWidth / one_siz.one_width) % (img.naturalHeight / one_siz.one_height) : 0;

    const ctx = this.canvas.getContext('2d');
    ctx.save();
    ctx.scale(ExtRate, ExtRate);
    ctx.translate(x / ExtRate, y / ExtRate);
    ctx.rotate(Angle + Math.PI / 2);

    ctx.drawImage(
      img,
      one_width_cnt === 0 ? 0 : one_siz.one_width * one_width_cnt,
      one_height_cnt === 0 ? 0 : one_siz.one_height * one_height_cnt,
      one_siz.one_width ? one_siz.one_width : img.naturalWidth,
      one_siz.one_height ? one_siz.one_height : img.naturalHeight,
      - (one_siz.one_width ? one_siz.one_width / 2 : img.naturalWidth / 2),
      - (one_siz.one_height ? one_siz.one_height / 2 : img.naturalHeight / 2),
      one_siz.one_width ? one_siz.one_width : img.naturalWidth,
      one_siz.one_height ? one_siz.one_height : img.naturalHeight);

    ctx.restore();
  }

  draw_rota_blend_graph(x, y, ExtRate, Angle, img, one_siz, blend_mode, blend_cnt, cnt = 0) {
    let one_width_cnt = one_siz.one_width || cnt !== 0 ? cnt % (img.naturalWidth / one_siz.one_width) : 0;
    let one_height_cnt = one_siz.one_height || cnt !== 0 ? cnt / (img.naturalWidth / one_siz.one_width) % (img.naturalHeight / one_siz.one_height) : 0;

    const ctx = this.canvas.getContext('2d');
    ctx.save();
    if (blend_mode != 0)
      ctx.globalAlpha = blend_cnt / 255;
    if (blend_mode == 2)
      ctx.globalCompositeOperation = "lighter";
    ctx.scale(ExtRate, ExtRate);
    ctx.translate(x / ExtRate, y / ExtRate);
    ctx.rotate(Angle + Math.PI / 2);

    ctx.drawImage(
      img,
      one_width_cnt === 0 ? 0 : one_siz.one_width * one_width_cnt,
      one_height_cnt === 0 ? 0 : one_siz.one_height * one_height_cnt,
      one_siz.one_width ? one_siz.one_width : img.naturalWidth,
      one_siz.one_height ? one_siz.one_height : img.naturalHeight,
      - (one_siz.one_width ? one_siz.one_width / 2 : img.naturalWidth / 2),
      - (one_siz.one_height ? one_siz.one_height / 2 : img.naturalHeight / 2),
      one_siz.one_width ? one_siz.one_width : img.naturalWidth,
      one_siz.one_height ? one_siz.one_height : img.naturalHeight);

    ctx.restore();
  }

  draw_rota_graph_flame(x, y, ExtRate, Angle, img, one_siz, cnt) {
    this.draw_rota_graph(x + this.FLAME_X, y + this.FLAME_Y, ExtRate, Angle, img, one_siz, cnt);
  }

  draw_rota_blend_graph_flame(x, y, ExtRate, Angle, img, one_siz, blend_mode, blend_cnt, cnt) {
    this.draw_rota_blend_graph(x + this.FLAME_X, y + this.FLAME_Y, ExtRate, Angle, img, one_siz, blend_mode, blend_cnt, cnt);
  }
}
