/* ====
 * GAME
 * ====
 */


var width = vpwidth(),
    height = vpheight(),
    canvas = document.getElementById('sbdm'),
    ctx = canvas.getContext('2d'),
    scenes = [],
    currentScene = 0, // make this an enum
    game,
    inputs = [],
    paused = false

ctx.font = "22pt Cascada"

var clear = function () {
  var dim = setGameDimensions(vpwidth(), vpheight())

  if(canvas.width != vpwidth() || canvas.height != vpheight()) {
    canvas.width = vpwidth()
    canvas.height = vpheight()
  }

  ctx.fillStyle = 'rgb(255, 240, 250)'
  ctx.textAlign = 'center'
  ctx.beginPath()
  ctx.rect(0, 0, canvas.width, canvas.height)
  ctx.closePath()
  ctx.fill()
}

var render = function () {
  if(!scenes || !scenes[0]) scenes = [ new StartScene({ }), new DunkScene({ }) ]
  if(!scenes[currentScene]) {
    console.log("Current scene variable currentScene has exceeded legal bounds. (val: " + currentScene + ").")
  }
  scenes[currentScene].render()
}

var logic = function () {
  if(!scenes || !scenes[0]) scenes = [ new StartScene({ }), new DunkScene({ }) ]
  if(!scenes[currentScene]) {
    console.log("Current scene variable currentScene has exceeded legal bounds. (val: " + currentScene + ").")
  }
  scenes[currentScene].logic()
}

var loop = function () {
  clear()
  render()
  logic()

  game = setTimeout(loop, 10)
}

var renderPause = function () {
  var dim = setGameDimensions(vpwidth(), vpheight())
  width = dim.width
  height = dim.height

  if(canvas.width != vpwidth() || canvas.height != vpheight()) {
    canvas.width = vpwidth()
    canvas.height = vpheight()
  }

  ctx.fillStyle = 'rgb(204, 204, 255)'
  ctx.beginPath()
  ctx.rect(0, 0, vpwidth(), vpheight())
  ctx.closePath()
  ctx.fill()

  ctx.fillStyle = "rgba(0, 0, 0, .5)"
  ctx.beginPath()
  ctx.rect(0, 0, width, height)
  ctx.closePath()
  ctx.fill()

  ctx.fillStyle = "#fff"
  ctx.beginPath()
  ctx.fillText('Press P or ESC to continue playing.', width*3/8, height/2) //FIXME
  ctx.fillText('Press Q to quit.', width*3/8, height/2 + 64)
  ctx.closePath()
}

var pause = function () {
  renderPause()
  if(!paused) {
    clearTimeout(game)
    paused = true
  } else {
    game = setTimeout(loop, 10)
    paused = false
  }
}

loop()
