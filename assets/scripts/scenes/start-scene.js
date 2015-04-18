function StartScene() {

  var name = 'Start'
  var DEFAULT_ENTITIES = [
      new Text({ type: 'Title', text: 'SOFTBISCUIT DEATHMATCH' }),
      new Text({ type: 'MenuItem', text: 'Press any key to start', y: height/2 + 44 }),
      new Text({ type: 'MenuItem', text: 'Player 1: WASD', y: height/2 + 44*3}),
      new Text({ type: 'MenuItem', text: 'Player 2: Arrow keys', y: height/2 + 44*4})
  ]
  var handleEvent = function (e) {
    scenes[Scenes.START].initialized = false
    currentScene = 1
    document.removeEventListener('keydown', this.handleEvent)
  }.bind(this)

  Scene.call(this, name, DEFAULT_ENTITIES, handleEvent)
}
