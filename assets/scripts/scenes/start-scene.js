function StartScene() {

  var name = 'Start';
  var DEFAULT_ENTITIES = [
      new Text({ type: 'Title', text: 'SOFTBISCUIT DEATHMATCH' }),
      new Text({ type: 'MenuItem', text: 'Press any key to start', y: height/2 })
  ];
  var handleEvent = function (e) {
    scenes[0].initialized = false;
    cur = 1;
    document.removeEventListener('keydown', this.handleEvent);
  }.bind(this);

  Scene.call(this, name, DEFAULT_ENTITIES, handleEvent);
}
