/* =====
 * TYPES
 * =====

   Types common to the whole game.

 */

 // # Enums
 var Scenes = {
   START: 0,
   DUNK: 1,
   CONSUME: 2,
   SCORE: 3
 }
 var Direction = {
   LEFT: 0,
   TOP: 1,
   RIGHT: 2,
   DOWN: 3
 }
 var PlayerNumber = {
   ONE: 0,
   TWO: 1
 }

// # Classes
 function Menu (items, opts) {
   this.items = items;
   this.spacing = (opts.spacing) ? opts.spacing : height / 10;
   this.x = (opts.x) ? opts.x : width / 2 - 100;
   this.y = (opts.y) ? opts.y : (height - 400);
   this.cursor = new Cursor ( items.length - 1, { h: 16, w: 16 } )

   while(this.items[this.cursor.i].isCursorable !== undefined && !this.items[this.cursor.i].isCursorable) this.cursor.i++;

   items.forEach(function (e, i, a) {
     e.x = this.x;
     e.y = this.y;
     if(e.type === "MenuItem") {
       e.x += BLOCK_WIDTH;
       e.y += i*this.spacing;
     }
     if (i == items.length - 1 && e.isQuitOption === true) e.y += this.spacing;
   }, this);

   this.render = function () {
     this.spacing = height / 10;
     this.cursor.render(this.x, this.items[this.cursor.i].y - this.cursor.h);
     items.forEach(function (e, i, a) {
       e.x = this.x;
       e.y = this.y;
       if(e.type === "MenuItem") {
         e.x += BLOCK_WIDTH;
         e.y += i*this.spacing;
       }
       if (i == items.length - 1 && e.isQuitOption === true) e.y += this.spacing;
       e.render();
     }, this);
   }

   this.move = function () {
     var d = this.cursor.move();
     if(this.items[this.cursor.i].isCursorable !== undefined && !this.items[this.cursor.i].isCursorable) {
       inputs.push(d);
       this.cursor.move();
     }
     items.forEach(function (e, i, a) {
       e.move();
     });
   }
 }

 function Cursor (max, opts) {
   this.max = max;

   this.i = (opts.i) ? opts.i : 0;
   this.w = (opts.w) ? opts.w : BLOCK_WIDTH;
   this.h = (opts.h) ? opts.h : BLOCK_HEIGHT;

   this.fillStyle = (opts.fillStyle) ? opts.fillStyle : '#282828';

   this.move = function () {
     var d;
     if(inputs.length > 0) {  d = inputs.pop(); }
     if(d) {
       switch(d){
         case Direction.UP:
           if (--this.i < 0) this.i = this.max;
           break
         case Direction.DOWN:
           if (++this.i > this.max) this.i = 0;
           break
         case Direction.LEFT:
           break
         case Direction.RIGHT:
           break
         default:
           break
       }
     }
     return d;
   };

   this.render = function (x, y) {
     ctx.beginPath();
     ctx.fillStyle = this.fillStyle;
     ctx.fillRect(x, y, this.w, this.h);
     ctx.closePath();
   };
 }

 function Text (opts) {
   this.type = (opts.type) ? opts.type : "Title";
   this.text = (opts.text) ? opts.text : "OUROBOROS";

   this.isQuitOption = (opts.isQuitOption) ? opts.isQuitOption : false;
   this.isCursorable = (opts.isCursorable !== undefined) ? opts.isCursorable : true;

   this.x = (opts.x) ? opts.x : (width / 2);
   this.y = (opts.y) ? opts.y : (height / 2);

   this.fontFamily = "MS Shell DLG, Arial, fantasy";
   this.fillStyle = (opts.fillStyle) ? opts.fillStyle : "#282828";
   switch(this.type){
     case "Title":
       this.fontSize = "32pt";
       break;
     case "MenuItem":
       this.fontSize = "22pt";
       break;
   }

   this.move = function () {
     // hover effect -- think Hotline Miami
     return;
   }

   this.render = function () {
     ctx.beginPath();
     ctx.font = this.fontSize + " " + this.fontFamily;
     ctx.fillStyle = this.fillStyle;
     ctx.fillText(this.text, this.x, this.y);
     ctx.closePath();
   }
 }

 function Player (opts) {
   this.which = (opts.player) ? opts.player : PlayerNumber.ONE
   this.x = (opts.x) ? opts.x : 0
   this.y = (opts.y) ? opts.y : 0
   this.input = function () {}

   this.armSprite = new Image()
   this.armSprite.src = 'assets/sprites/arm.png'
   this.armWidth = 200
   this.armLength = 300

   this.thumbSprite = new Image()
   this.thumbSprite.src = 'assets/sprites/thumb.png'
   this.thumbWidth = 50
   this.thumbLength = 100

   this.cookie = new Cookie({ x: this.x, y: this.y + this.armLength - 80 })

   this.render = function () {
     ctx.beginPath()
     ctx.drawImage(this.armSprite, this.x, this.y, this.armWidth, this.armLength)
     this.cookie.render()
     ctx.drawImage(this.thumbSprite, this.x + 2*this.thumbWidth, this.y + this.armLength - 90, this.thumbWidth, this.thumbLength)
     ctx.closePath()
   }
 }

 function Cookie (opts) {
   this.type = (opts.type) ? opts.type : "Chessmen"
   this.health = (opts.health) ? opts.health : 10
   this.sprite = new Image();
   this.sprite.src = 'assets/sprites/biscuit-queen.png';
   this.player = (opts.player) ? opts.player : Player.ONE;

   this.x = (opts.x) ? opts.x : 0
   this.y = (opts.y) ? opts.y : 0

   this.width = (opts.width) ? opts.width : 2
   this.height = (opts.height) ? opts.height : 3

   this.damage = function(damage) {
     health -= damage;
     if(health <= 0) {

     }
   }
   this.render = function () {
     ctx.beginPath()
     ctx.drawImage(this.sprite, this.x + 25, this.y, 100, 150)
     ctx.closePath()
   }
 }

 function TimerBar (opts) {
   this.x = (opts.x) ? opts.x : 0
   this.y = (opts.y) ? opts.y : 0
   this.width = 100
   this.height = 20
   this.color = '#78cd53'
   this.fillPercentage = 0

   this.logic = function () {

   }
 }

 function Sprite (opts) {
   this.x = (opts.x) ? opts.x : 0
   this.y = (opts.y) ? opts.y : 0
   this.width = (opts.width) ? opts.width : 100
   this.height = (opts.height) ? opts.height : 100

   this.img = new Image()
   this.img.src = opts.img

   this.render = function () {
     ctx.beginPath()
     ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
     ctx.closePath()
   }
   this.move = function () {}
 }
