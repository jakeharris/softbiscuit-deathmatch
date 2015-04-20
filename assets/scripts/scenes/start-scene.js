function StartScene() {

  var name = 'Start'
  var DEFAULT_ENTITIES = [
      new Sprite({ img: 'assets/sprites/title.png', x: 50, y: 50, width: vpwidth() - 100, height: 400 }),
      new Text({ type: 'MenuItem', text: 'Press any key to start', y: height/2 + 44*2 }),
      new Text({ type: 'MenuItem', text: 'Player 1: WASD to move, Q and E to insult', y: height/2 + 44*4}),
      new Text({ type: 'MenuItem', text: 'Player 2: Arrow keys, / and Shift to insult', y: height/2 + 44*5})
  ]
  var handleEvent = function (e) {
    scenes[Scenes.START].initialized = false
    currentScene = 1
    document.removeEventListener('keydown', this.handleEvent)
  }.bind(this)

  Scene.call(this, name, DEFAULT_ENTITIES, handleEvent)
}
