addEventListener('load', () => {
  let draw = new Draw(640, 480);
  let effect = new Effect();
  effect.input();
  let flash_effect = new FlashEffect();
  let shakee_effect = new ShakeEffect();
  let endgame_effect = new EndgameEffect();
  let load_img = new ImageLoad();
  load_img.Load();
  let sound = new Sound();
  let enemy = new Enemy();
  enemy.input();
  let stage = new Stage();
  stage.csv_data("/stage.csv");
  let boss = new Boss();
  boss.input();
  let enemy_shot = new EnemyShot();
  enemy_shot.input();
  let out = new Out();
  out.out_input();
  let item = new Item();
  item.input();
  let menu = new Menu();
  let character = new Character();
  let character_bullet = new CharacterBullet();
  character_bullet.input();
  let cnt = 0;
  let play_cnt = [];
  play_cnt[0] = 0;
  let fps_start_time = 0;
  let fps_cnt_time = 0;
  let fps_cnt;
  let fps_base_cnt;
  let fps_time;
  let fps_over_flag = true;
  let key = {
    KeyZ: false, ShiftLeft: false, ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false, Escape: false
  };
  let key_flag = true;

  onkeydown = event => { if (key_flag) key_flag = false; if (event.code in key) key[event.code] = true; };
  onkeyup = event => { if (event.code in key) key[event.code] = false; };

  async function gamemain() {
    let ua = navigator.userAgent;

    if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('Mobile') > 0 ) {
      let orientation = window.orientation;

      if (orientation === 0) {
        alert('横画面にしてください');
      }
    }

    const ctx = draw.canvas.getContext('2d');

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, draw.canvas.width, draw.canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = '20pt monospace';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("ロード中", draw.canvas.width / 2, draw.canvas.height / 2);

    while (stage.stage_data === undefined || load_img.load_progress != 41 || sound.load_progress[0] != 13) {
      await sleep(50);
    }


    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, draw.canvas.width, draw.canvas.height);
    ctx.fillStyle = '#fff';
    ctx.fillText("何かキーを押すとスタート", draw.canvas.width / 2, draw.canvas.height / 2);
    ctx.textAlign = "start";
    ctx.textBaseline = "alphabetic";

    while (key_flag) {
      await sleep(50);
    }

    sound.stage_bgm.flag = 2;

    function mainLoop() {
      if ((1000 / draw.FPS | 0) > (fps_time = ((+new Date()) - fps_start_time))) {
        requestAnimationFrame(mainLoop.bind());
        fps_over_flag = false;
        return;
      }

      fps_start_time = (+new Date()) - (fps_start_time === 0 || fps_over_flag ? 0 : (fps_time - (1000 / draw.FPS)));
      fps_over_flag = true;

      if (fps_cnt_time + 1000 <= (+new Date())) {
        fps_cnt = cnt - fps_base_cnt;
        fps_base_cnt = cnt;
        fps_cnt_time = (+new Date());
      }

      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, draw.canvas.width, draw.canvas.height);
      menu.main(key, boss, enemy, enemy_shot, character, character_bullet, item, effect, flash_effect, endgame_effect, sound, play_cnt, shakee_effect);

      if (menu.flag == 0) {
        if (menu.flag == 0) {
          if (endgame_effect.cnt < 120) {
            boss.main(play_cnt[0], flash_effect, endgame_effect, character, character_bullet.bullet, effect, sound);
            enemy.main(character, enemy_shot.shots);
            stage.main(enemy.enemys, effect, play_cnt[0]);
            character.main(endgame_effect, key);
            character_bullet.main(character, enemy.enemys, boss, sound);
            enemy_shot.main(character, enemy.enemys, sound);
            item.main(character, enemy.enemys, enemy_shot.shots, boss, out, sound);
            out.main(character, character_bullet, enemy.enemys, enemy_shot.shots, boss, effect, item, sound, shakee_effect);
            effect.main();
            flash_effect.main();
            shakee_effect.main();
            play_cnt[0]++;
          }
          endgame_effect.main(sound, character);
        }
      }

      sound.main();
      draw.main(load_img, play_cnt[0], character, character_bullet, boss, enemy.enemys, enemy_shot.shots, effect.effects, item.items, flash_effect, endgame_effect, menu, shakee_effect);
      ctx.fillStyle = '#fff';
      ctx.font = '13pt sans-serif';
      ctx.fillText(fps_cnt, 5, 475);
      cnt++;
      requestAnimationFrame(mainLoop.bind());
    };
    mainLoop();
  };
  gamemain();
});
