const $app = document.getElementById("app");
const $canvas = document.createElement("canvas");
const context = $canvas.getContext("2d");
$app.append($canvas);

context.beginPath();
context.rect(0, 0, 100, 100);
context.fill();
