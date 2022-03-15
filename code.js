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
