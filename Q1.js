const canvas = document.querySelector("canvas");

const webgl = canvas.getContext("webgl");

if (!webgl) {
  throw new Error("WebGL not available/supported");
}

webgl.clearColor(0, 0, 0, 1);

webgl.clear(webgl.COLOR_BUFFER_BIT);

const multiplySign = [
  /***The first line of the cross */

  //first triangle
  -0.5, -0.5, -0.375, -0.25, -0.25, -0.375,

  //second triangle
  0.5, 0.5, 0.25, 0.375, 0.375, 0.25,

  //third triangle
  -0.25, -0.375, 0.25, 0.375, -0.375, -0.25,

  //fourth triangle
  -0.25, -0.375, 0.25, 0.375, 0.375, 0.25,

  /***The second line of the cross */

  //first triangle
  -0.5, 0.5, -0.375, 0.25, -0.25, 0.375,

  //second triangle
  0.5, -0.5, 0.25, -0.375, 0.375, -0.25,

  //third triangle
  -0.25, 0.375, 0.375, -0.25, -0.375, 0.25,

  //fourth triangle
  0.25, -0.375, -0.375, 0.25, 0.375, -0.25,
];

const addSign = [
  /***The first line of the cross */

  //first triangle
  0, 0.5, -0.125, 0.375, 0.125, 0.375,

  //second triangle
  0, -0.125, -0.125, -0.375, 0.125, -0.375,

  //   //third triangle
  -0.125, -0.375, 0.125, -0.375, 0.125, 0.375,

  //   //fourth triangle
  -0.125, -0.375, 0.125, 0.375, -0.125, 0.375,
];

const vertices = new Float32Array([...multiplySign, ...addSign]);

const buffer = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);

const vertexShader = webgl.createShader(webgl.VERTEX_SHADER);
webgl.shaderSource(
  vertexShader,
  `attribute vec2 pos;
    void main(){
        gl_Position = vec4(pos, 0, 1);
    }
`
);
webgl.compileShader(vertexShader);

const fragmentShader = webgl.createShader(webgl.FRAGMENT_SHADER);
webgl.shaderSource(
  fragmentShader,
  `void main(){
      gl_FragColor = vec4(1.0, 0, 0, 1.0);
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
webgl.useProgram(program);
webgl.drawArrays(webgl.TRIANGLES, 0, vertices.length / 2);
