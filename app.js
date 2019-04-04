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

console.log('JS loaded')
document.addEventListener('DOMContentLoaded', () =>{

  //Defining the grid
  const grid = document.querySelector('.grid')
  //Getting the scores
  const scores = document.querySelector('.scores')
  //Width of the grid
  const width = 18
  //Grid Squares
  const squares = []
  //Getting the audio from the HTML
  const mySound = document.querySelector('audio')
  //Snake starting position
  let snake = [3,2,1,0]
  //Defining the starting score for the scoreBoard
  let scoreBoard = 0
  // let randomIndex = 0
  //"Snake's" starting speed
  let snakeSpeed = 400
  //Starting direction of the snake
  let direction = 'right'
  //Getting the reset button from the HTML
  const resetButton = document.querySelector('button')
  //Defining death screen for gameOver
  document.querySelector('.death')

  for(let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    square.style.width = `calc(100%/${width})`
    square.style.height = `calc(100%/${width})`
    squares.push(square)
    grid.appendChild(square)
  }

  //Defining the gameOver function
  function gameOver() {
    eraseSnake()
    grid.classList.remove('grid')
    grid.classList.add('death')
    mySound.src = 'audio/youdied.mp3'
    snakeSpeed = 400
    mySound.play()
  }


  // Creating audio function to play in the background of the game
  function gameSound() {
    mySound.src = 'audio/castlevania.mp3'
    mySound.play()
  }


  // Function for snake death on contact with tail
  function dieSnake() {
    console.log('dieSnake()')
    if(snake.slice(1).includes([0])) {
      return gameOver()

    }
  }

  //Food spawns(food cannot spawn in the tail)
  function fuel(){
    let randomIndex = Math.floor(Math.random() * squares.length)
    while(squares[randomIndex].classList.contains('snake')) {
      randomIndex = Math.floor(Math.random() * squares.length)
    }

    squares[randomIndex].classList.add('fuel')
  }


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

  //=====================================================================

  // Define movement of the snake/directions
  function moveSnake() {
    if (snake[0] % width === 0 && direction === 'left' ||
      snake[0] % width === width -1  && direction === 'right' ||
      snake[0] - width < 0  && direction === 'up' ||
      snake[0] >= width * (width - 1 )  && direction === 'down' ||

      snake.slice(1).includes(snake[0])) {
      return gameOver()

    }

    //Calling the erase function
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

    // function drawHead(vector) {
    // const head = snake[0] + vector
    // snake.unshift(head)
    // squares[head].classList.add('snake')
    // squares[head].setAttribute('data-direction', direction)
    // }

    // function eraseTail() {
    // const tail = snake.pop()
    // squares[tail].classList.remove('snake')
    // squares[tail].removeAttribute('data-direction')
    // }

    function drawSnake() {
      console.log('drawing snake')
      snake.forEach(index => {
        squares[index].classList.add('snake')
        squares[index].setAttribute('data-direction', direction)
      })
    }
    function eraseSnake() {
      console.log('removing snake')
      snake.forEach(index => {
        squares[index].classList.remove('snake')
        squares[index].removeAttribute('data-direction')
      })
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
    grid.classList.remove('death')
    grid.classList.add('grid')
    direction = 'right'
    snakeSpeed -= -400


    drawSnake()
    moveSnake()
    gameSound()

  })
  gameSound()
  console.log(gameSound)
})
