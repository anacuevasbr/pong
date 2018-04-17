// GLOBAL VARIABLES

var container;
var renderer, scene, camera, pointLight;

const WIDTH = 640;
const HEIGHT = 360;

// Set some camera attributes
const VIEW_ANGLE = 50;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

// Set up the sphere vars
const RADIUS = 5;
const SEGMENTS = 6;
const RINGS = 6;

var sphere;
var plane;
const PLANE_WIDTH = 400,
  PLANE_HEIGTH = 200,
  PLANE_QUALITY = 10;

//paddle
const PADDLE_WIDTH= 10,
      PADDLE_HEIGTH= 30,
      PADDLE_DEPTH = 10,
      PADDLE_QUALITY = 1;
var playerPaddleDirY = 0,
    cpuPaddleDirY = 0,
    paddleSpeed = 3;
var playerPaddle,
    cpuPaddle;

var ballDirX = 1,
    ballDirY = 1,
    ballSpeed = 2;

var playerscore = 0,
    cpuscore = 0;

// GAME FUNCTIONS

function setup()
{
    createScene();
    addMesh();
    addLight();
    requestAnimationFrame(draw);
}

function createScene(){


    container = document.getElementById('gameCanvas');

    renderer = new THREE.WebGLRenderer();
    camera =
        new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR
        );

    scene = new THREE.Scene();

    // Add the camera to the scene
    scene.add(camera);

    // Start the renderer

    renderer.setSize(WIDTH, HEIGHT);

    // Attach the renderer-supplied DOM element.
    container.appendChild(renderer.domElement);

    console.log('llega al final del createscene');
}

function addMesh(){

  //Geometry
  var esfera = new THREE.SphereGeometry(
      RADIUS,
      SEGMENTS,
      RINGS);

  var plano = new THREE.PlaneGeometry(

    PLANE_WIDTH,
    PLANE_HEIGTH,
    PLANE_QUALITY);

  var Paddle = new THREE.CubeGeometry(
      PADDLE_WIDTH,
      PADDLE_HEIGTH,
      PADDLE_DEPTH,
      PADDLE_QUALITY);


  //materiales
  var material1 = new THREE.MeshLambertMaterial(
      {
        color: 0xe3e2e1
      });

  var material2 = new THREE.MeshLambertMaterial(
        {
          color: 0x009999
        });

  // Create a new mesh
  sphere = new THREE.Mesh(esfera, material1);
  plane = new THREE.Mesh( plano, material2 );
  playerPaddle= new THREE.Mesh( Paddle, material1);
  cpuPaddle= new THREE.Mesh( Paddle, material1 );


  // Positions
  sphere.position.z = -300;
  plane.position.z = -300;
  playerPaddle.position.z = -300;
  cpuPaddle.position.z = -300;
  playerPaddle.position.x = 180;
  cpuPaddle.position.x = -180;

  // add objects
  scene.add(sphere);
  scene.add( plane );
  scene.add( playerPaddle );
  scene.add( cpuPaddle );


}

function addLight()
{
    // Create a point light
    pointLight =
      new THREE.PointLight(0xffff99);

    // Set its position
    pointLight.position.x = 0;
    pointLight.position.y = 0;
    pointLight.position.z = 500;

    // Add to the scene
    scene.add(pointLight);
}



function draw()
{
  // Draw!
  paddlemovement();
  ballmovement();

  renderer.render(scene, camera);

  // Schedule the next frame
  requestAnimationFrame(draw);
}

function ballmovement(){

  if(sphere.position.y >= 100){
    ballDirY = -1.5;
  } else if (sphere.position.y <= -100) {
    ballDirY = 1.5;

  }

  var Alturaplayer = sphere.position.y >= playerPaddle.position.y-15 && sphere.position.y <= playerPaddle.position.y+15;
  var Anchoplayer = sphere.position.x >= playerPaddle.position.x-6 && sphere.position.x <= playerPaddle.position.x-3;
  var Alturacpu = sphere.position.y >= cpuPaddle.position.y-15 && sphere.position.y <= cpuPaddle.position.y+15;
  var Anchocpu = sphere.position.x <= cpuPaddle.position.x+6 && sphere.position.x >= cpuPaddle.position.x+3
  if(Alturaplayer && Anchoplayer){
    ballDirX = -(ballDirX);

  } else if (Alturacpu && Anchocpu) {
    ballDirX = -(ballDirX);
  }

  if(sphere.position.x >= 200){
    cpuscore += 1;
    sphere.position.x=0;
    ballDirY = 1;
  } else if (sphere.position.x <= -200) {
    playerscore += 1;
    sphere.position.x=0;
    ballDirY = 1;
  }

  document.getElementById("scores").innerHTML = cpuscore + ' - ' + playerscore;


  sphere.position.y += ballSpeed * ballDirY;
  sphere.position.x += ballSpeed * ballDirX;
}

function paddlemovement(){
  if (Key.isDown(Key.A) && playerPaddle.position.y - 15 >= -100){
    playerPaddle.position.y += -paddleSpeed;
  } else if(Key.isDown(Key.D)&& playerPaddle.position.y + 15<= 100){
    playerPaddle.position.y += paddleSpeed;
  }

  if (Key.isDown(Key.S) && cpuPaddle.position.y - 15 >= -100){
    cpuPaddle.position.y += -paddleSpeed;
  } else if(Key.isDown(Key.W)&& cpuPaddle.position.y + 15<= 100){
    cpuPaddle.position.y += paddleSpeed;
  }

}
