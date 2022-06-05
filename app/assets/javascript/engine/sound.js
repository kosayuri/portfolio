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
    this.load_progress = [0];
    this.bgm_stop_flag = false;
    this.bgm_context;
    this.character_shot = new NewSound(this.load_progress, "./character_shot.ogg", 0.7);
    this.enemy_shot = new NewSound(this.load_progress, "./enemy_shot.ogg", 0.4);
    this.ricochet = new NewSound(this.load_progress, "./ricochet.ogg", 0.3);
    this.enemy_die = new NewSound(this.load_progress, "./enemy_die.ogg", 0.7);
    this.character_die = new NewSound(this.load_progress, "./character_die.ogg", 1);
    this.item_get = new NewSound(this.load_progress, "./item_get.ogg", 0.4);
    this.power_up = new NewSound(this.load_progress, "./power_up.ogg", 0.7);
    this.boss_die = new NewSound(this.load_progress, "./boss_die.ogg", 0.9);
    this.boss_advent = new NewSound(this.load_progress, "./boss_advent.ogg", 0.8);
    this.clear = new NewSound(this.load_progress, "./clear.ogg", 1);
    this.game_over = new NewSound(this.load_progress, "./game_over.ogg", 1);
    this.stage_bgm = new NewSound(this.load_progress, "./stage_bgm.ogg", 0.5, 32.67104308);
    this.boss_bgm = new NewSound(this.load_progress, "./boss_bgm.ogg", 0.8, 25.611);
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
