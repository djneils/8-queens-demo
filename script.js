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

function preload() {
  queen = loadImage('queen.png')
}

function setup() {
  createCanvas(400, 400)
  textAlign(CENTER, CENTER)
  noStroke()

}

function draw() {
  background(100)
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
      rect(col * 50, row * 50, 50, 50)
      if (board[row][col] == 1) {
        image(queen, col * 50 + 5, row * 50 + 5, 40, 40)
      }

    }
    black = !black
  }
  noFill()
  stroke(255, 0, 0)
  strokeWeight(4)
  startQueenY = floor(lerp(startQueenY, floor(mouseY / 50) * 50, 0.25))
  if (abs(startQueenY - (floor(mouseY / 50) * 50)) < 10) {
    startQueenY = floor(mouseY / 50) * 50
  }
  startQueenY = constrain(startQueenY, 0, 350)
  tint(155, 164)

  image(queen, 5, startQueenY + 5, 40, 40)
  noTint()
  stroke(0)
  strokeWeight(1)
  stroke(120)
  noFill()
  strokeWeight(2)
  rect(0, 0, width, height)
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


