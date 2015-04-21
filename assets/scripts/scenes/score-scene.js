function ScoreScene() {

  var name = 'Score'
  var DEFAULT_ENTITIES = [
      new Sprite({ x: 30, y: 30, img: 'assets/sprites/victor.png', width: 412, height: 600 }),
      new Sprite({ x: 5 * vpwidth() / 8, y: 30, img: 'assets/sprites/player2-loser.png',  width: 412, height: 600 }),
      new Text({ type: 'MenuItem', text: 'Player N wins!', y: vpheight()/2 - 44*2 }),
      new Text({ type: 'MenuItem', text: 'Player 1: X mistakes', y: vpheight()/2}),
      new Text({ type: 'MenuItem', text: 'Player 2: Y mistakes', y: vpheight()/2 + 44}),
      new Text({ type: 'MenuItem', text: '(Press Space to play again.)', y: vpheight()/2 + 44*3 })
  ]
  var handleEvent = function (e) {
    var key = e.which

    if(key == '32') {
      this.end()
    }

  }.bind(this)

  Scene.call(this, name, DEFAULT_ENTITIES, handleEvent)

  this.init = function () {
    console.log(name + ' scene is starting...');
    document.addEventListener('keydown', this.handleEvent);
    this.initialized = true;

    var winner = '',
        p1m = 0,
        p2m = 0,
        p1Sprite = 0,
        p2Sprite = 1,
        winnerText = 2,
        p1Text = 3,
        p2Text = 4,
        p1 = scenes[Scenes.DUNK].entities[1],
        p2 = scenes[Scenes.DUNK].entities[2],
        startingCookieHealth = 10

    if(p1.cookie.health > p2.cookie.health) {
      winner = '1'
    }
    else if (p1.cookie.health < p2.cookie.health) {
      winner = '2'
    }

    p1m = startingCookieHealth - p1.cookie.health
    p2m = startingCookieHealth - p2.cookie.health

    if(!this.entities) this.entities = cloneArray(DEFAULT_ENTITIES);


    if(winner !== '') this.entities[winnerText].text = 'Player ' + winner + ' wins!'
    if(winner === '') this.entities[winnerText].text = 'It\'s a tie!'
    this.entities[p1Text].text = 'Player 1: ' + p1m + ' mistakes'
    this.entities[p2Text].text = 'Player 2: ' + p2m + ' mistakes'

    // If player 1 wins, do nothing, since that's the default configuration

    if(winner === '2') {
      this.entities[p1Sprite] = new Sprite({ x: 30, y: 30, width: 412, height: 600, img: 'assets/sprites/loser.png' })
      this.entities[p2Sprite] = new Sprite({ x: 5 * vpwidth() / 8, y: 30, width: 412, height: 600, img: 'assets/sprites/player2-victor.png' })
    }
    if(winner === '') {
      this.entities[p1Sprite] = new Sprite({ x: 30, y: 30, width: 412, height: 600, img: 'assets/sprites/loser.png' })
    }

    return this.test();
  }

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
    })
  }

  this.end = function () {
    this.initialized = false
    console.log(name + ' scene is ending...')
    document.removeEventListener('keydown', this.handleEvent)
    currentScene = Scenes.DUNK
    this.entities = cloneArray(DEFAULT_ENTITIES)
  }
}
