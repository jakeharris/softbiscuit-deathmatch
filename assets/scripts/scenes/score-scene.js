function ScoreScene() {

  var name = 'Score'
  var DEFAULT_ENTITIES = [
      new Sprite({ x: 30, y: 30, img: 'assets/sprites/victor.png', width: 412, height: 600 }),
      new Sprite({ x: 3 * vpwidth() / 8, y: 30, img: 'assets/sprites/loser.png',  width: 412, height: 600, flipX: true}),
      new Text({ type: 'MenuItem', text: 'Player N wins!', y: height/2 + 44*2 }),
      new Text({ type: 'MenuItem', text: 'Player 1: X mistakes', y: height/2 + 44*4}),
      new Text({ type: 'MenuItem', text: 'Player 2: Y mistakes', y: height/2 + 44*5})
  ]
  var handleEvent = function (e) {


  }.bind(this)

  Scene.call(this, name, DEFAULT_ENTITIES, handleEvent)

  this.render = function () {
    var lightPink = 'rgb(247,192,218)',
        lightPinkWidth = 45,
        darkPink  = 'rgb(238,168,203)',
        darkPinkWidth = 20,
        x = 0

    for(var i = 0; i <= vpwidth() / darkPinkWidth; i++) {
      ctx.beginPath()

      var width = 0
      if(i % 2 === 0) {
        ctx.fillStyle = lightPink
        width = lightPinkWidth
      }
      else {
        ctx.fillStyle = darkPink
        width = darkPinkWidth
      }
      ctx.fillRect(x, 0, width, vpheight())
      x += width

      ctx.closePath()
    }

    if(!this.entities) return;
    this.entities.forEach(function (e, i, a) {
      e.render()
    });
  }
}
