/* =====
 * TYPES
 * =====

   Types common to the whole game.

 */

 // # Enums
 var Scenes = {
   START: 0,
   DUNK: 1,
   // CONSUME: 2,
   SCORE: 2
 }
 var Direction = {
   LEFT: 0,
   TOP: 1,
   RIGHT: 2,
   DOWN: 3,
   NONE: 4
 }
 var PlayerNumber = {
   ONE: 0,
   TWO: 1
 }

 /* Based on insults generated by @MattHofstadt's Intellisult (http://intellisult.com) */
 var Insults = {
   MICROPHALLUS: 'You frightfully petty microphallus!',
   SLIME: 'You feeble-minded odious slime!',
   MISTAKE: 'What a decrepit, lamentable mistake thou art!',
   GREASE: 'To arms, you narcissistic, heart-sickening glob of grease!',
   DELINQUENT: 'You are an ineffably subliterate delinquent.',
   MOLESTER: 'You\'re nothing but a chromosome deficient molester of small furry animals!'
 }

 var Hindrances = {
   REVERSE: 0, JITTERS: 1
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
   this.initX = (opts.x) ? opts.x : 0
   this.initY = (opts.y) ? opts.y : 0
   this.cookieSpriteSrc = (opts.cookieSprite) ? opts.cookieSprite : 'assets/sprites/biscuit-bishop.png'
   this.x = this.initX
   this.y = this.initY

   this.cyclesUntilDirectionChange = 50
   this.cycles = 0
   this.direction = Direction.LEFT

   this.hasUsedReverse = false
   this.hasUsedJitters = false
   this.lastUsedInsultTimeStamp = -1
   this.insultCooldown = 3000

   this.isBeingReversed = false
   this.isBeingJittered = false

   this.armSprite = new Image()
   this.armSprite.src = 'assets/sprites/arm.png'
   this.armWidth = 200
   this.armLength = 300

   this.thumbSprite = new Image()
   this.thumbSprite.src = 'assets/sprites/thumb.png'
   this.thumbWidth = 50
   this.thumbLength = 100

   this.cookie = new Cookie({ player: this.which })
   this.cookieDamageTimer = 0
   this.cookieDamageTimeLimit = 500
   this.cookieSprite = new Image()
   this.cookieSprite.src = this.cookieSpriteSrc
   this.cookieWidth = 100
   this.cookieHeight = 150

   this.cupSprite = new Image()
   this.cupSprite.src ='assets/sprites/square-cup.png'
   this.cupWidth = 300
   this.cupHeight = 200

   this.teaSprite = new Image()
   this.teaSprite.src = 'assets/sprites/square-tea.png'
   this.teaWidth = this.cupWidth
   this.teaHeight = this.cupHeight

   this.reverseSprite = new Image()
   this.reverseSprite.src = 'assets/sprites/swirl.png'
   this.reverseWidth = 80
   this.reverseHeight = 50

   this.render = function () {
     ctx.beginPath()
     ctx.drawImage(this.cupSprite, this.initX - 50, this.initY + this.armLength - this.cupHeight / 2, this.cupWidth, this.cupHeight)
     ctx.drawImage(this.thumbSprite, this.x + 2*this.thumbWidth, this.y + this.armLength - 90, this.thumbWidth, this.thumbLength)
     ctx.drawImage(this.cookieSprite, this.x + 25, this.y + this.armLength - 80, this.cookieWidth, this.cookieHeight)

     if(this.cookie.hasBeenDamaged) {
       ctx.fillStyle = 'white'
       ctx.globalAlpha = 0.9
       ctx.fillRect(this.x + 25, this.y + this.armLength - 80, this.cookieWidth, this.cookieHeight)
       ctx.globalAlpha = 1

       var timeStamp = new Date()
       this.cookieDamageTimer += timeStamp.getTime() - this.cookie.damageTimeStamp.getTime()
       if(this.cookieDamageTimer >= this.cookieDamageTimeLimit) {
         this.cookie.hasBeenDamaged = false
         this.cookieDamageTimer = 0
       }
     }

     if(this.isBeingReversed) {
       ctx.fillStyle = 'green'
       ctx.globalAlpha = 0.5
       ctx.fillRect(this.x + 25, this.y + this.armLength - 80, this.cookieWidth, this.cookieHeight)
       ctx.drawImage(this.reverseSprite, this.x + 35, this.y + this.armLength - 40, this.reverseWidth, this.reverseHeight)
       ctx.globalAlpha = 1
     }
     if(this.isBeingJittered) {
       ctx.fillStyle = 'yellow'
       ctx.globalAlpha = 0.85
       ctx.fillRect(this.x + 25, this.y + this.armLength - 80, this.cookieWidth, this.cookieHeight)
       ctx.drawImage(this.reverseSprite, this.x + 35, this.y + this.armLength - 40, this.reverseWidth, this.reverseHeight)
       ctx.globalAlpha = 1
     }

     ctx.drawImage(this.armSprite, this.x, this.y, this.armWidth, this.armLength)
     ctx.globalAlpha = 0.5
     ctx.drawImage(this.teaSprite, this.initX - 50, this.initY + this.armLength - this.cupHeight / 2, this.teaWidth, this.teaHeight)
     ctx.globalAlpha = 1.0
     ctx.closePath()
   }

   this.move = function () {
     if(this.cycles++ >= this.cyclesUntilDirectionChange
     || this.isBeingJittered) {
       if(this.direction != Direction.NONE && Math.random() >= 0.5) {
         this.direction = Direction.NONE
       }
       if(this.direction == Direction.NONE) {
         this.direction = Math.floor(Math.random() * (4))
       }
       this.cycles = 0
     }

     switch(this.direction) {
       case Direction.LEFT:
         this.x -= 1
         break
       case Direction.UP:
         this.y -= 1
         break
       case Direction.RIGHT:
         this.x += 1
         break
       case Direction.DOWN:
         this.y += 1
         break
       default:
         break
     }

     if(this.x <= this.initX - 50) {
       this.x = this.initX - 50
       this.direction = Direction.RIGHT
       this.cookie.damage(1)
       if(this.cookie.health <= 7) {
         this.cookieSprite.src = 'assets/sprites/biscuit-bishop-damaged.png'
       }
     }
     else if(this.y <= this.initY - 25) {
       this.y = this.initY - 25
       this.cookie.damage(1) // consider other penalties
       this.direction = Direction.DOWN
     }
     else if(this.x >= this.initX + 50) {
       this.x = this.initX + 50
       this.direction = Direction.LEFT
       this.cookie.damage(1)
       if(this.cookie.health <= 7) {
         this.cookieSprite.src = 'assets/sprites/biscuit-bishop-damaged.png'
       }
     }
     else if(this.y >= this.initY + 10) {
       this.y = this.initY + 10
       this.direction = Direction.UP
       this.cookie.damage(1)
       if(this.cookie.health <= 7) {
         this.cookieSprite.src = 'assets/sprites/biscuit-bishop-damaged.png'
       }
     }
   }

   this.canInsult = function (hindrance) {

     return (
        (
           hindrance == Hindrances.REVERSE
        && !this.hasUsedReverse
        ) ||
        (
          hindrance == Hindrances.JITTERS
          && !this.hasUsedJitters
        )
      )
   }
 }

 function Cookie (opts) {
   this.type = (opts.type) ? opts.type : "Chessmen"
   this.health = (opts.health) ? opts.health : 10
   this.player = (opts.player) ? opts.player : Player.ONE

   this.width = (opts.width) ? opts.width : 2
   this.height = (opts.height) ? opts.height : 3

   this.hasBeenDamaged = false
   this.damageTimeStamp = new Date()

   this.damage = function(damage) {
     this.health -= damage
     if(this.health <= 0) {

     }
     this.hasBeenDamaged = true
     this.damageTimeStamp = new Date()
   }

 }

 function TimerBar (opts) {
   this.x = (opts.x) ? opts.x : 0
   this.y = (opts.y) ? opts.y : 0
   this.width = 300
   this.height = 30
   this.color = '#78cd53'
   this.timeToComplete = 10000 // in ms
   this.timer = 0
   this.previousTimeStamp = new Date()

   this.percentageComplete = 0

   this.render = function () {

     ctx.beginPath()
     ctx.fillStyle = '#282828'
     ctx.fillRect(vpwidth() / 2 - this.width / 2, vpheight() - 2*this.height, this.width, this.height)
     ctx.fillStyle = '#86cf85'
     ctx.fillRect(vpwidth() / 2 - this.width / 2, vpheight() - 2*this.height, (this.width * this.percentageComplete) / 100, this.height)
     ctx.closePath()

   }
   this.move = function () {
     var timeStamp = new Date()
     this.timer += timeStamp.getTime() - this.previousTimeStamp.getTime()
     this.previousTimeStamp = timeStamp

     if(this.timer > this.timeToComplete) {
       this.timer = this.timeToComplete
     }

     this.percentageComplete = 100 * this.timer / this.timeToComplete
   }
   this.reset = function () {
     this.timer = 0
     this.previousTimeStamp = new Date()
     this.percentageComplete = 0
   }
 }

 function Sprite (opts) {
   this.x = (opts.x) ? opts.x : 0
   this.y = (opts.y) ? opts.y : 0
   this.width = (opts.width) ? opts.width : 100
   this.height = (opts.height) ? opts.height : 100

   this.img = new Image()
   this.img.src = (opts.img) ? opts.img : 'assets/sprites/thumb.png'

   this.render = function () {
     ctx.beginPath()
     ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
     ctx.closePath()
   }
   this.move = function () {}
 }

 // An insult or a penalty
 function Hindrance (opts) {
   // The player affected by it (NOT necessarily the player who caused it)
   this.player = (opts.player) ? opts.player : PlayerNumber.ONE
   this.type = (opts.type) ? opts.type : Hindrances.REVERSE
   this.timer = 0
   this.previousTimeStamp = -1
   this.alive = true

   timeToExpire = 3000

   if(opts.text) {
     this.text = opts.text
   } else {
     var whichText = Math.floor(Math.random() * (6)) // 2: number of insults in Insults
     switch(whichText) {
       case 0:
        this.text = Insults.MICROPHALLUS
        break
       case 1:
        this.text = Insults.SLIME
        break
       case 2:
        this.text = Insults.MISTAKE
        break
       case 3:
        this.text = Insults.GREASE
        break
       case 4:
        this.text = Insults.DELINQUENT
        break
       case 5:
        this.text = Insults.MOLESTER
        break
       default:
        this.text = Insults.SLIME
        break
     }
   }

   this.render = function () {
     var x = 0
     if(this.player == PlayerNumber.ONE)
       x = (3 * vpwidth() / 5)
     else
       x = (vpwidth() / 5)

     ctx.beginPath()
     ctx.font = '14pt Cascada'
     ctx.fillStyle = 'black'
     ctx.fillText(this.text, x, vpheight() / 8)
     ctx.closePath()
   }
   this.move = function () {
     if(this.previousTimeStamp !== -1)
       this.timer += new Date().getTime() - this.previousTimeStamp.getTime()

     if(this.timer >= timeToExpire) this.alive = false
     this.previousTimeStamp = new Date()
   }
 }
