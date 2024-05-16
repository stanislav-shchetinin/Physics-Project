"use strict";

/* As I am beginning this pen, my idea is to imitate
Electric Field Lines (https://codepen.io/EpicCoder_2002/pen/KERjgm)
by Ahmed Eltaher (https://codepen.io/EpicCoder_2002)
*/

window.addEventListener("load", function () {

  const AVG_SURFACE = 10000; // pixels²
  const RADIUS = 2;
  const COLOR_POS = '#ff0000';
  const PART_MIN = 10; // min number of particles starting from each positive source
  const PART_MAX = 50; // max number of particles starting from each positive source
  const SPEED_ANIM = 1;
  const SPEED_PART = 1;

  let canv, ctx;    // canvas and context

  let maxx, maxy;   // canvas dimensions

  let nbPos;
  let arrPos;
  let particles;
  let nbPart;

// for animation
  let tStampRef;   // time stamp ref for animation
  let events;

// shortcuts for Math.
  const mrandom = Math.random;
  const mfloor = Math.floor;
  const mround = Math.round;
  const mceil = Math.ceil;
  const mabs = Math.abs;
  const mmin = Math.min;
  const mmax = Math.max;

  const mPI = Math.PI;
  const mPIS2 = Math.PI / 2;
  const mPIS3 = Math.PI / 3;
  const m2PI = Math.PI * 2;
  const m2PIS3 = Math.PI * 2 / 3;
  const msin = Math.sin;
  const mcos = Math.cos;
  const matan2 = Math.atan2;

  const mhypot = Math.hypot;
  const msqrt = Math.sqrt;

  const rac3 = msqrt(3);
  const rac3s2 = rac3 / 2;

//------------------------------------------------------------------------

  function alea(mini, maxi) {
// random number in given range

    if (typeof (maxi) == 'undefined') return mini * mrandom(); // range 0..mini

    return mini + mrandom() * (maxi - mini); // range mini..maxi
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  function intAlea(mini, maxi) {
// random integer in given range (mini..maxi - 1 or 0..mini - 1)
//
    if (typeof (maxi) == 'undefined') return mfloor(mini * mrandom()); // range 0..mini - 1
    return mini + mfloor(mrandom() * (maxi - mini)); // range mini .. maxi - 1
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  function removeElement(array, element) {
    let idx = array.indexOf(element);
    if (idx == -1) throw ('Bug ! indexOf -1 in removeElement');
    array.splice(idx, 1);
  } // removeElement

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  let animate;

  { // scope for animate
    let animState = 0;
    let currCell;

    animate = function (tStamp) {

      let event;
      let grp, neighs, found, tinit;

      event = events.pop();
      if (event && event.event == 'reset') animState = 0;
      if (event && event.event == 'click') animState = 0;
      window.requestAnimationFrame(animate)

      tinit = performance.now();
      do {

        switch (animState) {

          case 0 :
            if (startOver()) {
              ++animState;
            }
            break;

          case 1 :
            if (particles.length == 0) {
              ++animState;
              break;
            }
            particles.forEach(part => part.move());
            break;

          case 2:

            break;

        } // switch
      } while ((animState == 1) && (performance.now() - tinit < SPEED_ANIM));

    } // animate
  } // scope for animate

//------------------------------------------------------------------------

  function Particle(x, y) {
    this.x = x;
    this.y = y;
  }

  Particle.prototype.move = function (x, y) {

    let x0, y0, dx, dy, dist, fx, fy;
    let finished = false;

    x0 = this.x;
    y0 = this.y;

    fx = 0;
    fy = 0;

// positive charges
    for (let k = 0; k < nbPos; ++k) {
      dx = x0 - arrPos[k][0];
      dy = y0 - arrPos[k][1];
      dist = dx * dx + dy * dy;
      fx += dx / dist / msqrt(dist);
      fy += dy / dist / msqrt(dist);
    }

    dist = mhypot(fx, fy);
    this.x += SPEED_PART * fx / dist;
    this.y += SPEED_PART * fy / dist;

    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1;
    ctx.stroke();
    if (finished) removeElement(particles, this);


    //создание начерченногно круга d.emelin
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1;
    ctx.stroke();
    if (finished) removeElement(particles, this);

    let Ro = document.getElementById("Ro").value;
    let outRad = parseInt(document.getElementById("OuterRadius").value);


    var centerX = canv.width / 2,
        centerY = canv.height / 2,
        radius = 30+outRad*10,
        width = 5,
        angles = []
    var angle;

    var stupid_count = 20 + Ro / 10

    for (var new_radius = radius; new_radius < 500; new_radius += 100) {
      setTimeout(function(){
      }, 3000);
      stupid_count -= 10

      for (var i = 0; i < 360; i += 10) {
        //is the "angle" increasing on every iteration? can you demostrate this please
        angle = 2.1 + (i * Math.PI / 180);
        angles.push(angle)
        ctx.beginPath();
        ctx.moveTo(
            centerX + Math.sin(angle) * new_radius,
            centerY + Math.cos(angle) * new_radius
        );
        ctx.lineTo(
            centerX + Math.sin(angle) * (new_radius + width+stupid_count),
            centerY + Math.cos(angle) * (new_radius + width)
        );
        ctx.strokeStyle = "WHITE"
        ctx.closePath();
        ctx.stroke();
      }
    }

    //LEONID CREATE STICK
//------------------------------------------------------------------------
   function createLine(){
     // create lines
     for (let i = 0; i < nbPos; i++) {
       let source = arrPos[i];
       ctx.beginPath();
       ctx.moveTo(source[0], source[1]);
       for (let j = 0; j < nbPos; j++) {
         if (i !== j) {
          ctx.lineTo(arrPos[j][0], arrPos[j][1]);
         }
       }
       ctx.strokeStyle = 'white';
       ctx.lineWidth = 8;
       ctx.stroke();
     }
  }
    createLine()
  }


//------------------------------------------------------------------------

  function createField() {

    const minDist = msqrt(AVG_SURFACE) / 4;

    let x, y;
    let offsAng, nbPart, part;
    let color;

    nbPos = document.getElementById("OuterRadius").value; // количество точек
    nbPart = document.getElementById("Ro").value; // интенсивность линий
    arrPos = [];
    if (nbPos % 2 == 0) {
      let dif = (parseInt(nbPos) / 2) * 30 - 15;
      for (let k = 0; k < nbPos; ++k) {
        arrPos[k] = [maxx / 2, canv.height / 2 + k * 30 - dif];
      } // for k
    } else {
      let dif = ((parseInt(nbPos)-1) / 2) * 30;
      for (let k = 0; k < nbPos; ++k) {
        arrPos[k] = [maxx / 2, canv.height / 2 + k * 30 - dif];
      } // for k
    }

    nbPos = arrPos.length;

// create particles

    particles = [];
    arrPos.forEach(source => {
      offsAng = alea(m2PI);

      color = `hsl(${intAlea(360)},100%,50%)`;
      for (let k = 0; k < nbPart; ++k) {
        part = new Particle(source[0], source[1]);
        particles.push(part);
        part.dir = offsAng + k * m2PI / nbPart;
        part.x += RADIUS * mcos(part.dir);
        part.y += RADIUS * msin(part.dir);
        part.color = color;
      }
    }); // arrPos.forEach

  } // createField

//------------------------------------------------------------------------

  function startOver() {

// canvas dimensions

    maxx = window.innerWidth;
    maxy = window.innerHeight;

    canv.width = maxx;
    canv.height = maxy;
    ctx.lineJoin = 'bevel';
    ctx.lineCap = 'round';

    ctx.clearRect(0, 0, maxx, maxy);

    createField();

    return true;

  } // startOver

//------------------------------------------------------------------------

  function mouseClick(event) {

    events.push({event: 'click'});

  } // mouseMove

//------------------------------------------------------------------------
//------------------------------------------------------------------------
// beginning of execution

  {
    canv = document.createElement('canvas');
    canv.style.position = "absolute";
    document.body.appendChild(canv);
    ctx = canv.getContext('2d');
    canv.setAttribute('title', 'click me');
  } // création CANVAS
  canv.addEventListener('click', mouseClick); // just for initial position
  events = [{event: 'reset'}];
  requestAnimationFrame(animate);

}); // window load listener

