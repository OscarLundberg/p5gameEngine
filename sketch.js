
function setup()
{
  createCanvas(600, 600);
  game();
  gameObject(0, 0);
}

function update()
{
  background(120 + frameCount%127);
  moveCamera(-0.1, 0);
}
