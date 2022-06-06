class NewSound {
  constructor(load_progress, sound_url, volume, currentTime = 0) {
    this.context = new AudioContext();
    this.gain = this.context.createGain();
    this.gain.connect(this.context.destination);
    this.buffer = this.load_sound(load_progress, sound_url);
    this.gain.gain.value = volume;
    this.currentTime = currentTime;
    this.flag = false;
  }

  load_sound(load_progress, url) {
    return new Promise((resolve) => {
      const request = new XMLHttpRequest();

      request.open('GET', url, true);
      request.responseType = 'arraybuffer';
      request.onload = () => {
        this.context.decodeAudioData(request.response, (buffer) => {
          this.buffer = buffer;
          load_progress[0]++;
        })
      };
      request.send();
    })
  }
}

class Sound {
  constructor() {
    let url = new URL(window.location.href);
    let params = url.searchParams;
    let se_volume = params.get('se_volume');
    let bgm_volume = params.get('bgm_volume');

    this.load_progress = [0];
    this.bgm_stop_flag = false;
    this.bgm_context;
    this.character_shot = new NewSound(this.load_progress, "/music/character_shot.ogg", 0.7 * se_volume / 10);
    this.enemy_shot = new NewSound(this.load_progress, "/music/enemy_shot.ogg", 0.4 * se_volume / 10);
    this.ricochet = new NewSound(this.load_progress, "/music/ricochet.ogg", 0.3 * se_volume / 10);
    this.enemy_die = new NewSound(this.load_progress, "/music/enemy_die.ogg", 0.7 * se_volume / 10);
    this.character_die = new NewSound(this.load_progress, "/music/character_die.ogg", 1 * se_volume / 10);
    this.item_get = new NewSound(this.load_progress, "/music/item_get.ogg", 0.4 * se_volume / 10);
    this.power_up = new NewSound(this.load_progress, "/music/power_up.ogg", 0.7 * se_volume / 10);
    this.boss_die = new NewSound(this.load_progress, "/music/boss_die.ogg", 0.9 * se_volume / 10);
    this.boss_advent = new NewSound(this.load_progress, "/music/boss_advent.ogg", 0.8 * se_volume / 10);
    this.clear = new NewSound(this.load_progress, "/music/clear.ogg", 1 * se_volume / 10);
    this.game_over = new NewSound(this.load_progress, "/music/game_over.ogg", 1 * se_volume / 10);
    this.stage_bgm = new NewSound(this.load_progress, "/music/stage_bgm.ogg", 0.5 * bgm_volume / 10, 32.67104308);
    this.boss_bgm = new NewSound(this.load_progress, "/music/boss_bgm.ogg", 0.8 * bgm_volume / 10, 25.611);
  }

  main() {
    if (this.bgm_stop_flag && this.bgm_context) {
      this.bgm_context.stop();
      this.bgm_stop_flag = false;
    }

    for (let i in this) {
      if (this[i].flag > 0) {
        this.play_sound(this[i]);
        this[i].flag = false;
      }
    }
  }

  play_sound(sound) {
    const source = sound.context.createBufferSource();
    source.buffer = sound.buffer;
    source.connect(sound.gain);

    if (sound.flag == 2) {
      this.bgm_context = source;
      source.loop = true;
      source.loopStart = sound.currentTime;
      source.loopEnd = source.buffer.duration;
    }

    source.start(0);
  }
}
