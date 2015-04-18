/* =======
 * HELPERS
 * =======

   Thanks to JCOC611 on stackoverflow for the robust dimension detection!
   Thanks to Grumdrig on stackoverflow for the roundRect idea!

 */


var vpwidth = function () {
   return window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth||0
}
var vpheight = function () {
   return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||0
}

var setGameDimensions = function(w, h) {

   if(w >= 1920) w = 1920
   else if(w >= 1600) w = 1600
   else if(w >= 1366) w = 1366
   else if(w >= 1024) w = 1024
   else if(w >= 800)  w = 800
   else if(w >= 640)  w = 640
   else w = 320


   if(h >= 1080) h = 1080
   else if(h >= 900)  h = 900
   else if(h >= 768)  h = 768
   else if(h >= 640)  h = 640
   else if(h >= 600)  h = 600
   else if(h >= 480)  h = 480
   else h = 320

   return {
     width: w,
     height: h
   }

}


/* ====
 * GAME
 * ====
 */


var width = vpwidth(),
    height = vpheight(),
    canvas = document.getElementById('sbdm'),
    ctx = canvas.getContext('2d'),
    scenes = [],
    currentScene = 0, // make this an enum
    game,
    inputs = [],
    paused = false

ctx.font = "22pt Cascada"

var clear = function () {
        var dim = setGameDimensions(vpwidth(), vpheight())

        if(canvas.width != vpwidth() || canvas.height != vpheight()) {
          canvas.width = vpwidth()
          canvas.height = vpheight()
        }

        ctx.fillstyle = '#282828'
        ctx.textAlign = 'center'
        ctx.beginPath()
        ctx.rect(0, 0, vpwidth(), vpheight())
        ctx.closePath()
        ctx.fill()
    };

var render = function () {
        if(!scenes || !scenes[0]) scenes = [ new StartScene({ }) ]
        if(!scenes[cur]) {
          console.log("Current scene variable cur has exceeded legal bounds. (val: " + cur + ").")
          //return false;
        }
        scenes[cur].render()
    };

var logic = function () {
        if(!scenes || !scenes[0]) scenes = [ new StartScene({ }) ]
        if(!scenes[cur]) {
          console.log("Current scene variable cur has exceeded legal bounds. (val: " + cur + ").")
        }
        scenes[cur].logic()
    };

var loop = function () {
        clear()
        render()
        logic()

        game = setTimeout(loop, 10)
    };

var renderPause = function () {
        var dim = setGameDimensions(vpwidth(), vpheight())
        width = dim.width
        height = dim.height

        if(canvas.width != vpwidth() || canvas.height != vpheight()) {
          canvas.width = vpwidth()
          canvas.height = vpheight()
        }

        ctx.fillstyle = '#282828'
        ctx.beginPath()
        ctx.rect(0, 0, vpwidth(), vpheight())
        ctx.closePath()
        ctx.fill()

        ctx.fillStyle = "rgba(0, 0, 0, .5)"
        ctx.beginPath()
        ctx.rect(0, 0, width, height)
        ctx.closePath()
        ctx.fill()

        ctx.fillStyle = "#fff"
        ctx.beginPath()
        ctx.fillText('Press P or ESC to continue playing.', width*3/8, height/2) //FIXME
        ctx.fillText('Press Q to quit.', width*3/8, height/2 + 64)
        ctx.closePath()
}

var pause = function () {
        renderPause()
        if(!paused) {
          clearTimeout(game)
          paused = true
        } else {
          game = setTimeout(loop, 10)
          paused = false
        }
}

loop()
