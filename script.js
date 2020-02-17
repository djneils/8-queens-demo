let board = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
]
let checker, queen
let startQueenY = 0
let boardWidth,cellWidth
function preload() {
  queen = loadImage('queen.png')
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  boardWidth=height
  cellWidth=boardWidth/8
  textAlign(CENTER, CENTER)
  noStroke()

}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
    boardWidth=height
  cellWidth=boardWidth/8
}
function draw() {
  background(255)
  let black = true

  noStroke()

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (black) {

        fill(120)
      } else {
        fill(255)
      }
      black = !black
      rect(col * cellWidth, row * cellWidth, cellWidth, cellWidth)
      if (board[row][col] == 1) {
        image(queen, col * cellWidth + cellWidth*0.1, row * cellWidth + (cellWidth*0.1), cellWidth*0.8, cellWidth*0.8)
      }

    }
    black = !black
  }
  noFill()
  stroke(255, 0, 0)
  strokeWeight(4)
  startQueenY = floor(lerp(startQueenY, floor(mouseY / cellWidth) * cellWidth, 0.25))
  if (abs(startQueenY - (floor(mouseY / cellWidth) * cellWidth)) < 10) {
    startQueenY = floor(mouseY / cellWidth) * cellWidth
  }
  startQueenY = constrain(startQueenY, 0, height-cellWidth)
  tint(155, 164)

  image(queen,cellWidth*0.1, startQueenY + cellWidth*0.1, cellWidth*0.8, cellWidth*0.8)
  //image(queen, col * cellWidth + cellWidth*0.1, row * cellWidth + (cellWidth*0.1), cellWidth*0.8, cellWidth*0.8)
  noTint()
  stroke(0)
  strokeWeight(1)
  stroke(120)
  noFill()
  strokeWeight(2)
  rect(0, 0, boardWidth, boardWidth)
}
function mousePressed() {
  let r = floor(mouseY / 50)
  r = constrain(r, 0, 7)
  board = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]
  board[r][0] = 1
  nQueens(1)


}
function nQueens(col) {
  if (col >= 8) return true
  for (let i = 0; i < 8; i++) {
    if (queenSafe(i, col)) {
      board[i][col] = 1
      if (nQueens(col + 1)) {
        return true
      } else {
        board[i][col] = 0
      }
    }
  }
  return false
}





function queenSafe(row, col) {
  for (let i = 0; i < 8; i++) {
    if (board[row][i] == 1 || board[i][col] == 1) {
      return false
    }
  }
  for (let i = row, j = col; i >= 0 && j >= 0; i-- , j--) {
    if (board[i][j] == 1) return false
  }
  for (let i = row, j = col; j >= 0 && i < 8; i++ , j--) {
    if (board[i][j] == 1) return false
  }
  return true
}


