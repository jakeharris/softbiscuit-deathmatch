function DunkScene() {

  var name = 'Dunk'
  var DEFAULT_ENTITIES = [
      new Text     ({ type: 'Title', text: 'DUNKING SCENE' }),
      new Sprite   ({ img: 'assets/sprites/table.png', x: 25, y: vpheight() - 200, width: vpwidth() - 50, height: 100}),
      new Player   ({ which: PlayerNumber.ONE, x: 100, y: 100 }),
      new Player   ({ which: PlayerNumber.TWO, x: vpwidth() - 300, y: 100, cookieSprite: 'assets/sprites/biscuit-bishop.png' }),
      new TimerBar ({ x: vpwidth() / 2 - 50, y: vpheight() * 3 / 4 })
  ]
  var handleEvent = function (e) {
    var p1d = scenes[Scenes.DUNK].entities[2].direction,
        p2d = scenes[Scenes.DUNK].entities[3].direction,
        key = e.which

    if      (key == '65' && d != Direction.RIGHT) d = Direction.LEFT
    else if (key == '65') d = Direction.NONE
    else if (key == '87' && d != Direction.DOWN)  d = Direction.UP
    else if (key == '87') d = Direction.NONE
    else if (key == '68' && d != Direction.LEFT)  d = Direction.RIGHT
    else if (key == '68') d = Direction.NONE
    else if (key == '83' && d != Direction.UP)    d = Direction.DOWN
    else if (key == '83') d = Direction.NONE
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
