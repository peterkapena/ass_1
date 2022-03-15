const canvas = document.querySelector(`canvas`);
const gl = canvas.getContext(`webgl`);

if (!gl) {
  throw new Error("gl not supported");
}
gl.clearColor(0, 0.5, 0.5, 0.5);
gl.clear(gl.COLOR_BUFFER_BIT);

let octagon_one = triangles;

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

let octagon_two = triangles.slice(0, triangles.length - 1);

const buffer_two = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer_two);

const colourBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colourBuffer);

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(
  vertexShader,
  `attribute vec2 pos;
    uniform mat4 translation;
    attribute vec4 colours;
    varying vec4 vcolours;
    void main()
    {
        gl_Position = translation * vec4(pos,0,3);
        vcolours = colours;
    }`
);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(
  fragmentShader,
  `precision mediump float;
    varying vec4 vcolours;

  void main(){
      gl_FragColor = vcolours;
  }`
);
gl.compileShader(fragmentShader);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

const positionLocation = gl.getAttribLocation(program, `pos`);
const translationLocation = gl.getUniformLocation(program, `translation`);
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

const coloursLocation = gl.getAttribLocation(program, "colours");
gl.enableVertexAttribArray(coloursLocation);
gl.vertexAttribPointer(coloursLocation, 4, gl.FLOAT, false, 0, 0);

let xs = -0.4;
let ys = 0.0;

let xs_ = 0.5;
let ys_ = 0.0;
const incr = 0.025;

draw();
function draw() {
  if (bDecr) xs -= incr;
  else xs += incr;

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.bufferData(gl.ARRAY_BUFFER, colours, gl.STATIC_DRAW);
  gl.uniformMatrix4fv(translationLocation, false, translate(xs, ys, 0));
  gl.bufferData(gl.ARRAY_BUFFER, octagon_one, gl.STATIC_DRAW);
  gl.drawArrays(gl.TRIANGLES, 0, octagon_one.length / 2);

  gl.uniformMatrix4fv(translationLocation, false, translate(xs_, ys_, 0));
  gl.bufferData(gl.ARRAY_BUFFER, octagon_two, gl.STATIC_DRAW);
  gl.drawArrays(gl.TRIANGLES, 0, octagon_two.length / 2);

  //if we reach the right side, we decrement
  if (xs > 0.879) bDecr = true;
  //if we reach the left side we icrement
  if (xs < -0.879) bDecr = false;
  if (bAnimate) window.requestAnimationFrame(draw);
  checkCollision();
}

function checkCollision() {
  if (
    ys <= ys_ + 0.325 &&
    xs <= xs_ + 0.325 &&
    (xs - xs_ === 0.325 || xs - xs_ === -0.325)
  )
    bAnimate = false;
}

//function to rotate on the x axis

function translate(tx, ty, tz) {
  return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1]);
}

document.onkeydown = (event) => {
  let redraw = true;
  switch (event.key) {
    case "ArrowDown":
      if (ys_ > -0.879) ys_ -= incr;
      break;

    case "ArrowUp":
      if (ys_ < 0.879) ys_ += incr;
      break;

    case "ArrowLeft":
      //if we reach the left side
      if (xs_ > -0.879) xs_ -= incr;
      break;

    case "ArrowRight":
      //if we reach the right side
      if (xs_ < 0.879) xs_ += incr;
      break;
    default:
      redraw = false;
      break;
  }
};
