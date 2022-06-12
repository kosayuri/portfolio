
class FlashEffect {
  input() {
    this.flag = false;
    this.cnt = 0;
  }

  constructor() {
    this.input();
  }

  main() {
    if (this.flag) {
      if (this.cnt > 75) {
        this.input();
      } else {
        this.cnt++;
      }
    }
  }
}

class EndgameEffect {
  input() {
    this.flag = 0;
    this.cnt = 0;
  }

  constructor() {
    this.input();
  }

  main(sound, character) {
    if (this.flag > 0) {
      if (this.cnt == 150) {
        if (this.flag == 1)
          sound.clear.flag = 1;
        else
          sound.game_over.flag = 1;
      } else
        if (this.cnt == 350) {
          post("/game", { score: character.scr, authenticity_token: document.getElementsByName("csrf-token")[0].content });
        }
      this.cnt++;
    }
  }
}

class ShakeEffect extends Game {
  input() {
    this.flag = false;
    this.cnt = 0;
    this.time = 0;
    this.width = 0;
    this.x = 0;
    this.y = 0;
  }

  setting(time, width) {
    this.flag = true;
    this.time = time;
    this.width = width;
  }

  constructor() {
    super();
    this.input();
  }

  main() {
    if (this.flag) {
      if (this.cnt >= this.time) {
        this.input();
      } else {
        this.cnt++;
        this.x = this.rang(this.width);
        this.y = this.rang(this.width);
      }
    }
  }
}
