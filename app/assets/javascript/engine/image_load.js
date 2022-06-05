class ImageLoad extends Game {
  cnt;
  board;
  background;
  character;
  booster;
  character_hit_point;
  character_bullet;
  enemy;
  bullet;
  status;
  number;
  character_option;
  item;
  boss;
  boss_hp;
  play_result;
  die_effect0;
  die_effect1;

  load_image(src) {
    let img = new Image();
    img.src = src + ".png";
    img.addEventListener('load', (e) => {
      this.load_progress++;
    });
    return img;
  }

  load_images(MaxImgCount, src) {
    let img = [];

    for (let i = 0; i < MaxImgCount; i++) {
      img[i] = new Image();
      img[i].src = src + String(i) + ".png";
    }

    for (let i = 0; i < MaxImgCount; i++) {
      img[i].addEventListener('load', (e) => {
        this.load_progress++;
      });
    }
    return img;
  }

  Load() {
    this.load_progress = 0;
    this.board = new Img(this.load_images(this.BOARD_MAX_COUNT, "/assets/board"));
    this.background = new Img(this.load_image("/assets/background"));
    this.character = new Img(this.load_image("/assets/character"), 62);
    this.booster = new Img(this.load_image("/assets/booster"), 4);
    this.character_hit_point = new Img(this.load_image("/assets/character_hit_point"));
    this.character_option = new Img(this.load_image("/assets/character_option"));
    this.character_bullet = new Img(this.load_images(2, "/assets/character_bullet"));
    this.enemy = [];
    this.enemy[0] = new Img(this.load_image("/assets/enemy0"), 30);
    this.enemy[1] = new Img(this.load_image("/assets/enemy1"));
    this.boss = new Img(this.load_image("/assets/boss"));
    this.boss_hp = new Img(this.load_image("/assets/boss_hp"));
    this.item = [];
    this.item[0] = new Img(this.load_image("/assets/item0"), 35);
    this.item[1] = new Img(this.load_image("/assets/item1"), 45);
    this.bullet = [];
    this.bullet[0] = new Img(this.load_image("/assets/bullet0"), 76);
    this.bullet[1] = new Img(this.load_image("/assets/bullet1"), 22);
    this.bullet[2] = new Img(this.load_image("/assets/bullet2"), 5);
    this.bullet[3] = new Img(this.load_image("/assets/bullet3"), 19);
    this.bullet[4] = new Img(this.load_image("/assets/bullet4"), 35);
    this.bullet[5] = new Img(this.load_image("/assets/bullet5"), 14);
    this.bullet[6] = new Img(this.load_image("/assets/bullet6"), 21);
    this.bullet[7] = new Img(this.load_image("/assets/bullet7"), 16);
    this.bullet[8] = new Img(this.load_image("/assets/bullet8"), 12);
    this.bullet[9] = new Img(this.load_image("/assets/bullet9"), 20);
    this.bullet[10] = new Img(this.load_image("/assets/bullet10"), 10);
    this.bullet[11] = new Img(this.load_image("/assets/bullet11"), 32);
    this.status = new Img(this.load_images(6, "/assets/status"));
    this.number = new Img(this.load_image("/assets/number"), 20);
    this.arrow = new Img(this.load_image("/assets/arrow"));
    this.play_result = new Img(this.load_images(2, "/assets/play_result"));
    this.die_effect0 = new Img(this.load_image("/assets/die_effect0"), 140);
    this.die_effect1 = new Img(this.load_image("/assets/die_effect1"), 140);
  }
}
