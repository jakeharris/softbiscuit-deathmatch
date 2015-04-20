function DunkScene() {

  var name = 'Dunk',
      DEFAULT_ENTITIES = [
        new Text     ({ type: 'Title', text: 'DUNKING SCENE' }),
        new Sprite   ({ img: 'assets/sprites/table.png', x: 25, y: vpheight() - 200, width: vpwidth() - 50, height: 100}),
        new Player   ({ player: PlayerNumber.ONE, x: 100, y: 100 }),
        new Player   ({ player: PlayerNumber.TWO, x: vpwidth() - 300, y: 100, cookieSprite: 'assets/sprites/biscuit-bishop.png' }),
        new TimerBar ({ x: vpwidth() / 2 - 50, y: vpheight() * 3 / 4 })
      ],
      handleEvent = function (e) {
        var p1d = this.entities[2].direction,
            p2d = this.entities[3].direction,
            key = e.which

        if      (key == '65')  p1d = Direction.LEFT
        else if (key == '87')  p1d = Direction.UP
        else if (key == '68')  p1d = Direction.RIGHT
        else if (key == '83')  p1d = Direction.DOWN

        else if (key == '37') p2d = Direction.LEFT
        else if (key == '38') p2d = Direction.UP
        else if (key == '39') p2d = Direction.RIGHT
        else if (key == '40') p2d = Direction.DOWN

        else if (key == '27' || key == '80') pause()
        else if (key == '81' && paused) {
          this.end()
          pause()
          currentScene = Scenes.START
        }

        this.entities[2].direction = p1d
        this.entities[3].direction = p2d

        inputs.push(p1d)
      }.bind(this),
      insultCooldown = 3000

  Scene.call(this, name, DEFAULT_ENTITIES, handleEvent)

  this.init = function () {
    console.log(name + ' scene is starting...');
    document.addEventListener('keydown', this.handleEvent);
    this.initialized = true;
    DEFAULT_ENTITIES[4].reset();
    return this.test();
  };

  this.logic = function () {
    if(!this.initialized) this.init();
    if(!this.entities) this.entities = cloneArray(DEFAULT_ENTITIES);

    if(this.entities[4].percentageComplete >= 100) this.end();

    return this.move();
  };

  this.end = function () {
    this.initialized = false;
    console.log(name + ' scene is ending...');
    document.removeEventListener('keydown', this.handleEvent);
    currentScene = Scenes.CONSUME
    this.entities = cloneArray(DEFAULT_ENTITIES);
  };
}
