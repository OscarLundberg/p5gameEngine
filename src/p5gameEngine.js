/** @test {MyClass} */
//describe('MyClass is super useful class.', ()=>{

  /** @test {MyClass#sayMyName} */
//  it('say my name', ()=>{
//    let foo = new MyClass('Alice');
//    assert.equal(foo.sayMyName(), 'My name is Alice');
//  })
//});


/**
 * Transform
 */
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
	/**
	 * sub
	 */
	static sub = function(a, b)
	{
		return new Transform(
			a.x - b.x,
			a.y - b.y,
			a.w,
			a.h,
			a.rotationX - b.rotationX,
			a.rotationY - b.rotationY
		);
	}
	/**
	 * add
	 */
	static add = function(a, b)
	{
		return new Transform(
			a.x + b.x,
			a.y + b.y,
			a.w,
			a.h,
			a.rotationX + b.rotationX,
			a.rotationY + b.rotationY
		);
	}
	/**
	 * mult
	 */
	static mult = function(a, b)
	{
		return new Transform(
			a.x * b.x,
			a.y * b.y,
			a.w,
			a.h,
			a.rotationX * b.rotationX,
			a.rotationY * b.rotationY
		);
	}

	/**
	 * div
	 */
	static div = function(a, b)
	{
		return new Transform(
			a.x / b.x,
			a.y / b.y,
			a.w,
			a.h,
			a.rotationX / b.rotationX,
			a.rotationY / b.rotationY
		);
	}

	/**
	 * scl
	 */
	static scl = function(a, b)
	{
		return new Transform(
			a.x * b,
			a.y * b,
			a.w * b,
			a.h * b,
			a.rotationX,
			a.rotationY
		);
	}

	/**
	 * zero
	 */
	static zero = function()
	{
		return new Transform(0, 0, 0, 0, 0, 0);
	}

}

/**
 * GameObject
 */
class GameObject
{
	constructor(transform, physics, sprite, tag)
	{
		this.transform = transform;
		this.sprite;
		this.tag = tag;

		this.render = function()
		{
			var pos = worldToScreenPoint(this.transform);
			if (this.sprite)
			{
				image(this.sprite, pos.x, pos.y, w, h);
			}
			else
			{

				rect(pos.x, pos.y, transform.w, transform.h);
			}

		}
	}
}


/**
 * Actor
 */
class Actor extends GameObject
{
	constructor()
	{

		this.move = function() {

		}

		this.animate = function() {

		}

	}

}


/**
 * Player
 */
class Player extends Actor
{
	constructor()
	{}
}


/**
 * Camera
 */
class Camera extends GameObject
{

}


/**
 * Scene
 */
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



/**
 * Find
 */
function find(tag)
{
	return currentScene.gameObjects[tag] || null;
}

let currentScene;
// let update;


/**
 * Game
 */
function game()
{
	background(120);
	currentScene = new Scene();
	gameDraw = function()
	{
		if (currentScene.gameObjects.length > 0)
		{
			for (g of currentScene.gameObjects)
			{
				g.render();
			}
		}
	}
	// earlyUpdate = function() {};
	// update = function() {};
	// lateUpdate = function() {};
}


/**
 * Draw
 */
function draw()
{

	update();
	gameDraw();
	// earlyUpdate();


	// lateUpdate();
}



/**
 * GameObject
 */
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
	if (cameraMode == CENTER)
	{
		currentScene.camera.transform.x += x;
		currentScene.camera.transform.y += y;
	}
	else if (cameraMode == TOPLEFT)
	{
		currentScene.camera.x = x;
		currentScene.camera.y = y;
	}
	else if (cameraMode == STATIC)
	{
		return;
	}
}


class Physics
{
	constructor()
	{}
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
