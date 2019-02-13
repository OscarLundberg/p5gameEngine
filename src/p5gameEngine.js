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
		 * @param {X-coordinate} x
		 * @param {Y-coordinate} y
		 * @param {Magnitude} m
		 */
		this.applyForce = function(x, y, m)
		{

		}

		/**
		 * Apply force to a physics object
		 * @param {X-coordinate} x
		 * @param {Y-coordinate} y
		 * @param {Magnitude} m
		 */
		this.step = function ()
		{


		}
	}
	/**
	 * Global gravity force. (Applied to every rigidbody)
	 * \nDefault is 9.87
   */
	 static gravity = 9.87;

	/**
	 * @returns physics object that ignores all external forces
	 * Note: Kinematic objects are affected by internal forces
	 * @example {
	 * 	myGameObject.physics = Physics.kinematic()
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
	 * @returns standard WASD control scheme
	 * @example {
	 *	// W = Directional, Up
	 *  // A = Directional, Left
	 *  // S = Directional, Down
	 *  // D = Directional, Right
	 *  // LShift = Button, B
	 * 	// Space = Button, A
	 * }
	 * @param{directionalOnly} directionalOnly Only directional buttons. Default = false
	 * @param{horizontalOnly} horizontalOnly Only horizontal directional buttons. Default = false
	 * @param{verticalOnly} verticalOnly Only vertical directional buttons. Default = false
	 */
	static wasd = function(directionalOnly, horizontalOnly, verticalOnly)
	{

	}

	/**
	 * @returns arrow keys control scheme
	 * @example {
	 *	// Up = Directional, Up
	 *  // Left = Directional, Left
	 *  // Down = Directional, Down
	 *  // Right = Directional, Right
	 *  // LShift = Button, B
	 * 	// Space = Button, A
	 * }
	 * @param{directionalOnly} directionalOnly Only directional buttons. Default = false
	 * @param{horizontalOnly} horizontalOnly Only horizontal directional buttons. Default = false
	 * @param{verticalOnly} verticalOnly Only vertical directional buttons. Default = false
	 */
	static arrows = function(directionalOnly, horizontalOnly, verticalOnly)
	{

	}


}






/**
 * @returns The screen position of a world coordinate relative to a given camera.
 * @param{transform} transform The world point to calculate.
 * @param{camera} camera The camera to calculate screen point relative to. Default = currentScene.camera
 */
function worldToScreenPoint(transform, camera = currentScene.camera)
{
	return Transform.sub(transform, camera.transform);

}
