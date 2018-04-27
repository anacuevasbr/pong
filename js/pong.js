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
    cpuscore = 0,
    maxScore = 3;

var  difficulty = 0.05;
var mode;

var pointLight1,
    pointLight2,
    directionalLight,
    spotLight;

// GAME FUNCTIONS

function setup()
{

    createScene();
    addMesh();
    addLight();
    players();
    selectdifficulty();
    //requestAnimationFrame(draw);

}

function reestart(){
  location.reload();
}


function selectdifficulty(){
  x = document.getElementById("difficulty").value;

  if (x=="easy"){
    difficulty = 0.02;
  }else if (x=="medium") {
    difficulty = 0.05;
  }else if (x=="god") {
    difficulty = 0.2;
  }
  requestAnimationFrame(draw);
}

function players(){
  mode = document.getElementById("players").value;
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
    renderer.setClearColor(0x80ffff);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

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

  var columna = new THREE.CubeGeometry(
      10,
      10,
      100,
      1);

  var gradas = new THREE.PlaneGeometry(

    PLANE_WIDTH,
    60,
    PLANE_QUALITY);


  //materiales
  var material1 = new THREE.MeshLambertMaterial(
      {
        color: 0xe3e2e1
      });

  var material2 = new THREE.MeshLambertMaterial(
        {
          //color: 0x009999
          color: 0xffa366
        });
  var material3 = new THREE.MeshLambertMaterial(
        {
          color: 0x7300e6
        });
  var material4 = new THREE.MeshLambertMaterial(
        {
          color: 0xff0000
        });

  var texture = new THREE.TextureLoader().load( 'http://localhost:8000/publico.jpg' );

  // immediately use the texture for material creation
  var material5 = new THREE.MeshBasicMaterial( { map: texture, } );
  // Create a new mesh
  sphere = new THREE.Mesh(esfera, material1);
  plane = new THREE.Mesh( plano, material2 );
  playerPaddle= new THREE.Mesh( Paddle, material3);
  cpuPaddle= new THREE.Mesh( Paddle, material4 );
  columna1=new THREE.Mesh( columna, material4 );
  columna2=new THREE.Mesh( columna, material4 );
  columna3=new THREE.Mesh( columna, material4 );


  grade = new THREE.Mesh( gradas, material5 );


  // important Positions
  sphere.position.z = -295;
  plane.position.z = -300;

  playerPaddle.position.z = -300;
  cpuPaddle.position.z = -300;
  playerPaddle.position.x = 180;
  cpuPaddle.position.x = -180;

  //column positions
  columna3.position.x = 0;
  columna1.position.x = 100;
  columna2.position.x = -100;
  columna1.position.z = -290;
  columna2.position.z = -290;
  columna3.position.z = -290;
  columna1.position.y = -100;
  columna2.position.y = -100;
  columna3.position.y = -100;

  grade.position.z = -275;
  grade.position.y = 125;
  grade.rotation.x = Math.PI/6;


  //Shadows
  sphere.castShadow = true; //default is false
  playerPaddle.castShadow = true;
  plane.receiveShadow = true;
  columna1.castShadow = true;
  columna2.castShadow = true;
  columna3.castShadow = true;
  columna1.receiveShadow = true;
  columna2.receiveShadow = true;
  columna3.receiveShadow = true;


  // add objects
  scene.add(sphere);
  scene.add( plane );
  scene.add( playerPaddle );
  scene.add( cpuPaddle );
  scene.add( columna1 );
  scene.add( columna2 );
  scene.add( columna3 );

  scene.add( grade );



}

function addLight()
{
    // Create a point light
    pointLight1 =
      new THREE.PointLight(0xffffff, 0.5);

    // Set its position
    pointLight1.position.x = -100;
    pointLight1.position.y = 0;
    pointLight1.position.z = 500;

    // Add to the scene
    scene.add(pointLight1);

    pointLight2 =
      new THREE.PointLight(0xffffff, 0.5);

    // Set its position
    pointLight2.position.x = 100;
    pointLight2.position.y = 0;
    pointLight2.position.z = 500;

    // Add to the scene
    scene.add(pointLight2);

    directionalLight =
      new THREE.DirectionalLight( 0xffffff, 1.0 );

    // Set its position
    directionalLight.position.x = 0-150;
    directionalLight.position.y = -150;
    directionalLight.position.z = 400;
    directionalLight.castShadow = true;

    // Add to the scene
    scene.add(directionalLight);

    spotLight =
      new THREE.PointLight(0xffff00, 1.0);
    spotLight.position.x = 0;
    spotLight.position.y = 0;
    spotLight.position.z = -220;
    spotLight.angle = Math.PI/10000;
    spotLight.castShadow = true;
    scene.add(spotLight);
}



function draw()
{
  // Draw!
  paddlemovement();
  if (mode=="single"){
    cpumovement();
  }else{
    secondplayer();
  }
  ballmovement();
  lightchanges();
  checkwin();
  cameramovement();


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

  var Alturaplayer = sphere.position.y >= playerPaddle.position.y-17 && sphere.position.y <= playerPaddle.position.y+17;
  var Anchoplayer = sphere.position.x >= playerPaddle.position.x-6 && sphere.position.x <= playerPaddle.position.x+5;
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
    ballDirX = -ballDirX;
  } else if (sphere.position.x <= -200) {
    playerscore += 1;
    ballDirX = -ballDirX;
    sphere.position.x=0;
    ballDirY = 1;
  }

  document.getElementById("scores").innerHTML = cpuscore + ' - ' + playerscore;


  sphere.position.y += ballSpeed * ballDirY;
  sphere.position.x += ballSpeed * ballDirX;
}
function lightchanges(){
  spotLight.position.x =sphere.position.x;
  spotLight.position.y =sphere.position.y;

}
function paddlemovement(){
  var Up;
  var Down;
  if (mode=="single"){
    Up = Key.D;
    Down = Key.A;
  }else{
    Up = Key.W;
    Down = Key.S;
  }
  if (Key.isDown(Down) && playerPaddle.position.y - 15 >= -100){
    playerPaddle.position.y += -paddleSpeed;
  } else if(Key.isDown(Up)&& playerPaddle.position.y + 15<= 100){
    playerPaddle.position.y += paddleSpeed;
  }
}

function secondplayer(){
  if (Key.isDown(Key.L) && cpuPaddle.position.y - 15 >= -100){
    cpuPaddle.position.y += -paddleSpeed;
  } else if(Key.isDown(Key.O)&& cpuPaddle.position.y + 15<= 100){
    cpuPaddle.position.y += paddleSpeed;
  }


}

function cpumovement(){

  cpuPaddleDirY = (sphere.position.y - cpuPaddle.position.y)*difficulty;
  cpuPaddle.position.y += cpuPaddleDirY * paddleSpeed;

}

function cameramovement(){

  if (mode=="single"){
    camera.position.x = playerPaddle.position.x + 125;
    camera.position.z = playerPaddle.position.z + 50;
    camera.position.y = playerPaddle.position.y;


    camera.rotation.y = Math.PI/2;
    camera.rotation.z = Math.PI/2;
    camera.rotation.x = 0;
  }
}

function checkwin(){

  if (cpuscore==maxScore) {
    document.getElementById("scores").innerHTML = 'Loser';
    sphere.position.x = 0;
    sphere.position.y = 0;
  }else if (playerscore==maxScore) {
    document.getElementById("scores").innerHTML = 'You win!';
    sphere.position.x = 0;
    sphere.position.y = 0;
  }
}
