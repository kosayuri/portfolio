class Stage extends Game {
  stage_data;
// CSVを配列で読み込む
  aaa(){
  // CSVファイルの読み込み
  function parseCsv(data) {
    // csv配列を変数に格納
    this.stage_data = this.csv_array(data);
    console.log(this.stage_data);
  }
  $.get("/assets/csv/v.csv", parseCsv, "text");
}

  csv_array(data) {
    let cnt = 0;
    const dataArray = [];
    const dataString = data.split('\n');

    for (let i = 0; i < dataString.length - 1; i++) {
      if (dataString[i].indexOf('/') == -1) {
        dataArray[cnt] = dataString[i].split(',');
        cnt++;
      }
    }
    return dataArray;
  }

  main(enemys, effect, cnt) {
    let knd;

    for (let i = 0; i < this.stage_data.length; i++) {
      if (this.stage_data[i][0] == (cnt + 81)) {
        if (this.flame_under_check(Number(this.stage_data[i][3]), Number(this.stage_data[i][4]))) {
          effect.warp_effect(this.stage_data[i]);
        }
      }

      if (this.stage_data[i][0] == cnt) {
        if ((knd = this.flag_check(enemys, this.ENEMY_MAX)) != -1) {
          enemys[knd].flag = 1;
          enemys[knd].pattern = Number(this.stage_data[i][1]);
          enemys[knd].knd = Number(this.stage_data[i][2]);
          enemys[knd].x = Number(this.stage_data[i][3]);
          enemys[knd].y = Number(this.stage_data[i][4]);
          enemys[knd].sp = Number(this.stage_data[i][5]);
          enemys[knd].bltime = Number(this.stage_data[i][6]);
          enemys[knd].blknd = (Number(this.stage_data[i][7]) > 36) ? 0 : Number(this.stage_data[i][7]);
          enemys[knd].col = Number(this.stage_data[i][8]);
          enemys[knd].hp = Number(this.stage_data[i][9]);
          enemys[knd].blknd2 = (Number(this.stage_data[i][10]) > 10) ? 0 : Number(this.stage_data[i][10]);
          enemys[knd].wait = Number(this.stage_data[i][11]);
          enemys[knd].item_n[0] = Number(this.stage_data[i][12]);
          enemys[knd].item_n[1] = Number(this.stage_data[i][13]);
          enemys[knd].item_n[2] = Number(this.stage_data[i][14]);
          enemys[knd].cnt = 0;
          enemys[knd].back_col = this.rand(2);
          enemys[knd].vx = 0;
          enemys[knd].vy = 0;
          enemys[knd].ang = 0;
          enemys[knd].base_sp = 0;
        }
      }
    }
  }
}
