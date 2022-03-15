const canvas = document.querySelector("canvas");

const webgl = canvas.getContext("webgl");

if (!webgl) {
  throw new Error("WebGL not available/supported");
}

webgl.clearColor(0, 0, 0, 0.25);

webgl.clear(webgl.COLOR_BUFFER_BIT);

const vertices = triangles;

const buffer = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);

const vertexShader = webgl.createShader(webgl.VERTEX_SHADER);
webgl.shaderSource(
  vertexShader,
  `attribute vec2 pos;
  attribute vec4 colours;
  varying vec4 vcolours;
  uniform float xshift1;
  uniform float yshift1;

    void main(){
        gl_Position = vec4(pos, 0, 2) + vec4(xshift1, yshift1, 0, 0);
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

webgl.bufferData(webgl.ARRAY_BUFFER, colours, webgl.STATIC_DRAW);

const coloursLocation = webgl.getAttribLocation(program, "colours");
webgl.enableVertexAttribArray(coloursLocation);
webgl.vertexAttribPointer(coloursLocation, 4, webgl.FLOAT, false, 0, 0);

webgl.useProgram(program);

const incr = 0.025;

let xs1 = -1.5;
let ys1 = 0;

draw()
