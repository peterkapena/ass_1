let bDecr = false;

function draw() {
  if (bDecr) xs1 -= incr;
  else xs1 += incr;

  webgl.clear(webgl.COLOR_BUFFER_BIT);
  webgl.uniform1f(webgl.getUniformLocation(program, "xshift1"), xs1);
  webgl.uniform1f(webgl.getUniformLocation(program, "yshift1"), ys1);
  webgl.drawArrays(webgl.TRIANGLES, 0, vertices.length / 2);

  //if we reach the right side, we decrement
  if (xs1 > 1.5) bDecr = true;
  //if we reach the left side we icrement
  if (xs1 < -1.5) bDecr = false;

  window.requestAnimationFrame(draw);
}

function getTriangle(n) {
  return [
    0.0,
    0.0,
    r * Math.cos(((n - 1) * Math.PI) / 4),
    r * Math.sin(((n - 1) * Math.PI) / 4),
    r * Math.cos((n * Math.PI) / 4),
    r * Math.sin((n * Math.PI) / 4),
  ];
}

const red = [1.0, 0.0, 0.0, 1.0];
const blue = [0.0, 0.0, 1.0, 1.0];
const green = [0.0, 1.0, 0.0, 1.0];
const white = [1.0, 1.0, 1.0, 1.0];
const black = [0.0, 0.0, 0.0, 1.0];
const yellow = [1.0, 1.0, 0.0, 1.0];
const orange = [1.0, 0.5, 0.0, 1.0];
const magenta = [1.0, 0.0, 1.0, 1.0];
const violet = [0.386, 0.119, 0.44, 1.0];
const cyan = [0, 1.0, 1.0, 1.0];

const r = 0.5;

const triangles = new Float32Array([
  0.0,
  0.0,
  r,
  0.0,
  r * Math.cos(Math.PI / 4),
  r * Math.sin(Math.PI / 4),

  ...getTriangle(2),
  ...getTriangle(3),
  ...getTriangle(4),
  ...getTriangle(5),
  ...getTriangle(6),
  ...getTriangle(7),
  ...getTriangle(8),
]);

const colours = new Float32Array([
  //first triangle
  ...yellow,
  ...yellow,
  ...yellow,

  //second triangle
  ...orange,
  ...orange,
  ...orange,

  //third triangle
  ...red,
  ...red,
  ...red,

  //2nd triangle
  ...magenta,
  ...magenta,
  ...magenta,

  //3rd triangle
  ...violet,
  ...violet,
  ...violet,

  //4th triangle
  ...blue,
  ...blue,
  ...blue,

  //5th triangle
  ...cyan,
  ...cyan,
  ...cyan,

  //6th triangle
  ...green,
  ...green,
  ...green,
]);
