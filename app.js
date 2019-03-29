console.log('JS loaded')
document.addEventListener('DOMContentLoaded', () =>{

  const grid = document.querySelector('.grid')
  const width = 18
  const squares = []
  const snake = [171,172,173,174]
  let direction = 'right'




  for(let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    squares.push(square)
    grid.appendChild(square)
  }

  function drawSnake() {
    console.log('draw')
    snake.forEach(index => squares[index].classList.add('snake'))
  }

  function eraseSnake() {
    console.log('erase')
    snake.forEach(index => squares[index].classList.remove('snake'))
  }

  function moveSnake() {
    if (snake[0] % width === 0 && direction === 'left' ||
          snake[0] % width === width -1  && direction === 'right' ||
          snake[0] - width < 0  && direction === 'up' ||
          snake[0] >= width * (width - 1 )  && direction === 'down') {
      return false
    }
    console.log(snake)
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
    drawSnake()
  }

  drawSnake()

  setInterval(moveSnake, 100)


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

  function moveLeft(){
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
      case 37: direction = 'left'
        break
      case 38: direction = 'up'
        break
      case 39: direction = 'right'
        break
      case 40: direction = 'down'
        break
    }
  })
})


//  get from JS
// Define the snake array
// Assign those four squares a class of active  = snake
// Define starting position of the snake
// Define movement of snake
//    add event listener to each movement key
// Create a push/pop function to roll snake along
//    incoporating a loop
// Generate a random number
// Store in a variable (i.e let apple)
// Give random square a class of apple (like active)
// Display apple
// To be continued ...
