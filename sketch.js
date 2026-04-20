let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 擷取攝影機影像
  capture = createCapture(VIDEO);
  // 隱藏預設的 DOM 影片元件，只顯示在畫布上
  capture.hide();
}

function draw() {
  background('#e7c6ff');
  
  // 設定影像寬高為全螢幕的 60%
  let vWidth = width * 0.6;
  let vHeight = height * 0.6;
  
  // 計算置中位置
  let x = (width - vWidth) / 2;
  let y = (height - vHeight) / 2;
  
  // 顯示影像
  image(capture, x, y, vWidth, vHeight);
}

function windowResized() {
  // 視窗大小改變時，同步調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
}
