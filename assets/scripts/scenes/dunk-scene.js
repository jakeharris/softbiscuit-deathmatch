function DunkScene() {

  var name = 'Dunk'
  var DEFAULT_ENTITIES = [
      new Text({ type: 'Title', text: 'DUNKING SCENE' }),
      new Player({ which: PlayerNumber.ONE, x: 100, y: 100 }),
      new Player({ which: PlayerNumber.TWO, x: vpwidth() - 300, y: 100 }),
      new TimerBar({ x: vpwidth() / 2 - 50, y: vpheight() * 3 / 4 })
  ]
  var handleEvent = function (e) {
    var d = scenes[Scenes.DUNK].entities[0].direction,
        key = e.which

    if      (key == '37' && d != Direction.RIGHT) d = Direction.LEFT
    else if (key == '38' && d != Direction.DOWN)  d = Direction.UP
    else if (key == '39' && d != Direction.LEFT)  d = Direction.RIGHT
    else if (key == '40' && d != Direction.UP)    d = Direction.DOWN
    else if (key == '27' || key == '80') pause()
    else if (key == '81' && paused) {
      scenes[Scenes.DUNK].end()
      pause()
      currentScene = Scenes.START
    }
    inputs.push(d)
  }.bind(this)

  Scene.call(this, name, DEFAULT_ENTITIES, handleEvent)
}
