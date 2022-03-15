const canvas = document.querySelector("canvas");
 
const webgl = canvas.getContext("webgl");

if (!webgl) {
  throw new Error("WebGL not available/supported");
}

webgl.clearColor(0, 0, 0, 0.25);

webgl.clear(webgl.COLOR_BUFFER_BIT);

const r = 0.5;

const triangles = [
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
];

const vertices = new Float32Array(triangles);

const buffer = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);

const vertexShader = webgl.createShader(webgl.VERTEX_SHADER);
webgl.shaderSource(
  vertexShader,
  `attribute vec2 pos;
  attribute vec4 colours;
  varying vec4 vcolours;
  uniform float xshift;
  uniform float yshift;

    void main(){
        gl_Position = vec4(pos, 0, 3) + vec4(xshift, yshift, 0, 0);
        vcolours = colours;
    }
`
);
webgl.compileShader(vertexShader);

const fragmentShader = webgl.createShader(webgl.FRAGMENT_SHADER);
webgl.shaderSource(
  fragmentShader,
  `precision mediump float;
  varying vec4 vcolours;

  void main(){
      gl_FragColor = vcolours;
  }
`
);
webgl.compileShader(fragmentShader);

const program = webgl.createProgram();
webgl.attachShader(program, vertexShader);
webgl.attachShader(program, fragmentShader);
webgl.linkProgram(program);

const positionLocation = webgl.getAttribLocation(program, "pos");
webgl.enableVertexAttribArray(positionLocation);
webgl.vertexAttribPointer(positionLocation, 2, webgl.FLOAT, false, 0, 0);

const colourBuffer = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, colourBuffer);
const twoColours = [
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
];

webgl.bufferData(
  webgl.ARRAY_BUFFER,
  new Float32Array(twoColours),
  webgl.STATIC_DRAW
);

const coloursLocation = webgl.getAttribLocation(program, "colours");
webgl.enableVertexAttribArray(coloursLocation);
webgl.vertexAttribPointer(coloursLocation, 4, webgl.FLOAT, false, 0, 0);

webgl.useProgram(program);
webgl.drawArrays(webgl.TRIANGLES, 0, vertices.length / 2);
