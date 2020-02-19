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
let frame = 0
let recordings = []
let checker, queen
let startQueenY = 0
let boardWidth, cellWidth
let fr = 2
let stepMode = false
let trap = false
let dir = 1
function preload() {
  queen = loadImage('queen.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  boardWidth = min(width, height)
  cellWidth = boardWidth / 8
  textAlign(CENTER, CENTER)
  noStroke()

}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  boardWidth = min(width, height)
  cellWidth = boardWidth / 8
}

function keyPressed() {
  if (key == 's' || key == 'S') {
    stepMode = !stepMode
  }
  if (keyCode == LEFT_ARROW) {
    dir = -1
    if (stepMode) {
      trap = true
    }
  }
  if (keyCode == RIGHT_ARROW) {
    dir = 1
    if (stepMode) {
      trap = true
    }
  }


}
function drawInfo(message) {
  rectMode(CENTER)
  fill(120, 130)
  stroke(0)
  strokeWeight(1)
  rect(width * 0.8, height * 0.05, 1.1 * textWidth(message), cellWidth * 0.5)
  rectMode(CORNER)
  fill(0)
  noStroke()
  text(message, width * 0.8, height * 0.05)
}
function draw() {
  let fr = floor(map(mouseX, 0, width, 1, 8))

  background(255)
  let black = true
  strokeWeight(1)
  stroke(0)

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
        image(queen, col * cellWidth + cellWidth * 0.1, row * cellWidth + (cellWidth * 0.1), cellWidth * 0.8, cellWidth * 0.8)
      }

    }
    black = !black
  }
  if (stepMode == true) {
    drawInfo('<ARROWS>')
  } else {
    drawInfo('SPEED:' + fr + 'fps')
  }


  if (frame < recordings.length && (trap == true || !stepMode)) {
    trap = false
    board = recordings[frame]
    frame = frame + dir
    frameRate(fr)




  } else {
    if (frame > recordings.length) {
      frameRate(60)

      textAlign(CENTER, CENTER)
      textSize(cellWidth / 5)
      fill(120, 130)
      stroke(0)
      square(cellWidth * 0.05, startQueenY + cellWidth * 0.05, cellWidth * 0.9)
      noStroke()
      fill(0, 0, 255)
      text('PLACE\nFIRST\nQUEEN', cellWidth - cellWidth / 2, startQueenY + cellWidth / 2)
    }

  }
  noFill()
  stroke(255, 0, 0)
  strokeWeight(4)
  startQueenY = floor(lerp(startQueenY, floor(mouseY / cellWidth) * cellWidth, 0.25))
  if (abs(startQueenY - (floor(mouseY / cellWidth) * cellWidth)) < 10) {
    startQueenY = floor(mouseY / cellWidth) * cellWidth
  }
  startQueenY = constrain(startQueenY, 0, boardWidth - cellWidth)
  tint(155, 164)



  noTint()
  stroke(0)
  strokeWeight(1)
  stroke(120)
  noFill()
  strokeWeight(2)
  rect(0, 0, boardWidth, boardWidth)
}

// function touchStarted() {
//   let r = floor(mouseY / 50)
//   r = constrain(r, 0, 7)
//   board = [
//     [0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0],
//   ]
//   board[r][0] = 1
//   nQueens(1)
// }


function mousePressed() {
  recordings = []
  frame = 0
  let r = floor(mouseY / cellWidth)
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
  queensHelp(1, board)
  frameRate(fr)
}
function copyArr(arr) {
  let copy = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      copy[r][c] = arr[r][c]
    }
  }
  return copy
}
function queensHelp(col, arr) {
  let c = copyArr(arr)
  nQueens(col)
  return c
}
function nQueens(col) {
  if (col >= 8) return true
  for (let i = 0; i < 8; i++) {
    if (queenSafe(i, col)) {
      board[i][col] = 1
      recordings.push(copyArr(board))
      if (nQueens(col + 1)) {
        return true
      } else {
        //recordings.push(copyArr(board))
        board[i][col] = 0
        recordings.push(copyArr(board))
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


