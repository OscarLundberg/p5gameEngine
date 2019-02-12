class Transform
{
  constructor(x, y, w, h, xr, yr)
  {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.rotationX = xr;
    this.rotationY = yr;
  }

  static sub = function(a, b)
  {
    return new Transform(
      a.x - b.x,                  //X
      a.y - b.y,                  //Y
      a.w,                        //W
      a.h,                        //H
      a.rotationX - b.rotationX,  //RotX
      a.rotationY - b.rotationY   //RotY
    );
  }

  static add = function(a, b)
  {
    return new Transform(
      a.x + b.x,                  //X
      a.y + b.y,                  //Y
      a.w,                        //W
      a.h,                        //H
      a.rotationX + b.rotationX,  //RotX
      a.rotationY + b.rotationY   //RotY
    );
  }

  static mult = function(a, b)
  {
    return new Transform(
      a.x * b.x,                  //X
      a.y * b.y,                  //Y
      a.w,                        //W
      a.h,                        //H
      a.rotationX * b.rotationX,  //RotX
      a.rotationY * b.rotationY   //RotY
    );
  }

  static div = function(a, b)
  {
    return new Transform(
      a.x / b.x,                  //X
      a.y / b.y,                  //Y
      a.w,                        //W
      a.h,                        //H
      a.rotationX / b.rotationX,  //RotX
      a.rotationY / b.rotationY   //RotY
    );
  }

  static scl = function(a, b)
  {
    return new Transform(
      a.x * b,      //X
      a.y * b,      //Y
      a.w * b,      //W
      a.h * b,      //H
      a.rotationX,  //RotX
      a.rotationY   //RotY
    );
  }

  static zero = function()
  {
    return new Transform(0, 0, 0, 0, 0, 0);
  }

}

class GameObject
{
  constructor(transform, physics, sprite, tag)
  {
      this.transform = transform;
      this.sprite;
      this.tag = tag;

      this.render = function() {
        var pos = worldToScreenPoint(this.transform);
        if(this.sprite)
        {
          image(this.sprite, pos.x, pos.y, w, h);
        }else
        {

          rect(pos.x, pos.y, transform.w, transform.h);
        }

      }
  }
}

class Actor extends GameObject
{
  constructor()
  {

      this.move = function()
      {

      }

      this.animate = function()
      {

      }

  }

}

class Player extends Actor
{
  constructor(){}
}

class Camera extends GameObject
{

}

class Scene
{

  constructor()
  {
    this.gameObjects = [];
    this.camera = new Camera(Transform.zero());
    this.addObject = function(obj, name)
    {
      this.gameObjects.push(obj);
    }
  }


//Body
}


function find(tag)
{
  return currentScene.gameObjects[tag] || null;
}

let currentScene;
// let update;

function game()
{
  background(120);
  currentScene = new Scene();
  gameDraw = function()
  {
    if(currentScene.gameObjects.length > 0)
    {
      for(g of currentScene.gameObjects)
      {
        g.render();
      }
    }
  }
  // earlyUpdate = function() {};
  // update = function() {};
  // lateUpdate = function() {};
}

function draw()
{

  update();
  gameDraw();
  // earlyUpdate();


  // lateUpdate();
}


function gameObject(x, y, w = 10, h = 10, tag = "gameObject" + currentScene.gameObjects.length, physics = kinematic(), sprite = undefined)
{
  var tr = new Transform(x, y, w, h, 0, 0);
  console.log(tr);
  currentScene.addObject(new GameObject(tr, physics, sprite, tag));
}

function actor()
{

}


function player(x, y, physics = rigidbody(), sprite = undefined, controlScheme = wasd())
{

}

function moveCamera(x, y, cameraMode = CENTER)
{
  if(cameraMode == CENTER)
  {
    currentScene.camera.transform.x += x;
    currentScene.camera.transform.y += y;
  }else if(cameraMode == TOPLEFT)
  {
    currentScene.camera.x = x;
    currentScene.camera.y = y;
  }else if(cameraMode == STATIC)
  {
    return;
  }
}


class Physics
{
  constructor(){}
//Body
}
class ControlScheme
{

}

function wasd(directionalOnly, horizontalOnly, verticalOnly)
{

}

function arrows(directionalOnly, horizontalOnly, verticalOnly)
{

}

///<summary>Returns physics object that ignores all external forces.</summary>
function kinematic()
{

}


///<summary>Returns a default physics object that acts upon all forces.</summary>
function rigidbody()
{

}

///<summary>Returns a physics object that will never move.</summary>
function static()
{


}



function worldToScreenPoint(transform, camera = currentScene.camera)
{
  return Transform.sub(transform, camera.transform);

}
