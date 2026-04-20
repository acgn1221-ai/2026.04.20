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
  pg.fill(255, 255, 0); // 黃色
  pg.noStroke();
  pg.ellipse(pg.width / 2, pg.height / 2, 50, 50); // 在副畫布中心畫一個圓
  pg.fill(0);
  pg.textAlign(CENTER, CENTER);
  pg.text("這是覆蓋圖層", pg.width / 2, pg.height / 2 + 40);

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
