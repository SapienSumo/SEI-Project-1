console.log('JS loaded')
document.addEventListener('DOMContentLoaded', () =>{

  const grid = document.querySelector('.grid')
  const scores = document.querySelector('.scores')
  const width = 18
  const squares = []
  let snake = [3,2,1,0]
  let scoreBoard = 0
  //let timer
  let snakeSpeed = 250
  //const snakeMoving = setInterval(moveSnake, 100)
  let direction = 'right'
  const resetButton = document.querySelector('button')
  //const chosenSquare = 0


  for(let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    squares.push(square)
    grid.appendChild(square)
  }

  //Defining the gameOver function
  function gameOver() {
    grid.classList.remove('grid')
  }

  function dieSnake() {
    console.log('dieSnake()')
    if(snake.slice(1).includes([0])) {
      return gameOver()

    }
  }

  function fuel(){
    const chosenSquare = squares[Math.floor(Math.random() * squares.length)]
    chosenSquare.classList.add('fuel')
    console.log(chosenSquare)
  }

  // function reset() {
  // }

  fuel()
  // snake will now show on the board
  function drawSnake() {
    console.log('draw')
    snake.forEach(index => squares[index].classList.add('snake'))
  }

  // snake will no longer grow endlessly, tail now has an end.
  function eraseSnake() {
    console.log('erase')
    snake.forEach(index => squares[index].classList.remove('snake'))
  }

  //========================================================

  // define movement of the snake/directions

  function moveSnake() {
    if (snake[0] % width === 0 && direction === 'left' ||
      snake[0] % width === width -1  && direction === 'right' ||
      snake[0] - width < 0  && direction === 'up' ||
      snake[0] >= width * (width - 1 )  && direction === 'down' ||
      snake.slice(1).includes(snake[0])) {
      return gameOver()

    }

    //collision with snake tail
    // if(snake.slice(1).includes(snake[0])){
    // game over
    // }

    eraseSnake()

    switch(direction){
      case 'right': moveRight()
        break
      case 'left': moveLeft()
        break
      case 'up': moveUp()
        break
      case 'down': moveDown()
    }


    if (squares[snake[0]].classList.contains('fuel')) {
      scoreBoard++
      snakeSpeed -= 10
      scores.innerText = scoreBoard
      squares[snake[0]].classList.remove('fuel')
      snake.push(snake[snake.length-1])
      fuel()
    }

    drawSnake()
    setTimeout(moveSnake, snakeSpeed)
    dieSnake()

  }

  moveSnake()


  function moveDown(){
    eraseSnake()
    snake.pop()
    snake.unshift(snake[0] + width)
    drawSnake()
  }

  function moveUp(){
    eraseSnake()
    snake.pop()
    snake.unshift(snake[0] - width)
    drawSnake()
  }

  function moveLeft() {
    eraseSnake()
    snake.pop()
    snake.unshift(snake[0] - 1)
    drawSnake()
  }


  function moveRight(){
    eraseSnake()
    snake.pop()
    snake.unshift(snake[0] + 1)
    drawSnake()
  }


  document.addEventListener('keydown', (e) => {
    console.log(e.keyCode)
    switch(e.keyCode) {
      case 37: if(direction !== 'right') direction = 'left'
        break
      case 38: if(direction !== 'down') direction = 'up'
        break
      case 39: if(direction !== 'left') direction = 'right'
        break
      case 40: if(direction !== 'up')  direction = 'down'
        break
    }

  })

  resetButton.addEventListener('click', () => {
    snake.forEach(index => squares[index].classList.remove('snake'))
    snake = [3,2,1,0]
    scoreBoard = 0
    scores.innerText = scoreBoard
    grid.classList.add('grid')
    direction = 'right'
    snakeSpeed -= -100


    drawSnake()
    moveSnake()
  })
})



// Get from JS
// Define the snake array
// Assign those four squares a class of active  = snake
// Define starting position of the snake
// Define movement of snake
// Add event listener to each movement key
// Create a push/pop function to roll snake along
// Incoporating a loop
// Generate a random number
// Store in a variable (i.e let apple)
// Give random square a class of apple (like active)
// Display apple
// To be continued ...
