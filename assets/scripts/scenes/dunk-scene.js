function DunkScene() {

  var name = 'Dunk',
      DEFAULT_ENTITIES = [
        new Sprite   ({ img: 'assets/sprites/table.png', x: 25, y: vpheight() - 200, width: vpwidth() - 50, height: 100}),
        new Player   ({ player: PlayerNumber.ONE, x: 100, y: 100 }),
        new Player   ({ player: PlayerNumber.TWO, x: vpwidth() - 300, y: 100 }),
        new TimerBar ({ x: vpwidth() / 2 - 50, y: vpheight() * 3 / 4 })
      ],
      handleEvent = function (e) {
        var player1 = 1,
            player2 = 2,
            p1d = this.entities[player1].direction,
            p2d = this.entities[player2].direction,
            key = e.which

        if      (key == '65')  p1d = Direction.LEFT
        else if (key == '87')  p1d = Direction.UP
        else if (key == '68')  p1d = Direction.RIGHT
        else if (key == '83')  p1d = Direction.DOWN
        else if (key == '81' && !paused && this.entities[player1].canInsult(Hindrances.REVERSE)) {
          this.entities.push(new Hindrance(
            {
              player: PlayerNumber.TWO,
              type: Hindrances.REVERSE
            }
          ))
          this.entities[player1].hasUsedReverse = true
          this.entities[player2].isBeingReversed = true
        }
        else if (key == '37') p2d = Direction.LEFT
        else if (key == '38') p2d = Direction.UP
        else if (key == '39') p2d = Direction.RIGHT
        else if (key == '40') p2d = Direction.DOWN
        else if (key == '191' && this.entities[player2].canInsult(Hindrances.REVERSE)) {
          this.entities.push(new Hindrance(
            {
              player: PlayerNumber.ONE,
              type: Hindrances.REVERSE
            }
          ))
          this.entities[player2].hasUsedReverse = true
          this.entities[player1].isBeingReversed = true
        }
        else if (key == '27' || key == '80') pause()
        else if (key == '81' && paused) {
          this.end()
          pause()
          currentScene = Scenes.START
        }

        // Handle Reversies
        if(this.entities.length > 4) {
          for(var ent in this.entities) {
            var en = this.entities[ent]
            if(en instanceof Hindrance && en.type == Hindrances.REVERSE) {
              console.log('Reversing insult launched!')
              if(en.player == PlayerNumber.ONE) {
                if     (p1d == Direction.LEFT)  p1d = Direction.RIGHT
                else if(p1d == Direction.UP)    p1d = Direction.DOWN
                else if(p1d == Direction.RIGHT) p1d = Direction.LEFT
                else if(p1d == Direction.DOWN)  p1d = Direction.UP
              }
              else if (en.player == PlayerNumber.TWO) {
                if     (p2d == Direction.LEFT)  p2d = Direction.RIGHT
                else if(p2d == Direction.UP)    p2d = Direction.DOWN
                else if(p2d == Direction.RIGHT) p2d = Direction.LEFT
                else if(p2d == Direction.DOWN)  p2d = Direction.UP
              }
            }
          }
        }

        this.entities[player1].direction = p1d
        this.entities[player2].direction = p2d

        inputs.push(p1d)
      }.bind(this)

  Scene.call(this, name, DEFAULT_ENTITIES, handleEvent)

  this.init = function () {
    console.log(name + ' scene is starting...')
    document.addEventListener('keydown', this.handleEvent)
    this.initialized = true
    DEFAULT_ENTITIES[3].reset()
    return this.test()
  };

  this.logic = function () {
    if(!this.initialized) this.init();
    if(!this.entities) this.entities = cloneArray(DEFAULT_ENTITIES)

    if(this.entities[3].percentageComplete >= 100) this.end()

    if(this.entities.length > 4) {
      for(var ent in this.entities) {
        var en = this.entities[ent]
        if(en instanceof Hindrance && !en.alive) {
          if (en.player == PlayerNumber.ONE) {
            if     (en.type == Hindrances.REVERSE) this.entities[1].isBeingReversed = false
            else if(en.type == Hindrances.JITTERS) this.entities[1].isBeingJittered = false
          }
          else if(en.player == PlayerNumber.TWO) {
            if     (en.type == Hindrances.REVERSE) this.entities[2].isBeingReversed = false
            else if(en.type == Hindrances.JITTERS) this.entities[2].isBeingJittered = false
          }
          this.entities.splice(ent, 1)
        }
      }
    }

    return this.move()
  };

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

  this.end = function () {
    this.initialized = false
    console.log(name + ' scene is ending...')
    document.removeEventListener('keydown', this.handleEvent)
    currentScene = Scenes.SCORE
    this.entities = cloneArray(DEFAULT_ENTITIES)
  };
}
