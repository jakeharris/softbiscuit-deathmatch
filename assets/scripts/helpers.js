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

function cloneArray(arr) {
  var tmp = []
  for(var a in arr) {
    tmp[a] = new Object(arr[a])
  }
  return tmp
}
