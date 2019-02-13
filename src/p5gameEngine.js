/**
 * Transform
 * @param{float} x X coordinate in world space
 * @param{float} y Y coordinate in world space
 * @param{float} w Width in pixels
 * @param{float} h Height in pixels
 * @param{float} rotationX X-Rotation in degrees
 * @param{float} rotationY Y-Rotation in degrees
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
   * @returns Transform a - Transform b
	 * @param{Transform} a
	 * @param{Transform} b
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
   * @returns Transform a + Transform b
	 * @param{Transform} a
	 * @param{Transform} b
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
	 * @returns Transform a multiplied by Transform b
	 * @param{Transform} a
	 * @param{Transform} b
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
	 * @returns Transform a divided by Transform b
	 * @param{Transform} a
	 * @param{Transform} b
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
	 * @returns Transform a scaled by float b
	 * @param{Transform} a
	 * @param{float} b
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
	 * @returns Zero-initialized Transform
	 */
	static zero = function()
	{
		return new Transform(0, 0, 0, 0, 0, 0);
	}

}

/**
 * GameObject. Base class for all objects. Useful for inanimate objects.
 * @param{Transform} transform
 * @param{Physics} physics The GameObjects physics configuration
 * @param{string} sprite The gameobjects sprite filename. (Note: All sprites must be added to the /Sprites folder)
 * @param{string} tag
 */
class GameObject
{
	constructor(transform, physics, sprite, tag)
	{
		this.transform = transform;
		this.sprite;
		this.tag = tag;

		/**
		 *	Renders the GameObject to the screen. Called every frame.
		 */
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
 * GameObject with built-in functions for movement and animation.
 * <br>Useful for non-player characters & animated objects.
 */
class Actor extends GameObject
{
	constructor()
	{

		/**
		 * Move the actor.
		 * @param {float} x X value
		 * @param {float} y X value
		 * @param {float} s Speed
		 */
		this.move = function(x, y, s) {

		}

		/**
		 * Advance the actor animation by n frames
		 * @param {int} n Frame count
		 */
		this.animate = function(n = 1) {

		}

	}

}


/**
 * Player with built-in functions for user controlled movement and animation.
 * Used only for characters controlled by human. For AI/CPU characters, see Actor
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

/**
 * Move the camera by X, Y
 * @param {X} X-coordinate
 * @param {Y} Y-coordinate
 */
function moveCamera(x, y) //, cameraMode = CENTER)
{
	// if (cameraMode == CENTER)
	// {
		currentScene.camera.transform.x += x;
		currentScene.camera.transform.y += y;
	// }
	// else if (cameraMode == TOPLEFT)
	// {
	// 	currentScene.camera.x = x;
	// 	currentScene.camera.y = y;
	// }
	// else if (cameraMode == STATIC)
	// {
	// 	return;
	// }
}


/**
 * Physics configuration of GameObjects
 */
class Physics
{

	constructor(mass, gravityScale)
	{
		this.mass = mass;
		this.gravityScale = gravityScale;

		/**
		 * Force applied to the body in the current physics step.
		 */
		this.force = { x:0, y:0 };

		/**
		 * Apply force to a physics object
		 * @param {float} x
		 * @param {float} y
		 * @param {float} m
		 */
		this.applyForce = function(x, y, m)
		{

		}

		/**
		 * Advance the physics object to the next physics step (Called automatically every step)
		 */
		this.step = function ()
		{


		}
	}
	/**
	 * Global gravity force. (Applied to every rigidbody)
	 * <br>Default is 9.87
   */
	 static gravity = 9.87;

	/**
	 * @returns physics object that ignores all external forces
	 * Note: Kinematic objects are affected by internal forces
	 * @example {
	 * 	myGameObject.physics = Physics.kinematic() // Set myGameObject as kinematic
	 * 	myGameObject.physics.applyForce(1, 0, 10) // Object is affected
	 * }
	 */
	static kinematic = function()
	{

	}


	/**
	 * @returns physics object that is affected by external forces
	 */
	static rigidbody = function()
	{

	}

	/**
	 * @returns a static physics object that is not affected by forces.
	 */
	static statObj = function()
	{


	}

}


/**
 * Control scheme for player objects
 */
class ControlScheme
{

	/**
	 * @returns standard WASD control scheme. This is the default value for Player objects.
	 * @example
	 * {
	 *	playerFoo.controlScheme = ControlScheme.wasd();
	 *	// W = Directional, Up
	 *	// A = Directional, Left
	 *	// S = Directional, Down
	 *	// D = Directional, Right
	 *	// LShift = Button, B
	 *	// Space = Button, A
	 * }
	 * @param{boolean} directionalOnly Only directional buttons. Default = false
	 * @param{boolean} horizontalOnly Only horizontal directional buttons. Default = false
	 * @param{boolean} verticalOnly Only vertical directional buttons. Default = false
	 */
	static wasd = function(directionalOnly, horizontalOnly, verticalOnly)
	{

	}

	/**
	 * @returns arrow keys control scheme
	 * @example
	 * {
	 *	playerFoo.controlScheme = ControlScheme.arrows();
	 *	// Up = Directional, Up
	 *	// Left = Directional, Left
	 *	// Down = Directional, Down
	 *	// Right = Directional, Right
	 *	// LShift = Button, B
	 *	// Space = Button, A
	 * }
	 * @param{boolean} directionalOnly Only directional buttons. Default = false
	 * @param{boolean} horizontalOnly Only horizontal directional buttons. Default = false
	 * @param{boolean} verticalOnly Only vertical directional buttons. Default = false
	 */
	static arrows = function(directionalOnly, horizontalOnly, verticalOnly)
	{

	}


}






/**
 * @returns The screen position of a world coordinate relative to a given camera.
 * @param{Transform} transform The world point to calculate.
 * @param{GameObject} camera The camera to calculate screen point relative to. Default = currentScene.camera
 */
function worldToScreenPoint(transform, camera = currentScene.camera)
{
	return Transform.sub(transform, camera.transform);

}
