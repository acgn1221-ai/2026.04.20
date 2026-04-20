let capture;
let pg; // 宣告繪圖畫布 (Graphics buffer)

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 擷取攝影機影像
  capture = createCapture(VIDEO);
  // 隱藏預設的 DOM 影片元件，只顯示在畫布上
  capture.hide();

  // 產生一個與視訊預計顯示大小相同的副畫布
  pg = createGraphics(windowWidth * 0.6, windowHeight * 0.6);
}

function draw() {
  background('#e7c6ff');
  
  // 設定影像寬高為全螢幕的 60%
  let vWidth = width * 0.6;
  let vHeight = height * 0.6;
  
  // 計算置中位置
  let x = (width - vWidth) / 2;
  let y = (height - vHeight) / 2;
  
  // --- 在副畫布 (pg) 上畫東西 ---
  pg.clear(); // 清除背景，使其變成透明，這樣才看得到下方的視訊
  
  // 讀取攝影機的像素資料
  capture.loadPixels();

  // 確保攝影機已經準備好並有像素資料
  if (capture.pixels.length > 0) {
    pg.textAlign(CENTER, CENTER);
    pg.textSize(8);
    pg.fill(0, 255, 0); // 設定文字顏色為綠色

    // 以 20*20 為一個單位遍歷副畫布
    for (let py = 0; py < pg.height; py += 20) {
      for (let px = 0; px < pg.width; px += 20) {
        // 將副畫布的座標 (px, py) 映射回攝影機原始影像的座標 (ix, iy)
        let ix = floor(map(px, 0, pg.width, 0, capture.width));
        let iy = floor(map(py, 0, pg.height, 0, capture.height));
        
        // 計算像素在 pixels 陣列中的位置 [R, G, B, A]
        let index = (ix + iy * capture.width) * 4;
        let r = capture.pixels[index];
        let g = capture.pixels[index + 1];
        let b = capture.pixels[index + 2];
        
        // 計算平均值並顯示
        let avg = floor((r + g + b) / 3);
        pg.text(avg, px + 10, py + 10);
      }
    }
  }

  // 顯示影像
  push();
  // 將繪製起點移至影像右側，並水平縮放 -1 倍來達成鏡像效果
  translate(x + vWidth, y);
  scale(-1, 1);
  image(capture, 0, 0, vWidth, vHeight);
  
  // 將副畫布顯示在視訊畫面之上
  image(pg, 0, 0, vWidth, vHeight);
  pop();
}

function windowResized() {
  // 視窗大小改變時，同步調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  pg.resizeCanvas(windowWidth * 0.6, windowHeight * 0.6);
}
